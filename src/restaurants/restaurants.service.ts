import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { googleConstants } from '../config/google.config';

@Injectable()
export class RestaurantsService {
  constructor(private readonly httpService: HttpService) {}

  public async getRestaurants(lat: number, long: number): Promise<any> {
    const { data } = await this.httpService
      .get(
        `https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants&location=${lat},${long}&radius=500&key=${googleConstants.apiKey}`,
      )
      .toPromise();

    return data.results.map((restaurant) => ({
      name: restaurant.name,
      location: restaurant.geometry.location,
      address: restaurant.formatted_address,
      rating: restaurant.rating,
      types: restaurant.types,
    }));
  }
}
