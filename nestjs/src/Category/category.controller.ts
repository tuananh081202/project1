import { Controller, Post,Body, Query,Get,Put,Param,Delete } from "@nestjs/common";
import { CreateCategoryDto } from "../Category/dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { Category } from "./entities/category.entity";
import { FilterProductDto } from "../Products/dto/filter-product.dto";
import { CategoryService } from "./category.service";

@Controller('category')
export class CategoryController{
    constructor (private readonly categoryService: CategoryService){}

    @Get()
    async findAll(@Query() query: FilterProductDto):Promise<any>{
        return await this.categoryService.findAll(query)
    }


    @Post('create')
    async create(@Body() CreateCategoryDto: CreateCategoryDto):Promise<Category>{
        return await this.categoryService.create(CreateCategoryDto)
    }
    
    @Put(':id')
    async updateCategory(@Param('id') id:string ,@Body() UpdateCategoryDto:UpdateCategoryDto ){
        return await this.categoryService.updateCategory(Number(id),UpdateCategoryDto); 
    }

    @Get(':id')

    async findOne(@Param('id') id:string): Promise<Category>{
        return await this.categoryService.findOne(Number(id));

    }

    @Delete(':id')

    async deleteCategory(@Param('id') id:string){
        return await this.categoryService.deleteCategory(Number(id));
    }


    }





