import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { DeleteResult, In, Like, Repository, UpdateResult } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { FilterProductDto } from './dto/filter-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import * as fs from 'fs';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product) private productRepository: Repository<Product>
        
    ) { }
    async create(createProductDto: CreateProductDto): Promise<Product> {
        return await this.productRepository.save(createProductDto);
        
    }

    async findAll(query: FilterProductDto): Promise<any> {
        const items_per_page = Number(query.items_per_page) || 10;
        const page = Number(query.page) || 1;
        const skip = (page - 1) * items_per_page;
        let result = this.productRepository.createQueryBuilder('product');
        if (query.search) {
            const search = query.search
            result
                .where('(product.name LIKE :search OR product.description LIKE :search)', { search: `%${search}%` })
        }
        if (query.category) {
            const categoryId = Number(query.category);
            result.where('product.category = :categoryId', { categoryId });
        }
        // if (query.rating) {
        //     const ratingId = Number(query.rating);
        //     result.where('product.rating = :ratingId', { ratingId });
        // }
        result
            .leftJoinAndSelect('product.category', 'category')
            // .leftJoinAndSelect('product.rating', 'rating')
            .orderBy('category.created_at', 'DESC')
            // .orderBy('rating.created_at', 'DESC')
            .skip(skip)
            .take(items_per_page)
            .select([
                'product.id',
                'product.name',
                'product.description',
                'product.image',
                'product.status',
                'product.created_at',
                'product.updated_at',
                // 'rating.id',
                // 'rating.rating',
                // 'rating.comment',
                // 'rating.status',
                // 'rating.created_at',
                // 'rating.updated_at',
                'category.id',
                'category.name',
                'category.description',
                'category.created_at',
                'category.updated_at',

            ]);
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
            lastPage
        };
    }

    async findOne(id: number): Promise<Product> {
        return await this.productRepository.findOne({
            where: { id },
            relations: {
                category: true,
            },
            select: {
                id: true,
                name: true,
                description: true,
                image: true,
                created_at: true,
                updated_at: true,
                category: {
                    id: true,
                    name: true,
                    description: true,
                    created_at: true,
                    updated_at: true,
                },

            }
        });
    }

    async update(id: number, updateProductDto: UpdateProductDto): Promise<UpdateResult> {
        const product = await this.productRepository.findOneBy({id});
        if (!product) {
            throw new NotFoundException('Không cập nhật được sản phẩm');
        }
        if (updateProductDto.image) {
            const imagePath = product.image;
            if (fs.existsSync(imagePath)) {
               
                fs.unlinkSync(imagePath);
            }
        }       
        return await this.productRepository.update(id, updateProductDto);   
       
    }
    
    
    async deleteProduct(id: number): Promise<DeleteResult> {
        const product = await this.productRepository.findOneBy({ id });
        if (!product) {
            throw new NotFoundException('Không tồn tại sản phẩm');
        }
        const imagePath = product.image;
        if (fs.existsSync(imagePath)) {
            
            fs.unlinkSync(imagePath);
        }
        return await this.productRepository.softDelete({ id });
    }

    async multipleDelete(ids:string[]):Promise<DeleteResult>{
        return await this.productRepository.delete({id:In(ids)})
    }
}

   

