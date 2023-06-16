import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateUserDTO, User } from './classes/User';
import { AppException } from './exceptions/App.exception';
import { CreateUserDTO } from './schemas/User';

@Injectable()
export class AppService {
  private readonly users: User[] = [];

  addUser(newUser: CreateUserDTO): void {
    this.users.push({
      id: String(Math.floor(Math.random() * 10000)),
      ...newUser,
    });
  }

  getAllUsers({ name, age }: { name?: string; age?: number }): User[] {
    let usersCp = this.users;

    if (name)
      usersCp = usersCp.filter((item) =>
        item.name.toLowerCase().includes(name.toLowerCase()),
      );

    if (age) usersCp = usersCp.filter((item) => item.age === age);

    return usersCp;
  }

  getUser(id: string): User {
    const user = this.users.find((user) => user.id === id);

    if (!user) throw new BadRequestException('User dont exists');

    return user;
  }

  updateUser(id: string, data: UpdateUserDTO): void {
    const userIndex = this.users.findIndex((user) => user.id === id);

    console.log('user index', userIndex);

    // if (userIndex === -1) throw new BadRequestException('User not found');
    if (userIndex === -1)
      throw new AppException('User not found', 404, 'UserNotFound');

    this.users[userIndex] = {
      ...this.users[userIndex],
      ...data,
    };
  }
}
