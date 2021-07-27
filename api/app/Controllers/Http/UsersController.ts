import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import UserValidator from 'App/Validators/UserValidator';
import UsersPixValidator from 'App/Validators/UsersPixValidator';

import Producer from '../../../services/kafkaServices/Producer';
import User from '../../Models/User';

export default class UsersController {
  public async index() {
    const users = await User.all();

    return users;
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      await request.validate(UserValidator);

      const {
        full_name,
        email,
        password,
        phone,
        cpf_number,
        zipcode,
        city,
        state,
        address,
        address_number,
        average_salary
      } = request.all();

      const data = {
        full_name,
        email,
        password,
        phone,
        cpf_number,
        zipcode,
        city,
        state,
        address,
        address_number,
        average_salary,
      };

      const producer = new Producer();

      await producer.produce({
        topic: 'users',
        messages: [{
          value: JSON.stringify(data)
        }],
      });

      return response
        .status(201)
        .json(
          {
            message: 'Conta criada com sucesso. Você vai receber um email com seu status'
          }
        );
    } catch(err) {
      return response.badRequest({message: err.message});
    }
  }

  public async pix({ request, response }: HttpContextContract) {
    try {
      await request.validate(UsersPixValidator);

      const { cpf_number_user, cpf_number_destination, transfer_amount } = request.all();

      const user = await User.findByOrFail('cpf_number', cpf_number_user);
      const user_destination = await User.findByOrFail('cpf_number', cpf_number_destination);

      if(user && user_destination) {
        if(user.status) {
          if(user.current_balance >= transfer_amount) {
            if(transfer_amount <= 0) {
              return response.json({message: 'O valor deve ser maior que R$ 0,00'});
            }

            user_destination.current_balance += transfer_amount;
            user.current_balance -= transfer_amount;

            await user_destination.save();
            await user.save();

            return response.json({message: 'Parabéns PIX realizado'});
          }

          return response.json({message: 'Você não tem saldo suficiente para essa transferencia.'});
        }

        return response.json({message: 'Você não está apto a fazer PIX.'});
      }

      return response.json({message: 'User not found.'});
    } catch(err) {
      return response.json({message: err.message});
    }
  }
}
