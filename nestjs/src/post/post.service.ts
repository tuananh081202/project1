import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { FilterPostDto } from './dto/filter-post.dto';

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(Post) private postRepository: Repository<Post>
    ) { }

    async create(CreatePostDto: CreatePostDto): Promise<Post> {
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
                'post.description',
                'post.thumbnail',
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
}
