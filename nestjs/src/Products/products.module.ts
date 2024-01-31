import { Module } from "@nestjs/common";
import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";
import { Product } from "./entities/products.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config"
@Module({  
    imports:[
        TypeOrmModule.forFeature([Product]),
        ConfigModule,
    ],
    controllers: [ProductsController],  
    providers: [ProductsService],

})
export class ProductModule{
    constructor(private catsService: ProductsService) {}
};