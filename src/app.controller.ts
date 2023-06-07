import { Body, Controller, Get, Post } from '@nestjs/common';

import { AppService } from './app.service';
import { User } from './interfaces/User';

@Controller('/users')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAllUsers(): User[] {
    return this.appService.getAllUsers();
  }

  @Post()
  getUser(@Body() body: User): void {
    this.appService.addUser(body);
  }
}
