import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database';

import Producer from '../../../services/kafkaServices/Producer';
import ClientValidator from 'App/Validators/ClientValidator';

import User from '../../Models/User';

export default class ClientsController {
  public async index({ request, response, auth }: HttpContextContract) {
    try {
      const admin = auth.use('api').user;

      if(admin?.rules === 'admin') {
        const { status } = request.all();

        const clients = await Database.query().select('*').from('clients').where({ status });

        return response.json(clients);
      }

      return response.status(401).json({ message: 'Você não tem permissão' });
    } catch(err) {
      return response.status(500).json({ message: err.message });
    }
  }

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
