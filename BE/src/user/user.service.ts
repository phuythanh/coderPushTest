import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginateDto, PaginateRequest } from 'src/types/types';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async findAll(request: PaginateRequest): Promise<PaginateDto<UserEntity>> {
    const [result, total] = await this.usersRepository.findAndCount({
      order: { fullName: 'DESC' },
      take: request.size,
      skip: request.skip,
      relations: ['like', 'pass'],
    });

    return {
      results: result,
      totalRecord: total,
    };
  }

  findOne(id: number): Promise<UserEntity> {
    return this.usersRepository.findOne(id);
  }

  async like(myUserId: number, userId: number): Promise<void> {
    const targetUser = await this.usersRepository.findOne(userId);
    const user = await this.usersRepository.findOne(myUserId, {
      relations: ['like'],
    });
    user.like = [...user.like, targetUser];
    await this.usersRepository.update(myUserId, user);
  }

  async pass(myUserId: number, userId: number): Promise<void> {
    const user = await this.usersRepository.findOne(myUserId, {
      relations: ['pass'],
    });
    user.pass = [...user.pass.filter((x) => x.id !== userId)];
    await this.usersRepository.update(myUserId, user);
  }
}
