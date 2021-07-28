 import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ForgotPasswordValidator from '../../Validators/ForgotPasswordValidator';
import UpdatePasswordValidator from 'App/Validators/UpdatePasswordValidator';

import Admin from '../../Models/Admin';
import Mail from '../../../services/nodemailerServices/Mail';

const crypto = require('crypto');
const moment = require('moment');
export default class AdminsForgotPasswordsController {
  async store({ request, response }: HttpContextContract) {
    try {
      await request.validate(ForgotPasswordValidator);

      const email = request.input('email');
      const admin = await Admin.findByOrFail('email', email);

      const token = crypto.randomBytes(10).toString('hex');
      admin.token = token;
      admin.token_created_at = new Date();

      await admin.save();

      const service = new Mail();

      await service.sendMail({ email, token });

      return response.json({
        message:
          'Siga os passos enviados no email para prosseguir com a alteração da senha.',
      });
    } catch (err) {
      return response.badRequest({ message: err.message });
    }
  }

  async update({ request, response }: HttpContextContract) {
    try {
      await request.validate(UpdatePasswordValidator);

      const { token, password } = request.all();
      const admin = await Admin.findByOrFail('token', token);

      const tokenExpired = moment()
        .subtract('2', 'days')
        .isAfter(admin.token_created_at);

      if (tokenExpired) {
        return response
          .status(401)
          .json({ error: true, message: 'O token de validação está expirado.' });
      }

      admin.token = null;
      admin.token_created_at = null;
      admin.password = password;

      await admin.save();

      return response.json({ message: 'Senha alterada com sucesso!' });
    } catch (err) {
      return response.status(404).json({ message: err.message})
    }
  }
}
