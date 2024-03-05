import { IsNotEmpty,} from 'class-validator'

import { ApiProperty } from '@nestjs/swagger';
import { Product } from 'src/Products/entities/product.entity';
import { User } from 'src/user/entities/user.entity';

export class CreateRatingDto {
    @ApiProperty()
    rating: string; // Required, value between 1 and 5

    @ApiProperty()
    comment:string;

    @ApiProperty()
    @IsNotEmpty()
    product!: Product; // Required, ID of the product being rated

    @ApiProperty()
    @IsNotEmpty()
    user!: User; // Optional, ID of the user who submitted the rating (if applicable)

    @ApiProperty()
    status:number;
  }