import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import UpdateUserValidator from 'App/Validators/UpdateUserValidator';
import AdminValidator from 'App/Validators/AdminValidator';

import User from '../../Models/User';
import Admin from '../../Models/Admin';

export default class UsersController {
  public async index({ response, auth }: HttpContextContract) {
    try {
      const admin = auth.use('api').user;

      if(admin?.rules === 'admin') {
        const users = await User.all();

        return response.json(users);
      }

      return response.status(401).json({ message: 'Você não tem permissão' });
    } catch(err) {
      return response.status(500).json(err);
    }
  }

  public async store({ request, response, auth }: HttpContextContract) {
    try {
      const admin = auth.use('api').user;

      if(admin?.rules === 'admin') {
        await request.validate(AdminValidator);

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
        } = request.all();

        const user = await User.create({
          email,
          password,
          rules: 'admin',
        });

        const data = {
          user_id: user.id,
          full_name,
          email,
          phone,
          cpf_number,
          zipcode,
          city,
          state,
          address,
        };

        const admin = await Admin.create(data);

        return response.status(201).json(admin);
      }

      return response.status(401).json({ message: 'Você não tem permissão' });
    } catch(err) {
      return response.status(err.status).json({ message: err.message });
    }
  }

  async update({ request, response, auth, params }: HttpContextContract) {
    try {
      await request.validate(UpdateUserValidator);

      const { id } = params;
      const { email, password } = request.all();

      const admin = auth.use('api').user;

      if(admin?.rules === 'admin') {
        const user = await User.findByOrFail('id', id);

        user.merge({ email, password });

        await user.save();

        return response.json({ message: 'Dados alterado!' });
      }

      return response.status(401).json({ message: 'Você não tem permissão' });
    } catch (err) {
      return response
        .status(err.status)
        .json({ message: err.message });
    }
  }

  async destroy({ response, params, auth }) {
    try {
      const { id } = params;
      const admin = auth.use('api').user;

      if(admin?.rules === 'admin') {
        const user = await User.findOrFail(id);

        user.delete();

        return response.status(204).send();
      }

      return response.status(401).json({ message: 'Você não tem permissão' });
    } catch (err) {
      return response.status(err.status).json({
        message: err.message,
      });
    }
  }
}
