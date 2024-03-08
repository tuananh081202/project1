import { Body, Controller, Post } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { SendEmailDto } from './dto/send-email.dto';
import { Roles } from 'src/auth/decorator/roles.decorator';
@Controller('mailer')
export class MailerController {
    constructor (private readonly mailerService:MailerService){}
    
    @Roles('Admin')
    @Post('send-email')
    async sendMail(@Body() body: Record<string, string>){
        const dto : SendEmailDto ={
            from: { name: 'Tuan Anh', address:'tuan@example.com'},
            recipients: [{name: 'Kien', address:'kien@example.com'}],
            subject:'SMTP',
            html:'<p><strong></strong>Now send your email using our SMTP server and integration of your choice!</strong></p><p>Good luck! Hope it works.</p>',
            placeholderReplacements:body
        }
        return await this.mailerService.sendEmail(dto)
    }
}
