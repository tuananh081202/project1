import { Injectable } from '@nestjs/common';
import { IsOptional,Matches } from 'class-validator';
@Injectable()
export class FilterProductDto {
  page: string;
  items_per_page: string;
  search: string
  
  @IsOptional()
  @Matches(/^\d+$/, { message: 'Category name cannot be empty.' })
  category?: string;
  
}

  