import { Post,Req, UploadedFile,Body, BadRequestException,Get, UseInterceptors, Query } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { storageConfig } from 'helpers/config';
import { extname } from 'path';
import { FilterPostDto } from './dto/filter-post.dto';


@ApiTags('Post')
@Controller('post')
export class PostController {

    constructor( private PostService: PostService){}

    @Post('create')
    @UseInterceptors(FileInterceptor('thumbnail',{
        storage: storageConfig('post'),
        fileFilter:(req,file,cb) =>{
            const ext = extname(file.originalname)
            const allowedExtArr=['.jpg','.png','.jpeg'];
            if(!allowedExtArr.includes(ext)){
                req.fileValidationError = `Accept file ext are:${allowedExtArr.toString()}`;
                cb(null,false);
            }else{
                const fileSize= parseInt(req.headers['content-length']);
                if(fileSize > 1024* 1024 * 5){
                    req.fileValidationError='File size is too large'
                    cb(null,false);
                }else{
                    cb(null,true)
                }
            }
        }
    }))
    create(@Req() req:any,@Body() CreatePostDto: CreatePostDto,@UploadedFile() file:Express.Multer.File ){
        if(req.fileValidationError){
            throw new BadRequestException(req.fileValidationError)
        }
        if(!file){
            throw new BadRequestException('File is required!')
        }
        return this.PostService.create({...CreatePostDto,thumbnail:file.destination + '/'+ file.filename})
    }
    
    @Get()
    async findAll(@Query() query:FilterPostDto):Promise<any>{
        return await this.PostService.findAll(query)
    }
}


