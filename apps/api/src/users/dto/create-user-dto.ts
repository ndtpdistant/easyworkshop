import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'email', description: 'example@mail.com' })
  readonly email: string;
  @ApiProperty({ example: 'username', description: 'john.doe' })
  readonly username: string;
  @ApiProperty({ example: 'first name', description: 'John' })
  readonly first_name: string;
  @ApiProperty({ example: 'last name', description: 'Doe' })
  readonly last_name: string;
  @ApiProperty({ example: 'password', description: 'hashed password' })
  readonly password: string;
}
