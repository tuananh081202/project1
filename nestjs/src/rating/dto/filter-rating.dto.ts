import { Injectable } from "@nestjs/common";
import { IsOptional,Matches } from 'class-validator';
@Injectable()
export class FilterRatingDto {
    page: string;
    items_per_page: string;
    search: string

    @IsOptional()
    @Matches(/^\d+$/, { message: 'Product cannot be empty.' })
    product?: string;

    @IsOptional()
    @Matches(/^\d+$/, { message: 'User cannot be empty.' })
    user?: string;
}