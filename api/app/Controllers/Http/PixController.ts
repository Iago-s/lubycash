import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Database from '@ioc:Adonis/Lucid/Database';

import PixValidator from 'App/Validators/PixValidator';

import Extract from '../../Models/Extract';

export default class PixesController {
  public async store({ request, response, auth, bouncer }: HttpContextContract) {
    try {
      await bouncer.authorize('makePix');

      await request.validate(PixValidator);
      const { cpf_number_destination, transfer_amount } = request.all();

      const client = await auth.use('api').user;

      const [pixSender] = await Database.query()
        .select('*')
        .from('clients')
        .where({
          user_id: client?.id,
        });

      const [pixRecipient] = await Database.query()
        .select('*')
        .from('clients')
        .where({
          cpf_number: cpf_number_destination,
        });

      if (!pixSender || !pixRecipient) {
        return response.status(404).json({ message: 'Usuário não encontrado' });
      }

      if (!pixSender.status) {
        return response
          .status(400)
          .json({ message: 'Você não é apto a fazer PIX' });
      }

      if (pixSender.cpf_number === pixRecipient.cpf_number) {
        return response.json({ message: 'Você não pode fazer um PIX a você mesmo' });
      }

      if (pixSender.current_balance >= transfer_amount) {
        await Database.query()
          .update({
            current_balance: (pixSender.current_balance -= transfer_amount),
          })
          .from('clients')
          .where({ user_id: client?.id });

        await Extract.create({
          client_id: pixSender.id,
          type: 'PIX REALIZADO',
          name_destination: pixRecipient.full_name,
          transfer_amount,
        });

        await Database.query()
          .update({
            current_balance: (pixRecipient.current_balance += transfer_amount),
          })
          .from('clients')
          .where({ cpf_number: cpf_number_destination });

        await Extract.create({
          client_id: pixRecipient.id,
          type: 'PIX RECEBIDO',
          name_destination: pixSender.full_name,
          transfer_amount,
        });

        return response.json({ message: 'PIX REALIZADO' });
      } else {
        return response.json({ message: 'Você não tem saldo suficiente' });
      }
    } catch (err) {
      return response.status(err.status).json({ message: err.message });
    }
  }
}
