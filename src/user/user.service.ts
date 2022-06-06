import { Injectable } from '@nestjs/common';
import { User } from './models/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async createUser(user: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }): Promise<User> {
    return this.userRepository.save(user);
  }

  public async findUserByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }
}
