import { Category } from "src/Category/entities/category.entity"
import { User } from "src/user/entities/user.entity"

export class UpdatePostDto {
    title: string

    summary: string

    description:string

    thumbnail:string

    category: Category

    user: User


}