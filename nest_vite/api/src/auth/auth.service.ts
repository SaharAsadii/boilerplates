import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async register(name: string, email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new this.userModel({ name, email, password: hashedPassword });
    await user.save();
    return {
      id: user._id,
      name,
      email,
      token: this.generateToken(user._id?.toString() ?? ''),
    };
  }

  async login(email: string, password: string) {
    const user = await this.userModel.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return {
      id: user._id,
      name: user.name,
      email,
      token: this.generateToken(user._id?.toString() ?? ''),
    };
  }

  async getUser(userId: string) {
    console.log('userId', userId);
    return this.userModel.findById(userId).select('-password');
  }

  private generateToken(userId: string) {
    return this.jwtService.sign({ userId });
  }
}
