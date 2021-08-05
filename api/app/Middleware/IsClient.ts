import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class IsClient {
  public async handle({ request, response, auth }: HttpContextContract, next: () => Promise<void>) {
    const client = auth.use('api').user;

    request.userId = client?.id;

    if (client?.rules != 'client') {
      return response.status(401).json({ message: 'Você não tem permissão de Client' });
    }

    await next();
  }
}
