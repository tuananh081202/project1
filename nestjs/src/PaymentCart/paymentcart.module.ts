import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config"
import { PaymentCart } from './entities/paymentcart.entity';
import { PaymentcartController } from './paymentcart.controller';
import { PaymentcartService } from './paymentcart.service';
@Module({  
    imports:[
        TypeOrmModule.forFeature([PaymentCart]),
        ConfigModule,
    ],
    controllers: [PaymentcartController],  
    providers: [PaymentcartService],

})
export class PaymentcartModule{
   
};
