import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CurrentUser } from '../auth/current-user.decorator';
import { User } from '../user/models/user.entity';

@Controller('restaurants')
@UseGuards(AuthGuard())
@ApiBearerAuth()
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Get(':lat/:long')
  public getRestaurants(
    @CurrentUser() user: User,
    @Param('lat') lat: number,
    @Param('long') long: number,
  ): Promise<any> {
    return this.restaurantsService.getRestaurants(lat, long, user);
  }
}
