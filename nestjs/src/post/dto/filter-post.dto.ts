import { IsOptional, Matches } from "class-validator"

export class FilterPostDto {

    page:string
    items_per_page: string
    search:string

    @IsOptional()
    @Matches(/^\d+$/, { message: 'Category name cannot be empty.' })
    category?:string

    @IsOptional()
    @Matches(/^\d+$/, {message:'User cannot be empty'})
    user?:string
}