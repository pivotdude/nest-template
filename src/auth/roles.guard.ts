import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RolesT } from '../Models';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  private matchRoles(roles: RolesT[], userRole: RolesT) {
    return roles.includes(userRole);
  }

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<RolesT[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const roleName = user.Role.name as RolesT;
    return this.matchRoles(roles, roleName);
  }
}
