import { Controller, Body, Post, Query, Get, Param, Put, Delete, Req, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { Cart } from './entities/cart.entity';
import { FilterCartDto } from './dto/filter-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { storageConfig } from 'helpers/config';
import { extname } from 'path';
import { ApiTags } from '@nestjs/swagger';
//import { PaymentCartDto } from './dto/payment-cart.dto';

@ApiTags('Cart')
@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService) { }

    @Post('create')
    @UseInterceptors(FileInterceptor('image', {
        storage: storageConfig('cart'),
        fileFilter: (req, file, cb) => {
            const ext = extname(file.originalname);
            const allowedExtArr = ['.jpg', '.jpeg', '.png'];
            if (!allowedExtArr.includes(ext)) {
                req.fileValidationError = `Accept file ext are: ${allowedExtArr.toString()}`;
                cb(null, false);
            } else {
                const fileSize = parseInt(req.headers['content-length']);
                if (fileSize > 1024 * 1024 * 5) {
                    req.fileValidationError = 'File size is too large.Accept file size is less than 5MB';
                    cb(null, false);
                } else {
                    cb(null, true)
                }
            }
        }
    }))
    async create(@Req() req: any, @Body() CreateCartDto: CreateCartDto, @UploadedFile() file: Express.Multer.File) {
        if (req.fileValidationError) {
            throw new BadRequestException(req.fileValidationError);
        }
        if (!file) {
            throw new BadRequestException('File is required!')
        }
        return await this.cartService.create({...CreateCartDto,image:file.destination + '/' +file.filename});
    }

    @Get()
    async findAll(@Query() query: FilterCartDto): Promise<any> {
        return this.cartService.findAll(query)
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Cart> {
        return this.cartService.findOne(Number(id))
    }

    @Put(':id')
    @UseInterceptors(FileInterceptor('image', {
        storage: storageConfig('cart'),
        fileFilter: (req, file, cb) => {
            const ext = extname(file.originalname);
            const allowedExtArr = ['.jpg', '.pneg', '.png']
            if (!allowedExtArr.includes(ext)) {
                req.fileValidationError = `Accept file ext are:${allowedExtArr.toString()} `
                cb(null, false)
            } else {
                const fileSize = parseInt(req.headers['content-length'])
                if (fileSize > 1024 * 1024 * 5) {
                    req.fileValidationError = 'File size is to large.Accpet file size is less than 5MB'
                    cb(null, false)
                } else {
                    cb(null, true)
                }
            }
        }
    }))
    async update(@Param('id') id: string, @Body() UpdateCartDto: UpdateCartDto, @Req() req: any, @UploadedFile() file: Express.Multer.File) {
        if (req.fileValidationError) {
            throw new BadRequestException(req.fileValidationError)
        }
        if (file) {
            UpdateCartDto.image = file.destination + '/' + file.filename
        }
        return this.cartService.update(Number(id), UpdateCartDto)
    }

    @Delete(':id')
    deleteCart(@Param('id') id: string) {
        return this.cartService.delete(Number(id))
    }

}
