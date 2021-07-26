import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UsersController {
  public async index({ request, response }: HttpContextContract) {
    return response.json({ message: 'Controller' });
  }

  public async store({ request, response }: HttpContextContract) {
    const {
      fullName,
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
      fullName,
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
