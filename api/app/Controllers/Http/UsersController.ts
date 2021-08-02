import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import UserValidator from 'App/Validators/UserValidator';
import UserUpdateValidator from 'App/Validators/UserUpdateValidator';

import Producer from '../../../services/kafkaServices/Producer';
import User from '../../Models/User';

export default class UsersController {
  public async index({ response }: HttpContextContract) {
    try {
      const users = await User.all();

      return users;
    } catch(err) {
      return response.status(500).json(err);
    }
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
        average_salary,
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
          value: JSON.stringify(data),
        }],
      });

      return response
        .status(201)
        .json(
          {
            message: 'Conta criada com sucesso. Você vai receber um email com seu status',
          }
        );
    } catch(err) {
      return response.status(400).json({ message: err.message });
    }
  }

  async update({ request, response, auth }: HttpContextContract) {
    try {
      await request.validate(UserUpdateValidator);

      const user = await User.findByOrFail('id', auth.use('user').user?.id);

      const {
        full_name,
        phone,
        zipcode,
        city,
        state,
        address,
        address_number,
        average_salary
      } = request.all();

      user.merge({
        full_name,
        phone,
        zipcode,
        city,
        state,
        address,
        address_number,
        average_salary,
        status: average_salary >= 500 ? true : false,
      });

      await user.save();

      return response
        .status(200)
        .send({ message: 'Parabéns, seus dados foi alterado com sucesso!' });
    } catch (err) {
      return response
        .status(err.status)
        .send({ message: err.message });
    }
  }

  async destroy({ response, params }) {
    try {
      const user = await User.findOrFail(params.id);

      await user.delete();

      return response
        .status(204)
        .send();
    } catch (err) {
      return response.status(err.status).send({
        message: err.message,
      });
    }
  }
}
