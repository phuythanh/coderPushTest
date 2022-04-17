import { Entity, PrimaryColumn, ManyToOne } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('userLike')
export class UserLike {
  @PrimaryColumn({ type: 'int' })
  userId: number;

  @PrimaryColumn({ type: 'int' })
  public targetUserId: number;

  @ManyToOne(() => UserEntity, (u) => u.like)
  public targetUser: UserEntity;
}
