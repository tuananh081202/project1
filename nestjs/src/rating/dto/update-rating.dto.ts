import { Product } from "src/Products/entities/product.entity";
import { User } from "src/user/entities/user.entity";

export class UpdateRatingDto {
  
  rating: string; // Required, value between 1 and 5

  comment:string;

  product?: Product; // Required, ID of the product being rated

  user?: User; // Optional, ID of the user who submitted the rating (if applicable)
  }