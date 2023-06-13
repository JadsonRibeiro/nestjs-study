import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  UnauthorizedException,
} from '@nestjs/common';

import { AppService } from './app.service';
import { User } from './interfaces/User';

@Controller('/users')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAllUsers(): User[] {
    try {
      throw new Error('Eror qualquer');
      return this.appService.getAllUsers();
    } catch (error) {
      throw new UnauthorizedException('Você não tem autorização', {
        cause: error,
      });
    }
  }

  @Post()
  getUser(@Body() body: User): void {
    this.appService.addUser(body);
  }
}
