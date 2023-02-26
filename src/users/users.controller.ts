import { AddRoleDto } from './dto/add-role.dto';
import { RolesGuard } from './../auth/roles.guard';
import { JwtAuthGuard } from './../auth/jwt-auth-guard';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Body, Controller, Get, Post, UseGuards, UsePipes } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './user.model';
import { Roles } from 'src/auth/roles-auth.decorator';
import { BanUserDto } from './dto/ban-user.dto';
import { ValidationPipe } from 'src/pipes/validation.pipe';

/** swagger description */
@ApiTags('Users')
@Controller('users')
export class UsersController {
    /** POST user description */
    constructor(private usersSevice: UsersService) {}
    @ApiOperation({summary: 'User creation'})
    @ApiResponse({status: 200, type: User})
    @UsePipes(ValidationPipe)
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
    /** add user role */
    @ApiOperation({summary: 'Give an role'})
    @ApiResponse({status: 200})
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Post('/role')
    AddRole(@Body() dto: AddRoleDto) {
        return this.usersSevice.addRole(dto);
    }
    /** ban user */
    @ApiOperation({summary: 'Ban user'})
    @ApiResponse({status: 200})
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Post('/ban')
    BanUser(@Body() dto: BanUserDto) {
        return this.usersSevice.ban(dto);
    }
}
