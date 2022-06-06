import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../user/models/user.entity';

@Entity()
export class ReportUser extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'jsonb' })
  public result: object;

  @ManyToOne(() => User, (user) => user.id, { eager: true })
  public user: User;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  public createdAt: Date;
}
