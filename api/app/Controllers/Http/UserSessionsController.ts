import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import AuthValidator from 'App/Validators/AuthValidator';

export default class UserSessionsController {
  async store({ request, response, auth }: HttpContextContract) {
    try {
      await request.validate(AuthValidator);

      const email = request.input('email');
      const password = request.input('password');

      const token = await auth.use('user').attempt(email, password);

      return token;
    } catch(err) {
      return response.status(err.status).json({ message: err.message });
    }
  }
}
