import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingService } from '../housing.service';
import type { HousingLocation } from '../housinglocation';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HousingLocationComponent],
  template: `
    <section>
      <form (submit)="filterResults($event, filter.value)">
        <input type="text" placeholder="Filter by city" #filter />
        <button class="primary" type="button">Search</button>
      </form>
    </section>
    <section class="results">
      <app-housing-location
        *ngFor="let housingLocation of filteredLocationList"
        [housingLocation]="housingLocation"
      ></app-housing-location>
    </section>
  `,
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  housingLocationList: HousingLocation[] = [];
  housingService: HousingService = inject(HousingService);
  filteredLocationList: HousingLocation[] = [];

  constructor() {
    this.housingService
      .getAllHousingLocations()
      .then((data: HousingLocation[]) => {
        this.housingLocationList = data;
        this.filteredLocationList = data;
      })
      .catch((error: any) => error);
  }

  filterResults(e: SubmitEvent, text: string): void {
    e.preventDefault();
    if (!text) this.filteredLocationList = this.housingLocationList;
    this.filteredLocationList = this.housingLocationList.filter(
      (housingLocation) =>
        housingLocation.state.toLowerCase().includes(text.toLowerCase()) ||
        housingLocation.city.toLowerCase().includes(text.toLowerCase())
    );
  }
}
