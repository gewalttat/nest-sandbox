import { UsersModule } from './../users/users.module';
import { UsersService } from './../users/users.service';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [UsersModule, JwtModule.register({
    /** token awailability is 48 hours */
    secret: process.env.PRIVATE_KEY || 'SECRET',
    signOptions: {
      expiresIn: '48h'
    }
  })]
})
export class AuthModule {}
