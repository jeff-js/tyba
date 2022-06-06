import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReportUser } from './models/report.entity';
import { User } from '../user/models/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(ReportUser)
    private readonly reportUserRepository: Repository<ReportUser>,
    private readonly userService: UserService,
  ) {}

  public async createReport(report: { result: any; user: User }) {
    const userDb = await this.userService.findUserByEmail(report.user.email);
    return this.reportUserRepository
      .createQueryBuilder()
      .insert()
      .into(ReportUser)
      .values([{ result: report.result, user: userDb }])
      .execute();
  }

  public async getReportsByUserId(user) {
    return this.reportUserRepository.find({ where: { user: user } });
  }
}
