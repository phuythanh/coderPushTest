import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { UserLike } from './userLike.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column()
  age: number;

  @Column()
  imageUrl: string;

  @ManyToMany(() => UserEntity)
  @JoinTable({
    name: 'user_like',
    joinColumns: [{ name: 'userId_1' }],
    inverseJoinColumns: [{ name: 'userId_2' }],
  })
  public like: UserEntity[];

  @ManyToMany(() => UserEntity)
  @JoinTable({
    name: 'user_pass',
    joinColumns: [{ name: 'userId_1' }],
    inverseJoinColumns: [{ name: 'userId_2' }],
  })
  public pass: UserEntity[];
}
