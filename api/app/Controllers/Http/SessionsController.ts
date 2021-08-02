import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import SessionValidator from "App/Validators/SessionValidator";

export default class SessionsController {
  async store({ request, response, auth }: HttpContextContract) {
    try {
      await request.validate(SessionValidator);

      const email = request.input('email');
      const password = request.input('password');

      const token = await auth.use('api').attempt(email, password);

      return token;
    } catch(err) {
      return response.status(err.status).json({ message: err.message });
    }
  }
}
