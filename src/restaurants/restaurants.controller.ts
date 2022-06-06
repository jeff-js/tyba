import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('restaurants')
@UseGuards(AuthGuard())
@ApiBearerAuth()
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Get(':lat/:long')
  public getRestaurants(
    @Param('lat') lat: number,
    @Param('long') long: number,
  ): Promise<any> {
    return this.restaurantsService.getRestaurants(lat, long);
  }
}
