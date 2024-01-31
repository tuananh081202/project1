import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { dataSourceOptions } from 'db/data_source';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { CategoryModule } from './Category/category.module';
import { ProductModule } from './Products/products.module';


@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    AuthModule,
    UserModule, 
    ConfigModule.forRoot(),
    CategoryModule,
    ProductModule
 
  ],
  controllers: [AppController],
  providers:[AppService]
})
export class AppModule {}
