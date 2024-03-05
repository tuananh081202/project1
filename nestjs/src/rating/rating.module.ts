import { Module } from "@nestjs/common";

import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config"
import { Rating } from "./entities/rating.entity";
import { RatingController } from "./rating.controller";
import { RatingService } from "./rating.service";
@Module({  
    imports:[
        TypeOrmModule.forFeature([Rating]),
        ConfigModule,
    ],
    controllers: [RatingController],  
    providers: [RatingService],

})
export class RatingModule{
   
};