import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import Producer from '../../../services/kafkaServices/Producer';
import User from '../../Models/User';

export default class UsersController {
  public async index() {
    const users = await User.all();

    return users;
  }

  public async store({ request, response }: HttpContextContract) {
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

    try {
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
      return response.status(404).json({ message: err.message });
    }
  }
}
