import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import User from 'App/Models/User';
import Extract from 'App/Models/Extract';

export default class AdminExtractsController {
  async index({ response, params }: HttpContextContract) {
    const { id } = params;

    try {
      const user = await User.findByOrFail('id', id);

      const extracts = await (await Extract.query()).filter(extract => extract.user_id === user.id);

      return response.json(extracts);
    } catch(err) {
      return response.status(404).json({ message: err.message });
    }
  }
}
