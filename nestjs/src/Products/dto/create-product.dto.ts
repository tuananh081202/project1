import { MinLength,IsNotEmpty,} from 'class-validator'

import { ApiProperty } from '@nestjs/swagger';
import { Category } from 'src/Category/entities/category.entity';

export class CreateProductDto {
    @ApiProperty()
    @IsNotEmpty()
    name: string;
    
    @ApiProperty()
    @IsNotEmpty()
    description: string;
    
    @ApiProperty()
    @IsNotEmpty()
    category?: Category;

}; 