import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './schemas/user.schema';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // getUsers()
  @Get()
  async getUsers(): Promise<User[]> {
    return await this.usersService.findAll();
  }
}
