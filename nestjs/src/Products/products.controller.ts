import { Controller, Get, Post,Put,Delete, Param, Body, ValidationPipe, Query } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { Product } from "./entities/products.entity";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { FilterProductDto } from "./dto/filter-product.dto";


@Controller('products')
export class ProductsController {
   constructor(private readonly ProductsService: ProductsService){}

   @Get()
   async findAll(@Query() query:FilterProductDto):Promise<any>{
      return await this.ProductsService.findAll(query)
   }
   
   @Post('create')
    async createProduct(@Body() CreateProductDto: CreateProductDto):Promise<Product>{
      return await this.ProductsService.createProduct(CreateProductDto)
   }
    
   @Get('/:id')
   async findOne(@Param('id')id:string):Promise<Product>{
      return await this.ProductsService.findOne(Number(id))
   }
   @Put('/:id')
   async updateProduct(@Param('id') id:string ,@Body() UpdateProductDto:UpdateProductDto ){
      return await this.ProductsService.updateProduct(Number(id),UpdateProductDto); 
  }
   @Delete('/:id')
   async DeleteProduct(@Param('id') id:string){
      return await this.ProductsService.deleteProduct(Number(id))
   }
}


