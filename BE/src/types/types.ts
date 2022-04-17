import { ApiProperty } from '@nestjs/swagger';

export interface PaginateDto<T> {
  results: T[];
  totalRecord: number;
}

export class PaginateRequest {
  @ApiProperty()
  page: number;
  @ApiProperty()
  size: number;
  constructor(page, size) {
    this.page = page || 1;
    this.size = size || 10;
  }
  get skip(): number {
    return (this.page || 1 - 1) * this.size;
  }
}
