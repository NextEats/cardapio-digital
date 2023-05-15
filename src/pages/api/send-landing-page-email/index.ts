import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function sendLandinPageEmail(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req;
  const { message, email, whatsAppNumber, name } = body;

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL, // generated ethereal user
      pass: process.env.PASS, // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  switch (method) {
    case 'POST':
      try {
        const { response } = await transporter.sendMail({
          from: '" Novo Cliente👻" <nexteats.business@gmail.com>', // sender address
          to: 'contato@nexteats.com.br', // list of receivers
          subject: 'Novo cliente!', // Subject line
          text: 'Hello world?', // plain text body
          html: `
                <strong> Name: </strong> <span> ${name} </span><br/>
                <strong> Email: </strong> <span> ${email} </span><br/>
                <strong> Number: </strong> <span> ${whatsAppNumber} </span><br/>
                <strong> Message: </strong> <span> ${message} </span><br/>
                `, // html body
        });
        res.status(200).json(response);
      } catch (error) {
        console.error(error);
        res
          .status(500)
          .json({ error: 'An error occurred while checking status' });
      }
      break;
  }
  res.status(404).end();
}
