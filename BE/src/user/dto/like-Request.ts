import { ApiProperty } from '@nestjs/swagger';

export class LikeRequest {
  @ApiProperty()
  userId: number;
}
