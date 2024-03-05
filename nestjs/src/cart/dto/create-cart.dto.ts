import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Transform } from "class-transformer";
import { Product } from "src/Products/entities/product.entity";

export class CreateCartDto {
    @Exclude()
    id?:number

    @Transform(({value}) => value.trim())
    customerName: string

    @Transform(({ value }) => Array.isArray(value) )
    product: Product
    
    @ApiProperty()
    image:string

    @ApiProperty()
    quantity:number
    
    @Transform(({ value }) => value.toFixed(2)) // Chuyển tổng giá trị thành số với 2 chữ số thập phân
    totalPrice: number


}