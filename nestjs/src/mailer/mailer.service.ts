import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import  { SendEmailDto } from './dto/send-email.dto';
import Mail from 'nodemailer/lib/mailer';

@Injectable()
export class MailerService {
    constructor(private readonly configService: ConfigService) { }
    mailTransport() {
        // const nodemailer=require('nodemailer');

        const transporter = nodemailer.createTransport({
            host: this.configService.get<string>('MAIL_HOST'),
            post: this.configService.get<string>('MAIL_POST'),
            secure: false ,
            auth: {
                user:this.configService.get<string>('MAIL_USER'),
                pass:this.configService.get<string>('MAIL_PASSWORD'),
            },
        });
        return transporter;
    }

    async sendEmail(dto: SendEmailDto){
        const {from, recipients, subject, html, placeholderReplacements} = dto;

        const transport = await this.mailTransport()
        
        const options: Mail.Options = {
            from: from?? {
                name:  this.configService.get<string>('MAIL_USER'),
                address: this.configService.get<string>('MAIL_PASSWORD'),
            },
            to:recipients,
            subject,
            html,
        };

        try {
            const result = await transport.sendMail(options);
            return result;
        }catch(error) {
            console.log('error:',error)
        }
    }
}
