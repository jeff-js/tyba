import { Injectable, NotFoundException } from '@nestjs/common';
import { genSalt, hash } from 'bcryptjs';
import { compare } from 'bcryptjs';
import { UserService } from '../user/user.service';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  public async createUser(user: RegisterDto) {
    const salt = await genSalt(10);
    const password = await hash(user.password, salt);
    const userData = await this.userService.createUser({ ...user, password });
    return {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
    };
  }

  public async login(email: string, password: string) {
    const user = await this.userService.findUserByEmail(email);
    if (user) {
      const isMatch = await compare(password, user.password);
      if (isMatch) {
        const accessToken = this.jwtService.sign({
          userId: user.email,
          name: `${user.firstName} ${user.lastName}`,
        });
        return {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          accessToken,
        };
      } else {
        throw new NotFoundException('Invalid username or password');
      }
    } else {
      throw new NotFoundException('Invalid username or password');
    }
  }
}
