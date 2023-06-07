import { Injectable } from '@nestjs/common';
import { User } from './interfaces/User';

@Injectable()
export class AppService {
  private readonly users: User[] = [];

  getHello(): string {
    return 'Hello World!';
  }

  addUser(newUser: User): void {
    this.users.push(newUser);
  }

  getAllUsers(): User[] {
    return this.users;
  }
}
