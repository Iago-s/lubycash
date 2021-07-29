import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import AdminValidator from 'App/Validators/AdminValidator';

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
}
