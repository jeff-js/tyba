import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { jwtConstants } from '../config/auth.config';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: jwtConstants.key,
      signOptions: {
        expiresIn: jwtConstants.expiresIn,
      },
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [JwtModule, PassportModule, JwtStrategy],
})
export class AuthModule {}
