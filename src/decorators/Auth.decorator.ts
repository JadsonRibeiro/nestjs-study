import { UseGuards, applyDecorators } from '@nestjs/common';
import { Roles } from './Roles.decorator';
import { AuthGuard } from 'src/guards/Auth.guard';
import { RolesGuard } from 'src/guards/Roles.guard';

export function Auth(...roles: string[]) {
  return applyDecorators(Roles(...roles), UseGuards(AuthGuard, RolesGuard));
}
