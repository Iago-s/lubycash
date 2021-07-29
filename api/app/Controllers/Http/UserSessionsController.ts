import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UserSessionsController {
  async store({ request, response, auth }: HttpContextContract) {
    const email = request.input('email');
    const password = request.input('password');

    try {
      const token = await auth.use('user').attempt(email, password);
      return token;
    } catch(err) {
      return response.json({message: err.message});
    }
  }
}
