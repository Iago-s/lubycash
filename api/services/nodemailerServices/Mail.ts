const nodemailer = require('nodemailer');

interface IMailProps {
  email: string;
  token: string;
}

class Mail {
  async sendMail({ email, token }: IMailProps) {
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
      subject: 'Recumperação de senha',
      text: 'Enviada um pedido de recumperação de senha!',
      html: `
        <p>Foi criada um pedido de recumperação de senha para esse email</p>
        <p>Seu token: <strong>${token}</strong>.</p>
        <p>Informe esse token no campo de recumperação de senha na aplicação.</p>
      `,
    });

    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  }
}

export default Mail;
