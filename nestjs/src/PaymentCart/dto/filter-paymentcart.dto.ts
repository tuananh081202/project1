import { Injectable } from "@nestjs/common";
import { IsOptional,Matches } from 'class-validator';
@Injectable()
export class FilterPaymentcartDto {
    page: string;
    items_per_page: string;
    search: string

    @IsOptional()
    @Matches(/^\d+$/, { message: 'Product cannot be empty.' })
    product?: string;

   
}
