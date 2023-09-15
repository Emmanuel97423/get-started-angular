import { Injectable } from '@angular/core';
import type { HousingLocation } from './housinglocation';

@Injectable({
  providedIn: 'root',
})
export class HousingService {
  readonly baseUrl = 'https://angular.io/assets/images/tutorials/faa';
  readonly url = 'http://localhost:3000/locations';

  async getAllHousingLocations(): Promise<HousingLocation[]> {
    try {
      const data = await fetch(this.url);
      return (await data.json()) ?? [];
    } catch (error: any) {
      console.log('error:', error);
      return error;
    }
  }

  async getHousingLocationById(
    id: number
  ): Promise<HousingLocation | undefined> {
    try {
      const data = await fetch(`${this.url}/${id}`);
      return data.json();
    } catch (error: any) {
      console.log('error:', error);
      return error;
    }
  }

  submitApplication(firstName: string, lastName: string, email: string) {
    console.log(
      `Homes application receveid: firstName: ${firstName}, lastName: ${lastName}, email: ${email}`
    );
  }
}
