import { Category } from "src/Category/entities/category.entity"
import { User } from "src/user/entities/user.entity"

export class CreatePostDto {
    title:string

    summary: string

    description:string

    thumbnail: string

    status:number

    user: User

    category: Category
}