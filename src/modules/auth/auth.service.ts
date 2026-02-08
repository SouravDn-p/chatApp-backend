import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { CreateUserResponse } from '../users/schemas/user.types';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async register(createUserDto: CreateUserDto): Promise<CreateUserResponse> {
    return await this.usersService.CreateUser(createUserDto);
  }
}
