import { IsNotEmpty, MinLength } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(3)
  @ApiProperty()
  name: string;
}
