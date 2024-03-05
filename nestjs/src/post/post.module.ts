import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { Posts } from './entities/post.entity';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports:[
    TypeOrmModule.forFeature([Posts]),
    ConfigModule,

  ],
  controllers: [PostController],
  providers: [PostService]
})
export class PostModule {}
