import { Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

import { ContactCompanyDto } from '../dto/contact-company-dto';
import { getContactEmail } from '../functions/get-contact-email';

@Injectable()
export class ContactService {
  async contactCompany(contactCompanyDto: ContactCompanyDto): Promise<ContactCompanyDto> {
    const { name } = contactCompanyDto;
    const transporter = createTransport({
      host: process.env.SMTP,
      port: Number(process.env.MAIL_PORT),
      secure: false,
      auth: {
        user: process.env.MAIL_ACCOUNT,
        pass: process.env.MAIL_PASS,
      },
    });

    const mailOptions: Mail.Options = {
      from: `Valmira <${process.env.MAIL_ACCOUNT_SENDER}>`,
      to: process.env.MAIL_ACCOUNT_RECEIVER,
      subject: `Solicita informes ${name}`,
      html: getContactEmail(contactCompanyDto),
    };
    await transporter.sendMail(mailOptions);

    return contactCompanyDto;
  }
}
