import { Module } from "@nestjs/common";
import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";
import { Product } from "./entities/product.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config"
@Module({  
    imports:[
        TypeOrmModule.forFeature([Product]),
        ConfigModule,
    ],
    controllers: [ProductController],  
    providers: [ProductService],

})
export class ProductModule{
   
};