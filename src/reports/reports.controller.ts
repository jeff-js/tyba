import { Controller, Get, UseGuards } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { User } from '../user/models/user.entity';
import { CurrentUser } from '../auth/current-user.decorator';

@Controller('reports')
@UseGuards(AuthGuard())
@ApiBearerAuth()
export class ReportsController {
  constructor(private readonly reportsUser: ReportsService) {}

  @Get()
  @ApiBearerAuth()
  public getReportByUser(@CurrentUser() user: User) {
    return this.reportsUser.getReportsByUserId(user);
  }
}
