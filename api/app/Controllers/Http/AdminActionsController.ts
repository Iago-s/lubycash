import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Database from '@ioc:Adonis/Lucid/Database';

import ListExtractValidator from 'App/Validators/ListExtractValidator';
import ListClientValidator from 'App/Validators/ListClientsValidator';

import Extract from 'App/Models/Extract';

export default class AdminExtractsController {
  async getExtracts({ request, response, auth, params }: HttpContextContract) {
    const { id } = params;

    try {
      await request.validate(ListExtractValidator);
      const admin = auth.use('api').user;

      if(admin?.rules === 'admin') {
        await Extract.findByOrFail('client_id', id);

        const { from, to } = request.all();
        var formatDateFrom, formatDateTo;
        var extracts;

        formatDateFrom = from ? new Date(from).toISOString() : null;
        formatDateTo = to ? new Date(to).toISOString() : null;

        if(from && !to) {
          console.log('tem from e não tem to');

          extracts =
            await Database
            .query()
            .select('*')
            .from('extracts')
            .where('client_id', id)
            .where('created_at', '>', formatDateFrom);

          return response.json(extracts);
        }

        if(to && !from) {
          console.log('tem to e não tem from');

          extracts =
            await Database
            .query()
            .select('*')
            .from('extracts')
            .where('client_id', id)
            .where('created_at', '>', formatDateTo)

          return response.json(extracts);
        }

        if(from && to) {
          console.log('tem from e tem to');
          extracts =
            await Database
            .query()
            .select('*')
            .from('extracts')
            .where('client_id', id)
            .where('created_at', '>', formatDateFrom)
            .where('created_at', '<', formatDateTo);

          return response.json(extracts);
        }

        console.log('nenhum dos ifs');

        extracts = await Database.query().select('*').from('extracts').where('client_id', id);

        return response.json(extracts);
      }

      return response.status(401).json({ message: 'Você não tem permissão' });
    } catch(err) {
      return response.status(404).json({ message: err.message });
    }
  }

  async getClients({ request, response, auth }: HttpContextContract) {
    try {
      await request.validate(ListClientValidator);

      const admin = auth.use('api').user;

      if(admin?.rules === 'admin') {
        const { status, date } = request.all();
        var formatDate;
        var clients;

        if(date) {
          formatDate = new Date(date).toISOString();
        }

        if(date && status == undefined) {
          clients =
          await Database
          .query()
          .select('*')
          .from('clients')
          .where('createdAt', '>', formatDate);

          return response.json(clients);
        }

        if(status != undefined && !date) {
          clients =
            await Database
            .query()
            .select('*')
            .from('clients')
            .where('status', '=', status)

          return response.json(clients);
        }

        if(status != undefined && date) {
          clients =
            await Database
            .query()
            .select('*')
            .from('clients')
            .where('status', '=', status)
            .where('createdAt', '>', formatDate);

          return response.json(clients);
        }

        clients = await Database.query().select('*').from('clients').where({})

        return response.json(clients);
      }

      return response.status(401).json({ message: 'Você não tem permissão' });
    } catch(err) {
      return response.status(500).json({ message: err.message });
    }
  }
}
