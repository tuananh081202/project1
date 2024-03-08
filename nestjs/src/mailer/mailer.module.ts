import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MailerController } from './mailer.controller';
import { MailerService } from '@nestjs-modules/mailer';

@Module({
    
    imports: [ConfigModule],
    controllers: [MailerController],
    providers:[MailerService]
   
})
export class MailerModule {}


