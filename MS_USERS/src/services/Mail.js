const nodemailer = require('nodemailer');

class Mail {
  async sendMail({ name, email, status }) {
    const testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    const info = await transporter.sendMail({
      from: '"Lubycash" <lubycash@email.com>',
      to: email,
      subject: 'Conta criada',
      text: 'Parabéns sua conta foi aberta!',
      html: `
        <p>Foi criada uma conta em nosso banco em nome de <strong>${name}</strong></p>
        <p>Seu status: <strong>${status ? 'Aprovado' : 'Negado'}</strong>.</p>
        <p>Se seu status foi reprovado você pode tentar novamente.</p>
      `,
    });

    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  }
}

module.exports = Mail;
