import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentCart } from './entities/paymentcart.entity';
import { DeleteResult, In, Repository, UpdateResult } from 'typeorm';
import { CreatePaymentCartDto } from './dto/create-paymentcart.dto';
import { FilterPaymentcartDto } from './dto/filter-paymentcart.dto';
import { UpdatePaymentcartDto } from './dto/update-paymentcart.dto';


@Injectable()
export class PaymentcartService {
    constructor(@InjectRepository(PaymentCart) private paymentcartRepository: Repository<PaymentCart>) { }

    async create(createPaymentCartDto: CreatePaymentCartDto): Promise<PaymentCart> {

        return await this.paymentcartRepository.save(createPaymentCartDto)
    }


    async findAll(query: FilterPaymentcartDto): Promise<any> {
        const items_per_page = Number(query.items_per_page) || 10
        const page = Number(query.page) || 1
        const skip = (page - 1) * items_per_page;
        let result = this.paymentcartRepository.createQueryBuilder('payment_cart')
        if (query.search) {
            const search = query.search
            result
                .where('(payment_cart.customerName LIKE :search OR  payment_cart.paymentMethod LIKE :search OR payment_cart.totalPrice LIKE :search)', { search: `%${search}%` })
        }
        if (query.product) {
            const productId = Number(query.product)
            result.where('payment_cart.product = :productId', { productId });
        }

        result
            .leftJoinAndSelect('payment_cart.product', 'product')
            .orderBy('product.created_at', 'DESC')
            .skip(skip)
            .take(items_per_page)
            .select([
                'payment_cart.id',
                'payment_cart.customerName',
                'payment_cart.paymentMethod',
                'payment_cart.totalPrice',
                'payment_cart.status',
                'payment_cart.created_at',
                'payment_cart.updated_at',
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

    async findOne(id: number): Promise<PaymentCart> {
        return await this.paymentcartRepository.findOne({
            where: { id },
            relations: {
                product: true,
            },
            select: {
                id: true,
                customerName: true,
                paymentMethod: true,
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

    async update(id: number, UpdatePaymentcartDto: UpdatePaymentcartDto): Promise<UpdateResult> {
        const PaymentCart = await this.paymentcartRepository.findOneBy({ id })
        if (!PaymentCart) {
            throw new NotFoundException('Không cập nhật được thanh toán');
        }
        return await this.paymentcartRepository.update(id, UpdatePaymentcartDto);
    }

    async delete(id: number): Promise<DeleteResult> {
        const PaymentCart = await this.paymentcartRepository.findOneBy({ id })
        if (!PaymentCart) {
            throw new NotFoundException('Không xóa được thanh toán')
        }
        return await this.paymentcartRepository.softDelete({ id })
    }

    async multipleDelete(ids: string[]): Promise<DeleteResult> {
        return await this.paymentcartRepository.delete({ id: In(ids) })
    }
}

