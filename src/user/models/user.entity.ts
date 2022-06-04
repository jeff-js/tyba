import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique('UQ_user_email', ['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'text' })
  public email: string;

  @Column({ type: 'text' })
  public firstName: string;

  @Column({ type: 'text' })
  public lastName: string;

  @Column({ type: 'text' })
  public password: string;
}
