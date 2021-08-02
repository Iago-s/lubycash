import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import ForgotPasswordValidator from 'App/Validators/ForgotPasswordValidator';
import UpdatePasswordValidator from 'App/Validators/UpdatePasswordValidator';

import User from 'App/Models/User';

import Mail from '../../../services/nodemailerServices/Mail';
const crypto = require('crypto');
const moment = require('moment');

export default class ForgotPasswordsController {
  async store({ request, response }: HttpContextContract) {
    try {
      await request.validate(ForgotPasswordValidator);

      const email = request.input('email');
      const user = await User.findByOrFail('email', email);

      const token = crypto.randomBytes(10).toString('hex');
      user.token = token;
      user.token_created_at = new Date();

      await user.save();

      const service = new Mail();

      await service.sendMail({ email, token });

      return response.json({
        message:
          'Siga os passos enviados no email para prosseguir com a alteração da senha.',
      });
    } catch (err) {
      return response.status(err.status).json({ message: err.message });
    }
  }

  async update({ request, response }: HttpContextContract) {
    try {
      await request.validate(UpdatePasswordValidator);

      const { token, password } = request.all();
      const user = await User.findByOrFail('token', token);

      const tokenExpired = moment()
        .subtract('2', 'days')
        .isAfter(user.token_created_at);

      if (tokenExpired) {
        return response
          .status(401)
          .json({ error: true, message: 'O token de validação está expirado.' });
      }

      user.token = null;
      user.token_created_at = null;
      user.password = password;

      await user.save();

      return response.json({ message: 'Senha alterada com sucesso!' });
    } catch (err) {
      return response.status(err.status).json({ message: err.message })
    }
  }
}
