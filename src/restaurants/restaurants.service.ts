import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { googleConstants } from '../config/google.config';
import { User } from '../user/models/user.entity';
import { ReportsService } from '../reports/reports.service';

@Injectable()
export class RestaurantsService {
  constructor(
    private readonly httpService: HttpService,
    private readonly reportService: ReportsService,
  ) {}

  public async getRestaurants(
    lat: number,
    long: number,
    user: User,
  ): Promise<any> {
    const { data } = await this.httpService
      .get(
        `https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants&location=${lat},${long}&radius=500&key=${googleConstants.apiKey}`,
      )
      .toPromise();

    const result = data.results.map((restaurant) => ({
      name: restaurant.name,
      location: restaurant.geometry.location,
      address: restaurant.formatted_address,
      rating: restaurant.rating,
      types: restaurant.types,
    }));
    this.reportService
      .createReport({
        user,
        result,
      })
      .then();
    return result;
  }
}
