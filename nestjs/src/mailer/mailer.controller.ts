import { Controller, Post } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { SendEmailDto } from './dto/send-email.dto';

@Controller('mailer')
export class MailerController {
    constructor (private readonly mailerService:MailerService){}
    
    @Post('send-email')
    async sendMail(){
        const dto : SendEmailDto ={
            from: { name: 'Tuan Anh', address:'tuan@example.com'},
            recipients: [{name: 'Kien', address:'kien@example.com'}],
            subject:'SMTP',
            html:'<p><strong></strong>Now send your email using our SMTP server and integration of your choice!</strong></p><p>Good luck! Hope it works.</p>'
        }
        return await this.mailerService.sendEmail(dto)
    }
}
