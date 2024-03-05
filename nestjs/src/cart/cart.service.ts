import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateCartDto } from './dto/create-cart.dto';
import { FilterCartDto } from './dto/filter-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import * as fs from 'fs';
import { UpdateProductDto } from 'src/Products/dto/update-product.dto';

@Injectable()
export class CartService {
    constructor(@InjectRepository(Cart) private CartRepository: Repository<Cart>) { }

    async create(CreateCartDto: CreateCartDto): Promise<any> {
        return await this.CartRepository.save(CreateCartDto)
    }

    async findAll(query: FilterCartDto): Promise<any> {
        const items_per_page = Number(query.items_per_page) || 10;
        const page = Number(query.page) || 1;
        const skip = (page - 1) * items_per_page;
        let result = this.CartRepository.createQueryBuilder('cart');
        if (query.search) {
            const search = query.search
            result
                .where('(cart.customerName LIKE :search OR cart.quantity LIKE :search OR cart.totalPrice LIKE :search)', { search: `%${search}%` })
        }
        // if (query.minPrice) {
        //     const minPrice = query.minPrice
        //     result.where('cart.totalPrice >= :minPrice', { minPrice })
        // }
        // if (query.maxPrice) {
        //     const maxPrice = query.maxPrice
        //     result.where('cart.totalPrice <= :maxPrice', { maxPrice })
        // }
        if (query.product) {
            const productId = Number(query.product);
            result.where('cart.product = :productId', { productId });
        }

        result
            .leftJoinAndSelect('cart.product', 'product')
            .orderBy('product.created_at', 'DESC')
            .skip(skip)
            .take(items_per_page)
            .select([
                'cart.id',
                'cart.customerName',
                'cart.quantity',
                'cart.image',
                'cart.totalPrice',
                'cart.status',
                'cart.created_at',
                'cart.updated_at',
                'product.id',
                'product.name',
                'product.description',
                'product.image',
                'product.status',
                'product.created_at',
                'product.updated_at',
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

    async findOne(id: number): Promise<Cart> {
        return await this.CartRepository.findOne({
            where: { id },
            relations: {

                product: true,
            },
            select: {
                id: true,
                customerName: true,
                quantity: true,
                totalPrice: true,
                status: true,
                created_at: true,
                updated_at: true,
                product: {
                    id: true,
                    name: true,
                    description: true,
                    image: true,
                    status: true,
                    created_at: true,
                    updated_at: true,
                },

            }
        });
    }

    async update(id: number, UpdateCartDto:UpdateCartDto): Promise<UpdateResult> {
        const cart = await this.CartRepository.findOneBy({id});
        if (!cart) {
            throw new NotFoundException('Không cập nhật được sản phẩm');
        }
        if (UpdateCartDto.image) {
            const imagePath = cart.image;
            if (fs.existsSync(imagePath)) {
               
                fs.unlinkSync(imagePath);
            }
        }       
        return await this.CartRepository.update(id, UpdateCartDto);   
       
    }

    async delete(id: number): Promise<DeleteResult> {
        const cart = await this.CartRepository.findOneBy({ id });
        if (!cart) {
            throw new NotFoundException('Không xóa được giỏ hàng')
        }
        const imagePath = cart.image;
        if (fs.existsSync(imagePath)) {

            fs.unlinkSync(imagePath);
        }
        return await this.CartRepository.softDelete({ id })
    }







}
