import { Injectable, BadRequestException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../user/user-schema';
import { CreateUserDto } from '../user/dto/create-user-dto';
import * as bcrypt from 'bcrypt';
import { UserLoginWithPasswordDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async createAccount(dto: CreateUserDto) {
    if (!dto.phone && !(dto.email && dto.password)) {
      throw new BadRequestException(
        'You must provide either phone or email + password.',
      );
    }

    if (dto.email) {
      const existingEmail = await this.userModel.findOne({ email: dto.email });
      if (existingEmail) {
        throw new ConflictException('Email is already in use.');
      }
    }

    if (dto.phone) {
      const existingPhone = await this.userModel.findOne({ phone: dto.phone });
      if (existingPhone) {
        throw new ConflictException('Phone number is already in use.');
      }
    }

    let hashedPassword: string | undefined;
    if (dto.password) {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(dto.password, salt);
    }

    const newUser = new this.userModel({
      ...dto,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    const { password, ...safeData } = savedUser.toObject();
    return safeData;
  }

  async loginWithPassword(dto: UserLoginWithPasswordDto) {
    const user = await this.userModel.findOne({ email: dto.email });
    
    if (!user) {
      throw new BadRequestException('Invalid email or password');
    }
     
    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    // if (!isPasswordValid) {
    //   throw new BadRequestException('Invalid email or password');
    // }
   
    return {
      access_token: this.jwtService.sign({ sub: user.id, email: user.email }),
      user
    };
  }
}
