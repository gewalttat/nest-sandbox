import { ApiProperty } from '@nestjs/swagger';
import { BelongsToMany, Column, DataType, Model, Table } from 'sequelize-typescript';
import { User } from 'src/users/user.model';
import { UserRoles } from './user-roles.model';

interface RoleCreationAttrs {
    id: number,
    value: string,
    description: string
}

/** response schemas */

@Table({ tableName: 'roles'})
export class Role extends Model<Role, RoleCreationAttrs> {
    @ApiProperty({example: 1, description: 'unique id'})
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({example: 'Admin', description: 'Unique user role value'})
    @Column({ type: DataType.STRING, allowNull: false, unique: true })
    value: string;

    @ApiProperty({example: 'User', description: 'Role description'})
    @Column({ type: DataType.STRING, allowNull: true })
    description: string;
    /** decorator to many-to-many data model */
    @BelongsToMany(() => User, () => UserRoles)
    users: [User]
}