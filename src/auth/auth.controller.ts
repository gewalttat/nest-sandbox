import { UsersService } from './../users/users.service';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';

@ApiTags('authorization')
@Controller('auth')
export class AuthController {
    constructor(private authSevice: AuthService) {}
    @Post('/login')
    login(@Body() dto: CreateUserDto) {
        return this.authSevice.login(dto);
    }
    @Post('/registration')
    registration(@Body() dto: CreateUserDto) {
        return this.authSevice.registration(dto);
    }
}
