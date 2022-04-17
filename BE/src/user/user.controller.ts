import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { PaginateDto, PaginateRequest } from 'src/types/types';
import { LikeRequest } from './dto/like-Request';
import { PassRequest } from './dto/pass-Request';
import { UserEntity } from '../entities/user.entity';
import { UserService } from './user.service';
const myUserId = 1;

@Controller('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAlls(
    @Query() request: PaginateRequest,
  ): Promise<PaginateDto<UserEntity>> {
    return await this.userService.findAll(request);
  }

  @Get(':userId')
  async getMyProfile(@Query() userId: number): Promise<UserEntity> {
    return await this.userService.findOne(userId);
  }

  @Post('like')
  @ApiBody({ type: LikeRequest })
  async like(@Body() request: LikeRequest): Promise<void> {
    await this.userService.like(myUserId, request.userId);
  }
  @Post('pass')
  @ApiBody({ type: PassRequest })
  async pass(@Body() request: PassRequest): Promise<void> {
    await this.userService.pass(myUserId, request.userId);
  }
}
