import { RolesGuard } from './../auth/roles.guard';
import { JwtAuthGuard } from './../auth/jwt-auth-guard';
import { RolesService } from './../roles/roles.service';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './user.model';
import { Roles } from 'src/auth/roles-auth.decorator';

/** swagger description */
@ApiTags('Users')
@Controller('users')
export class UsersController {
    /** POST user description */
    constructor(private usersSevice: UsersService) {}
    @ApiOperation({summary: 'User creation'})
    @ApiResponse({status: 200, type: User})
    @Post()
    create(@Body() userDto: CreateUserDto) {
        return this.usersSevice.createUser(userDto);
    }
    /** GET users description */
    @ApiOperation({summary: 'Get all users'})
    @ApiResponse({status: 200, type: Array<User>})
    @Roles('ADMIN')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get()
    getAll() {
        return this.usersSevice.getAllUsers();
    }
}
