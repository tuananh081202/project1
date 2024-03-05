import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(Post) private postRepository: Repository<Post>
    ) { }

    async create(CreatePostDto: CreatePostDto): Promise<Post> {
        return await this.postRepository.save(CreatePostDto)
    }
}
