import { ApiOperation, ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
   @ApiProperty({example: 'user@gmail.com', description: 'user e-mail'})
   readonly email: string;
   @ApiProperty({example: 'qwerty123', description: 'user password'})
   readonly password: string;
}