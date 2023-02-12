import { UsersModule } from './../users/users.module';
import { UsersService } from './../users/users.service';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { forwardRef } from '@nestjs/common';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [forwardRef(() => UsersModule), JwtModule.register({
    /** token awailability is 48 hours */
    secret: process.env.PRIVATE_KEY || 'SECRET',
    signOptions: {
      expiresIn: '48h'
    }
  })],
  exports: [
    AuthService,
    JwtModule
  ]
})
export class AuthModule {}
