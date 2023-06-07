import { Controller, Get, Param, Req } from '@nestjs/common';
import { Request } from 'express';

import { AppService } from './app.service';

@Controller('/users')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Req() request: Request): string {
    console.log('request', request.query);
    return this.appService.getHello();
  }

  @Get(':userName')
  getUser(@Param() params: any): string {
    console.log('params', params.userName);
    return params.userName;
  }
}
