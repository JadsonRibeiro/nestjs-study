import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';

import { AppService } from './app.service';
import { FindUsersDTO, User } from './classes/User';
import { ZodValidationPipe } from './pipes/ZodValidation.pipe';
import {
  CreateUserDTO,
  UpdateUserDTO,
  createUserSchema,
  updateUserSchema,
} from './schemas/User';
import { Public } from './decorators/Public.decorator';
import { User as UserFromReq } from './decorators/User.decorator';
import { Roles } from './decorators/Roles.decorator';
import { RolesGuard } from './guards/Roles.guard';
import { LoggerInterceptor } from './interceptors/Logger.interceptor';

@Controller('/users')
@UseGuards(RolesGuard)
@UseInterceptors(LoggerInterceptor)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get()
  findUsers(@Query() query: FindUsersDTO): User[] {
    return this.appService.getAllUsers(query);
  }

  @Get(':id')
  findUser(@Param('id') id: string): User {
    return this.appService.getUser(id);
  }

  @Post()
  @Roles('admin')
  @UsePipes(new ZodValidationPipe(createUserSchema))
  createUser(@Body() body: CreateUserDTO): void {
    this.appService.addUser(body);
  }

  @Put(':id')
  updateUser(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateUserSchema)) body: UpdateUserDTO,
  ) {
    this.appService.updateUser(id, body);
  }

  @Put('profile')
  updateProfile(
    @UserFromReq('id') id: string,
    @Body(new ZodValidationPipe(updateUserSchema)) body: UpdateUserDTO,
  ) {
    this.appService.updateUser(id, body);
  }
}
