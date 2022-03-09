import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  constructor(private config: ConfigService){}
  
  async sendMail(from: string, to: string, subject: string, text: string) {
    const nodemailer = require('nodemailer');
    const smtpTransport = nodemailer.createTransport({
      host: this.config.get("MAIL_HOST"),
      port:  this.config.get("MAIL_PORT"),
      auth: {
        user:  this.config.get("MAIL_USER"),
        pass:  this.config.get("MAIL_PASS"),
      },
    });
    await smtpTransport.sendMail({
      from: from,
      to: to,
      subject: subject,
      text: text
    });
  }
}
