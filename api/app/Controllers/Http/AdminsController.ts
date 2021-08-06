import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import UpdateUserValidator from 'App/Validators/UpdateUserValidator';
import AdminValidator from 'App/Validators/AdminValidator';

import User from '../../Models/User';
import Admin from '../../Models/Admin';

export default class UsersController {
  public async index({ response, bouncer }: HttpContextContract) {
    try {
      await bouncer.authorize('adminOperations');

      const admins = await Admin.all();

      return response.json(admins);
    } catch (err) {
      return response.status(err.status).json({ message: err.message });
    }
  }

  public async store({ request, response, bouncer }: HttpContextContract) {
    try {
      await bouncer.authorize('adminOperations');

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
    } catch (err) {
      return response.status(err.status).json({ message: err.message });
    }
  }

  async update({ request, response, params, bouncer }: HttpContextContract) {
    try {
      const { id } = params;
      await bouncer.authorize('updateAndDeleteAdmin', parseInt(id));

      await request.validate(UpdateUserValidator);
      const { email, password } = request.all();


      const user = await User.findByOrFail('id', id);

      user.merge({ email, password });
      await user.save();

      return response.json({ message: 'Dados alterado!' });
    } catch (err) {
      return response
        .status(err.status)
        .json({ message: err.message });
    }
  }

  async destroy({ response, params, bouncer }) {
    try {
      const { id } = params;

      await bouncer.authorize('updateAndDeleteAdmin', parseInt(id));

      const admin = await Admin.findByOrFail('user_id', id);

      admin.delete();

      const user = await User.findOrFail(id);

      user.delete();

      return response.status(204).send();
    } catch (err) {
      return response.status(err.status).json({
        message: err.message,
      });
    }
  }
}
