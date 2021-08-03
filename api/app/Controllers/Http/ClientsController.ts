import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Producer from '../../../services/kafkaServices/Producer';
import ClientValidator from 'App/Validators/ClientValidator';

import User from '../../Models/User';

export default class ClientsController {
  public async store({ request, response }: HttpContextContract) {
    try {
      await request.validate(ClientValidator);

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
        average_salary,
      } = request.all();

      const client = await User.create({
        email,
        password,
        rules: 'client',
        token: null,
        token_created_at: null,
      });

      const data = {
        user_id: client.id,
        full_name,
        email,
        phone,
        cpf_number,
        zipcode,
        city,
        state,
        address,
        average_salary,
      };

      const producer = new Producer();

      await producer.produce({
        topic: 'users',
        messages: [{ value: JSON.stringify(data) }],
      });

      return response.status(201).json(client);
    } catch(err) {
      return response.json({ message: err.message });
    }
  }
}
