import { ApiOperation, ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
   @ApiProperty({example: 'Admin', description: 'unique user role'})
   readonly value: string;
   @ApiProperty({example: 'Default user', description: 'user role description'})
   readonly description: string;
}