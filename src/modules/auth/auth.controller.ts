import { CreateUserDto } from './../users/dto/create-user.dto';
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserResponse } from '../users/schemas/user.types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body() createUserDto: CreateUserDto,
  ): Promise<CreateUserResponse> {
    return await this.authService.register(createUserDto);
  }
}
