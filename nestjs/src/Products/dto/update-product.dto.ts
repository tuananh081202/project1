import { MinLength,IsNotEmpty,IsNumber} from 'class-validator'
import { Exclude } from 'class-transformer'
import { Category } from 'src/Category/entities/category.entity';

export class UpdateProductDto {
    name: string;
  
    description: string;
    
    category: Category;
    
}; 