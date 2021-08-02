import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import AdminValidator from 'App/Validators/AdminValidator';
import AdminUpdateValidator from 'App/Validators/AdminUpdateValidator';

import Admin from 'App/Models/Admin';

export default class AdminsController {
  public async index() {
    const admins = await Admin.all();

    return admins;
  }

  public async store({ request, response }: HttpContextContract) {
    try {
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
        address_number,
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
      };

      const admin = await Admin.create(data);

      return response.status(201).json(admin);
    } catch(err) {
      return response.badRequest({message: err.message});
    }
  }

  async update({ request, response, auth }: HttpContextContract) {
    try {
      await request.validate(AdminUpdateValidator);

      const user = await Admin.findByOrFail('id', auth.use('admin').user?.id);

      const {
        full_name,
        phone,
        zipcode,
        city,
        state,
        address,
        address_number,
      } = request.all();

      user.merge({
        full_name,
        phone,
        zipcode,
        city,
        state,
        address,
        address_number,
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
      const user = await Admin.findOrFail(params.id);

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
