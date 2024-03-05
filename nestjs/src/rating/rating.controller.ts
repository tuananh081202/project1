import { Controller,Post,Body,Get,Put,Param,Delete, Query,Req, SetMetadata, UseGuards } from '@nestjs/common';
import { Rating } from './entities/rating.entity';
import { RatingService } from './rating.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { FilterRatingDto } from './dto/filter-rating.dto';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles.decorater';
import { RolesGuard } from 'src/auth/roles.guard';


export enum Role {
  ADMIN = 'admin',
  USER = 'user'
}


@ApiTags('Rating')
@Controller('ratings')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @SetMetadata('roles',['Admin'])
  @UseGuards(RolesGuard)
  @Post('create')
  @Roles(Role.USER)
  async create(@Body() createRatingDto: CreateRatingDto): Promise<Rating> {
    return await this.ratingService.create(createRatingDto);
  }

  @Get()
  async findAll(@Query() query:FilterRatingDto): Promise<any> {
    return await this.ratingService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Rating> {
    return await this.ratingService.findOne(Number(id));
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateRatingDto: UpdateRatingDto) {
    return await this.ratingService.update(Number(id), updateRatingDto);
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return this.ratingService.delete(Number(id));
  }
}

