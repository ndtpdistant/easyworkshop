// email.service.ts
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'hotmail',
      auth: {
        // user: 'easyworkshop@outlook.com',
        user: 'easyworkshop.test@outlook.com',
        pass: 'jxOIgh8opa48)-fas',
      },
    });
  }

  async sendVerificationEmail(
    to: string,
    verificationCode: string,
  ): Promise<void> {
    const mailOptions = {
      from: 'easyworkshop.test@outlook.com',
      // from: 'easyworkshop@outlook.com',
      to,
      subject: 'Email Verification',
      text: `Your verification code is: ${verificationCode}`,
    };
    await this.transporter.sendMail(mailOptions);
  }
}
