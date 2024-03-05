import { Category } from 'src/Category/entities/category.entity';

export class UpdateProductDto {
    name: string;
  
    description: string;
    
    image:string;

    category: Category;
    
}; 