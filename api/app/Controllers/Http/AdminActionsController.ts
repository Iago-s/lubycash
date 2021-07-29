import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import User from 'App/Models/User';
import Extract from 'App/Models/Extract';

export default class AdminExtractsController {
  async getExtracts({ response, params }: HttpContextContract) {
    const { id } = params;

    try {
      const user = await User.findByOrFail('id', id);

      const extracts = await (await Extract.query()).filter(extract => extract.user_id === user.id);

      return response.json(extracts);
    } catch(err) {
      return response.status(404).json({ message: err.message });
    }
  }

  async getUsers({ request, response }: HttpContextContract) {
    const querys = request.qs();
    var users;
    var match = querys?.date.match(/([0-9][0-9])\/([0-9][0-9])\/([0-9][0-9][0-9][0-9])/);

    if(querys?.date && !querys?.status) {
      if(match?.length === 4) {
        users =
          await (await User.query())
          .filter(user =>
            user.created_at.month == match[2] &&
            user.created_at.day == match[1] &&
            user.created_at.year == match[3]
          );

        return response.json(users);
      } else {
        return response.json({ message: 'Formato de data errado' });
      }
    }

    if(querys?.status && querys.status.toLowerCase() === 'aprovado' && !querys?.date) {
      try {
        users = await User.query().where('status', true);

        return response.json(users);
      } catch(err) {
        return response.status(500).json({ message: 'Falha ao busca usuários' });
      }
    }

    if(querys?.status && querys.status.toLowerCase() === 'negado' && !querys?.date) {
      try {
        users = await User.query().where('status', false);

        return response.json(users);
      } catch(err) {
        return response.status(500).json({ message: 'Falha ao busca usuários' });
      }
    }

    if(querys?.date && querys?.status) {
      if(match?.length === 4) {
        if(querys?.status && querys.status.toLowerCase() === 'negado') {
          try {
            users =
              await (await User.query())
              .filter(user =>
                user.created_at.month == match[2] &&
                user.created_at.day == match[1] &&
                user.created_at.year == match[3] &&
                !user.status
              );
            return response.json(users);
          } catch(err) {
            return response.status(500).json({ message: 'Falha ao busca usuários' });
          }
        }

        if(querys?.status && querys.status.toLowerCase() === 'aprovado') {
          try {
            users =
              await (await User.query())
              .filter(user =>
                user.created_at.month == match[2] &&
                user.created_at.day == match[1] &&
                user.created_at.year == match[3] &&
                user.status
              );
            return response.json(users);
          } catch(err) {
            return response.status(500).json({ message: 'Falha ao busca usuários' });
          }
        }
      } else {
        return response.json({ message: 'Formato de data errado' });
      }
    }

    try {
      users = await User.all();

      return response.json(users);
    } catch(err) {
      return response.status(500).json({ message: 'Falha ao busca usuários' });
    }
  }
}
