import { BanUserDto } from './dto/ban-user.dto';
import { AddRoleDto } from './dto/add-role.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.model';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RolesService } from 'src/roles/roles.service';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private userRepository: typeof User, private roleService: RolesService) {}

    async createUser(dto: CreateUserDto) {
        const user = await this.userRepository.create(dto);
        const role = await this.roleService.getRoleByValue("User");
        await user.$set('roles', [role.id])
        user.roles = [role];
        return user;
    }

    async getAllUsers() {
        return await this.userRepository.findAll({ include: { all: true }});
    }

    async getUserByEmail(email: string) {
        return await this.userRepository.findOne({ where: { email }, include: { all: true }});
    }

    async addRole(dto: AddRoleDto) {
        /** find user and role */
        const { userId, value } = dto;
        const user = await this.userRepository.findByPk(userId);
        const role = await this.roleService.getRoleByValue(value);

        /** if founded add new role */
        if (role && user) {
            user.$add('role', role.id);
            return dto;
        }

        throw new HttpException('User or role has not found', HttpStatus.NOT_FOUND);
    }

    async ban(dto: BanUserDto) {
        /** find user */
        const { userId, reason } = dto;
        const user = await this.userRepository.findByPk(userId);
        /** change statuses */
        user.banned = true;
        user.banReason = reason;
        /** save and return */
        await user.save();
        return user;
    }
}
