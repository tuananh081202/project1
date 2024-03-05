import { Injectable } from "@nestjs/common"
import { IsNumber, IsOptional, Matches } from "class-validator"

@Injectable()
export class FilterCartDto{
    page:string
    items_per_page:string
    search:string

    @IsOptional()
    @Matches(/^\d+$/, { message: 'Product name cannot be empty.' })
    product? : string
   
    // @IsOptional()
    // @IsNumber()
    // minPrice?: number

    // @IsOptional()
    // @IsNumber()
    // maxPrice?: number
}