import { UnauthorizedException } from '@nestjs/common';
import { UserRole } from '../dtos/enum';

export function checkAdminAccess(user): boolean {
  
  if (user.role === UserRole.ADMIN) {
    return true;
  } else {
    throw new UnauthorizedException('Access denied. You must be an admin.');
  }
}
