import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts } from './entities/post.entity';
import { DeleteResult, In, Repository, UpdateResult } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { FilterPostDto } from './dto/filter-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import * as fs from 'fs'

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(Posts) private postRepository: Repository<Posts>
    ) { }

    async create(CreatePostDto: CreatePostDto): Promise<Posts> {
        return await this.postRepository.save(CreatePostDto)
    }

    async findAll(query: FilterPostDto): Promise<any> {
        const items_per_page = Number(query.items_per_page) || 10
        const page = Number(query.page) || 1
        const skip = (page - 1) * items_per_page;
        let result = this.postRepository.createQueryBuilder('post')
        if (query.search) {
            const search = query.search
            result
                .where('(post.title LIKE :search OR post.description LIKE :search )')
        }
        if (query.category) {
            const categoryId = Number(query.category)
            result.where('post.category =:categoryId', { categoryId })
        }
        if (query.user) {
            const userId = Number(query.user)
            result.where('post.user =:userId', { userId })
        }

        result
            .leftJoinAndSelect('post.category', 'category')
            .leftJoinAndSelect('post.user', 'user')
            .orderBy('category.create_at', 'DESC')
            .orderBy('user.created_at', 'DESC')
            .skip(skip)
            .take(items_per_page)
            .select([
                'post.id',
                'post.title',
                'post.summary',
                'post.description',
                'post.thumbnail',
                'post.status',
                'post.created_at',
                'post.updated_at',
                'category.id',
                'category.name',
                'category.description',
                'category.created_at',
                'category.updated_at',
                'user.id',
                'user.first_name',
                'user.last_name',
                'user.email',
                'user.avatar',
                'user.status',
                'user.created_at',
                'user.updated_at',
            ])
        const [respone, total] = await result.getManyAndCount();
        const lastPage = Math.ceil(total / items_per_page);
        const nextPage = page + 1 > lastPage ? null : page + 1;
        const prevPage = page - 1 < 1 ? null : page - 1;

        return {
            data: respone,
            total,
            items_per_page,
            currentPage: page,
            nextPage,
            prevPage,
            lastPage,
        };
    }

    async findOne(id: number): Promise<Posts> {
        return await this.postRepository.findOne({
            where: { id },
            relations: {
                category: true,
                user: true,
            },
            select: {
                id: true,
                title: true,
                summary: true,
                description: true,
                thumbnail: true,
                status: true,
                created_at: true,
                updated_at: true,
                category: {
                    id: true,
                    name: true,
                    description: true,
                    created_at: true,
                    updated_at: true,
                },
                user: {
                    id: true,
                    first_name: true,
                    last_name: true,
                    email: true,
                    avatar: true,
                    status: true,
                    created_at: true,
                    updated_at: true,

                }


            }
        })
    }

    async update(id:number,UpdatePostDto:UpdatePostDto):Promise<UpdateResult>{
        const post = await this.postRepository.findOneBy({id})
        if(!post){
            throw new NotFoundException('Không cập nhật được bưu kiện')
        }
        if(UpdatePostDto.thumbnail){
            const imagePath = post.thumbnail;
            if(fs.existsSync(imagePath)){

                fs.unlinkSync(imagePath);

            }
        }
        return await this.postRepository.update(id,UpdatePostDto)
    }

    async delete(id: number):Promise<DeleteResult>{
        const post = await this.postRepository.findOneBy({id})
        if(!post){
            throw new NotFoundException('Không tồn tại bưu kiện')
        }
        const imagePath = post.thumbnail
        if(fs.existsSync(imagePath)){
            fs.unlinkSync(imagePath);
        }
        return await this.postRepository.softDelete({id})

    }

    async multipleDelete(ids:string[]):Promise<DeleteResult>{
        return await this.postRepository.delete({id:In(ids)})
    }


}
