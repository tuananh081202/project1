import {
    CanActivate,
    ExecutionContext,
    HttpException,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import { Request } from 'express';
  import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';


  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(
      private jwtService: JwtService,
      private configService:ConfigService,
      @InjectRepository(User) private userRepository:Repository<User>
       
      ) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      console.log("Vao Authguard =======>set user vào request")
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);
      if (!token) {
        throw new UnauthorizedException();
      }
      try {
        const payload = await this.jwtService.verifyAsync(
          token,
          {
            secret: this.configService.get<string>('SECRET')
          }
        );
        // 💡 We're assigning the payload to the request object here
        // so that we can access it in our route handlers
        const user = await this.userRepository.findOneBy({ id:payload.id })
        request ['user'] = user
        request['user_data'] = payload;
      } catch {
        throw new UnauthorizedException()
         
        
    }
      return true;
    }
  
    private extractTokenFromHeader(request: Request): string | undefined {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;
    }
  }