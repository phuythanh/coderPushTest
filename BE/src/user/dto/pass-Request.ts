import { ApiProperty } from '@nestjs/swagger';

export class PassRequest {
  @ApiProperty()
  userId: number;
}
