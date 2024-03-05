
import { Product } from "src/Products/entities/product.entity"
import { IsNotEmpty } from "class-validator"

export class UpdatePaymentcartDto {
  
    customerName:string

    paymentMethod:string

    totalPrice:number

  
    @IsNotEmpty()
    product!:Product

   
}