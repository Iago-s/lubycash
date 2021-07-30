import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Database from '@ioc:Adonis/Lucid/Database';

import User from 'App/Models/User';
import Extract from 'App/Models/Extract';

import UsersPixValidator from 'App/Validators/UsersPixValidator';

export default class UserPixesController {
  public async store({ request, response, auth }: HttpContextContract) {
    try {
      try {
        await request.validate(UsersPixValidator);
      } catch(err) {
        return response.status(err.status).json({ message: err.message });
      }

      const user = auth.use('user').user;
      const { cpf_number_destination, transfer_amount } = request.all();

      const user_destination = await User.findByOrFail('cpf_number', cpf_number_destination);

      if(user && user_destination) {
        if(user.status) {
          if(user.current_balance >= transfer_amount) {
            if(transfer_amount <= 0) {
              return response.json({message: 'O valor deve ser maior que R$ 0,00'});
            }

            user_destination.current_balance += transfer_amount;
            user.current_balance -= transfer_amount;

            const trx = await Database.beginGlobalTransaction();

            await user_destination.save();
            await user.save();

            await Extract.create({
              user_id: user.id,
              type: 'PIX REALIZADO',
              name_destination: user_destination.full_name,
              transfer_amount: transfer_amount,
            });

            await Extract.create({
              user_id: user_destination.id,
              type: 'PIX RECEBIDO',
              name_destination: user.full_name,
              transfer_amount: transfer_amount,
            });

            await trx.commit();

            return response.json({ message: 'Parabéns PIX realizado' });
          }

          return response.json({ message: 'Você não tem saldo suficiente para essa transferencia.' });
        }

        return response.json({ message: 'Você não está apto a fazer PIX.' });
      }
    } catch(err) {
      return response.status(err.status).json({ message: err.message });
    }
  }
}
