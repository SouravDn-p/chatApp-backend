import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument, UserRole } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { CreateUserResponse, SafeUser } from './schemas/user.types';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async findAll(): Promise<UserDocument[]> {
    return await this.userModel.find().exec();
  }

  async CreateUser(createUserDto: CreateUserDto): Promise<CreateUserResponse> {
    const existingUser = await this.userModel.findOne({
      email: createUserDto.email,
    });
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const createdUser = new this.userModel({
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      email: createUserDto.email,
      password: hashedPassword,
      role: createUserDto.role || 'user',
    });

    const savedUser = await createdUser.save();
    const userObject = savedUser.toObject();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = userObject;

    const safeResult: SafeUser = {
      _id: result._id?.toString() || '',
      firstName: result.firstName,
      lastName: result.lastName,
      email: result.email,
      role: result.role || UserRole.USER,
      refreshToken: result.refreshToken,
    };
    return safeResult;
  }
}
