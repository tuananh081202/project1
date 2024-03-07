import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer'

@Injectable()
export class MailerService {
    constructor(private readonly configService: ConfigService){}
    mailTransport(){
        const transporter = nodemailer.createTransport ({
            host: "smtp.forwardemail.net",
            post: 465,
            secure: true,
            auth:{
                user:'REPLACE-WITH-YOUR-ALIAS@YOURDOMAIN.COM',
                pass:'REPLACE-WITH-YOUR-GENERATE-PASSWORD',
            }
        })
        return transporter;
    }
}
