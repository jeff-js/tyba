import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../user/user.service';
import { User } from '../user/models/user.entity';
import { LoginDto } from './dto/login.dto';
import { jwtConstants } from '../config/auth.config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      secretOrKey: jwtConstants.key,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: LoginDto) {
    const user: User = await this.userService.findUserByEmail(payload.email);
    if (!user) {
      throw new UnauthorizedException();
    }
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };
  }
}
