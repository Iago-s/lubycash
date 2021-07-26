import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

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
    }

    //Call MS producer data

    return response.json(data);
  }
}
