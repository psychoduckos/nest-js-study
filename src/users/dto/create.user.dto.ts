import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {

  @ApiProperty({example: 'psychoduck', description: 'user nickname'})
  readonly username: string;

  @ApiProperty({example: '89023243012', description: 'user phone'})
  readonly phone: string;

  @ApiProperty({example: 'qweasdzxc123', description: 'user password'})
  readonly password: string;
}