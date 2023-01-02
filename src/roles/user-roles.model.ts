import { ApiProperty } from '@nestjs/swagger';
import { BelongsToMany, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { User } from 'src/users/user.model';
import { Role } from './roles.model';

/** response schemas */

@Table({ tableName: 'user_roles', createdAt: false, updatedAt: false})
export class UserRoles extends Model<UserRoles> {
    @ApiProperty({example: 1, description: 'unique id'})
    id: number;

    @ForeignKey(() => Role)
    @ApiProperty({example: 12345, description: 'Unique user role id'})
    roleId: number;

    @ForeignKey(() => User)
    @ApiProperty({example: 54321, description: 'Unique user id'})
    userId: number;
}