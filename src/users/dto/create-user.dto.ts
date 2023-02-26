import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
   @ApiProperty({example: 'user@gmail.com', description: 'user e-mail'})
   @IsString({ message: 'Should be string' })
   @IsEmail({}, { message: 'Uncorrect e-mail' })
   readonly email: string;
   @ApiProperty({example: 'qwerty123', description: 'user password'})
   @IsString({ message: 'Should be string' })
   @Length(5, 10, { message: 'Password length should between 5 and 10' })
   readonly password: string;
}