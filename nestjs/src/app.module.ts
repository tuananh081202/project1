import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { dataSourceOptions } from 'db/data_source';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CategoryModule } from './Category/category.module';
import { ProductModule } from './Products/product.module';
import { RatingModule } from './rating/rating.module';
import { CartModule } from './cart/cart.module';
import { PaymentcartModule } from './PaymentCart/paymentcart.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

import { PostModule } from './post/post.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    
    UserModule, 
    AuthModule,
    ConfigModule.forRoot(),
    // MailerModule.forRootAsync({
    //   imports: [ConfigModule],
    //   useFactory: async (config: ConfigService) =>({
    //     transport: {
    //       host: config.get('MAIL_HOST'),
    //       secure: false,
    //       auth:{
    //         user:config.get('MAIL_USER'),
    //         pass:config.get('MAIL_PASSWORD')
    //       },
    //     },
    //     defaults:{
    //       from: `"No Reply"<${config.get('MAIL_FROM')}>`
    //     },
    //     template: {
    //       dir: join(__dirname,'src/templates/email'),
    //       adapter: new HandlebarsAdapter(),
    //       options:{
    //         strict: true,
    //       }
    //     }
    //   }),
    //   inject:[ConfigService]
    // }),
    CategoryModule,
    ProductModule,
    RatingModule,
    CartModule,
    PaymentcartModule,
    PostModule,
    
 
  ],
  controllers: [AppController, ],
  providers:[AppService, ],
})
export class AppModule {}
