import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, In, Like, Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
import { FilterUserDto } from './dto/filter-user.dto';
import * as fs from 'fs';
@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) { }
    async findAll(query: FilterUserDto): Promise<any> {
        const items_per_page = Number(query.items_per_page) || 10;
        const page = Number(query.page) || 1;
        const skip = (page - 1) * items_per_page;
        let result = await this.userRepository.createQueryBuilder('user');
        if (query.search) {
            const search = query.search;
            result.where('(user.first_name LIKE :search OR user.last_name LIKE :search OR user.email LIKE :search)', { search: `%${search}%` });
        }
        result.orderBy('created_at', 'DESC')
            .skip(skip)
            .take(items_per_page)
            .select([
                'user.id',
                'user.first_name',
                'user.last_name',
                'user.email',
                'user.avatar',
                'user.status',
                'user.created_at',
                'user.updated_at',
            ])
        const [res, total] = await result.getManyAndCount();
        const lastPage = Math.ceil(total / items_per_page);
        const nextPage = page + 1 > lastPage ? null : page + 1;
        const prevPage = page - 1 < 1 ? null : page - 1
        return {
            data: res,
            total,
            items_per_page: query.items_per_page,
            currentPage: page,
            nextPage,
            prevPage,
            lastPage
        };
    }

    async findOne(id: number): Promise<User> {
        return await this.userRepository.findOneBy({ id })
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const hashPassword = await this.hashPassword(createUserDto.password);

        return await this.userRepository.save({ ...createUserDto, refresh_token: "refresh_token_string", password: hashPassword });
    }

    private async hashPassword(password: string): Promise<string> {
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const hash = await bcrypt.hash(password, salt);

        return hash;
    }

    async update(id: number, updateUserDto: UpdateUserDto): Promise<UpdateResult> {
        return await this.userRepository.update(id, updateUserDto);
    }

    async delete(id: number): Promise<DeleteResult> {
        const user = await this.userRepository.findOneBy({ id });
        if (!user) {
            throw new NotFoundException('Not exist ');
        }
        const imagePath = user.avatar;
        if (fs.existsSync(imagePath)) {
            
            fs.unlinkSync(imagePath);
        }
        return await this.userRepository.softDelete(id);
    }

    async updateAvatar(id:number, avatar:string):Promise<UpdateResult>{
        return await this.userRepository.update(id,{avatar});
    }

    async multipleDelete(ids:string[]):Promise<DeleteResult>{
        return await this.userRepository.delete({id:In(ids)})
    }
    
  


  
}
