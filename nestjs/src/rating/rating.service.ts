import { Injectable, NotFoundException } from '@nestjs/common';
import { Rating } from './entities/rating.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { FilterRatingDto } from './dto/filter-rating.dto';

@Injectable()
export class RatingService {

  constructor(@InjectRepository(Rating) private ratingRepository: Repository<Rating>) { }

  async create(createRatingDto: CreateRatingDto): Promise<Rating> {
    return await this.ratingRepository.save(createRatingDto);
  }

  async findAll(query: FilterRatingDto): Promise<any> {
    const items_per_page = Number(query.items_per_page) || 10;
    const page = Number(query.page) || 1;
    const skip = (page - 1) * items_per_page;
    let result = this.ratingRepository.createQueryBuilder('rating');
    if (query.search) {
      const search = query.search
      result
        .where('(rating.rating LIKE :search OR rating.comment LIKE :search)', { search: `%${search}%` })
    }
    if (query.product) {
      const productId = Number(query.product);
      result.andWhere('rating.product = :productId', { productId });
    }
    if (query.user) {
      const userId = Number(query.user);
      result.andWhere('rating.user = :userId', { userId });
    }
    result
      .innerJoinAndSelect('rating.product', 'product')
      .innerJoinAndSelect('rating.user', 'user')
      .orderBy('product.created_at', 'DESC')
      .orderBy('user.created_at', 'DESC')
      .skip(skip)
      .take(items_per_page)
      .select([
        'rating.id',
        'rating.rating',
        'rating.comment',
        'rating.status',
        'rating.created_at',
        'rating.updated_at',
        'product.id',
        'product.name',
        'product.description',
        'product.image',
        'product.status',
        'product.created_at',
        'product.updated_at',
        'user.id',
        'user.first_name',
        'user.last_name',
        'user.email',
        'user.avatar',
        'user.status',
        'user.created_at',
        'user.updated_at',

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

  async findOne(id: number): Promise<Rating> {
    return await this.ratingRepository.findOne({
      where: { id },
      relations: {
        user: true,
        product: true,
      },
      select: {
        id: true,
        rating: true,
        comment:true,
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
    });
  }

  async update(id: number, updateRatingDto: UpdateRatingDto): Promise<UpdateResult> {
    const rating = await this.ratingRepository.findOneBy({ id });
    if (!rating) {
      throw new NotFoundException('Không cập nhật được đánh giá');
  }
    return await this.ratingRepository.update(id, updateRatingDto);
  }

  async delete(id: number):Promise<DeleteResult>{
    const rating = await this.ratingRepository.findOneBy({id});
    if (!rating){
      throw new NotFoundException('Không tồn tại đánh giá');
    }
      return await this.ratingRepository.softDelete({id})
  }
}

