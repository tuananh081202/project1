import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { Product } from "src/Products/entities/product.entity";


export class CreatePaymentCartDto{
    @ApiProperty()
    customerName:string

    @ApiProperty()
    paymentMethod:string

    @ApiProperty()
    totalPrice:number

    @ApiProperty()
    @IsNotEmpty()
    product!:Product

    @ApiProperty()
    status: number

}