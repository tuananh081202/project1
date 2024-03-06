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
import { PostModule } from './post/post.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/roles.guard';
import { AuthGuard } from './auth/auth.guard';
import { User } from './user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    
    UserModule, 
    AuthModule,
    ConfigModule.forRoot(),
    CategoryModule,
    ProductModule,
    RatingModule,
    CartModule,
    PaymentcartModule,
    PostModule,
    TypeOrmModule.forFeature([User])
  ],
  controllers: [AppController, ],
  providers:[AppService,
  {
    provide:APP_GUARD,
    useClass: AuthGuard
  },
  {
    provide:APP_GUARD,
    useClass: RolesGuard
  } 
],
})
export class AppModule {}
