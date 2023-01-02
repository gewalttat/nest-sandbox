import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface UserCreationAttrs {
    email: string,
    password: string
}

/** response schemas */

@Table({ tableName: 'users'})
export class User extends Model<User, UserCreationAttrs> {
    @ApiProperty({example: 1, description: 'unique user id'})
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;
    @ApiProperty({example: 'user@gmail.com', description: 'user e-mail'})
    @Column({ type: DataType.STRING, unique: true, allowNull: false})
    email: string;
    @ApiProperty({example: '12345', description: 'user password'})
    @Column({ type: DataType.STRING, allowNull: false })
    password: string;
    @ApiProperty({example: false, description: 'user ban state'})
    @Column({ type: DataType.BOOLEAN, defaultValue: false })
    banned: boolean;
    @ApiProperty({example: 'racial prejudges', description: 'ban reason'})
    @Column({ type: DataType.STRING, allowNull: true })
    banReason: string;
}