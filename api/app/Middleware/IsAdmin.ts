import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class IsAdmin {
  public async handle({ request, response, auth }: HttpContextContract, next: () => Promise<void>) {
    const admin = auth.use('api').user;

    request.userId = admin?.id;

    if (admin?.rules != 'admin') {
      return response.status(401).json({ message: 'Você não tem permissão de Admin' });
    }

    await next();
  }
}
