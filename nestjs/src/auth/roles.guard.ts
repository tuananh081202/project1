import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector:Reflector){}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean>  {
    console.log('Role guard')
    const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles',[
        context.getHandler(),
        context.getClass()
    ])
    console.log("requiredRoles=>",requiredRoles)
    return true;
  }
}
