import { Req, UploadedFile,Body, BadRequestException,Get, UseInterceptors, Query, Post, Param, Put, Delete } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { storageConfig } from 'helpers/config';
import { extname } from 'path';
import { FilterPostDto } from './dto/filter-post.dto';
import { Posts } from './entities/post.entity';
import { UpdateCartDto } from 'src/cart/dto/update-cart.dto';
import { UpdatePostDto } from './dto/update-post.dto';


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

    @Get('api/:id')
    async findOne(@Param('id') id:string):Promise<Posts>{
        return await this.PostService.findOne(Number(id))
    }

    @Put('api/:id')
    @UseInterceptors(FileInterceptor('thumbnail',{
        storage: storageConfig('post'),
        fileFilter:(req,file,cb)=>{
            const ext = extname(file.originalname);
            const allowedExtArr = ['.jpg','.jpeg','.png'];
            if(!allowedExtArr.includes(ext)){
                req.fileValidationError = `Accept file ext are: ${allowedExtArr.toString()}`;
                cb(null,false);
            }else{
                const fileSize = parseInt(req.headers['content-length']);
                if(fileSize > 1024 * 5 * 5){
                    req.fileValidationError = 'File size is too large'
                    cb(null,false);
                }else{
                    cb(null,false)
                }
            }
        }
    }))
    async update(@Param('id') id:string,@Body() UpdatePostDto:UpdatePostDto,@Req() req:any,@UploadedFile() file:Express.Multer.File){
        if (req.fileValidationError){
            throw new BadRequestException(req.fileValidationError);
        }
        if(file){
            UpdatePostDto.thumbnail = file.destination + '/' + file.filename;
       }
       return this.PostService.update(Number(id),UpdatePostDto)
    }

    @Delete('api/:id')
    deletePost(@Param('id') id:string){
        return this.PostService.delete(Number(id))
    }



    

}


