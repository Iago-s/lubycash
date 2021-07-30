import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { DateTime } from 'luxon';
import Database from '@ioc:Adonis/Lucid/Database'

import User from 'App/Models/User';

interface DateFormat {
  year: number;
  month: number;
  day: number;
};

export default class AdminExtractsController {
  async getExtracts({ request, response, params }: HttpContextContract) {
    const { id } = params;
    const querys = request.qs();
    var matchFrom, matchTo;
    var extracts;

    var dateFrom: DateFormat = {
      year: 0,
      month: 0,
      day: 0,
    };
    var dateTo: DateFormat = {
      year: 0,
      month: 0,
      day: 0,
    };

    try {
      const user = await User.findByOrFail('id', id);

      if(querys?.from && querys?.to) {
        matchFrom = querys?.from.match(/([0-9][0-9])\/([0-9][0-9])\/([0-9][0-9][0-9][0-9])/);
        matchTo = querys?.to.match(/([0-9][0-9])\/([0-9][0-9])\/([0-9][0-9][0-9][0-9])/);

        if(matchFrom?.length === 4 && matchTo?.length === 4) {
          dateFrom.year = parseInt(matchFrom[3]);
          dateFrom.month = parseInt(matchFrom[2]);
          dateFrom.day = parseInt(matchFrom[1]);

          dateTo.year = parseInt(matchTo[3]);
          dateTo.month = parseInt(matchTo[2]);
          dateTo.day = parseInt(matchTo[1]);

          extracts =
          await Database
            .query()
            .from('extracts')
            .select('*')
            .where('user_id', user.id)
            .whereBetween(
              'created_at',
              [
                DateTime.local(
                  dateFrom.year,
                  dateFrom.month,
                  dateFrom.day
                ).toSQLDate(),
                DateTime.local(
                  dateTo.year,
                  dateTo.month,
                  dateTo.day + 1,
                ).toSQLDate()
              ]
            );
          return response.json(extracts);
        } else {
          return response.json({ message: 'Formato de data errado' });
        }
      }

      extracts = await Database.query().from('extracts').select('*').where('user_id', user.id);

      return response.json(extracts);
    } catch(err) {
      return response.status(404).json({ message: err.message });
    }
  }

  async getUsers({ request, response }: HttpContextContract) {
    const querys = request.qs();
    var users;
    var match;

    if(querys?.date && !querys?.status) {
      match = querys?.date.match(/([0-9][0-9])\/([0-9][0-9])\/([0-9][0-9][0-9][0-9])/);

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
      match = querys?.date.match(/([0-9][0-9])\/([0-9][0-9])\/([0-9][0-9][0-9][0-9])/);

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
