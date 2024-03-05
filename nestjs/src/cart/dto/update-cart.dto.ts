import { Exclude, Transform } from "class-transformer";
import { Product } from "src/Products/entities/product.entity";

export class UpdateCartDto {
    @Transform(({ value }) => value.trim())
    customerName: string;
  
    @Transform(({ value }) => Array.isArray(value) )
    product!: Product;
    
    image:string;

    quantity:number;
    
    @Transform(({ value }) => value.toFixed(2))
    totalPrice?: number;
  }
  