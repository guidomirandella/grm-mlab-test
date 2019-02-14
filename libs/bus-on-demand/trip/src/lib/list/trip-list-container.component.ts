import { Component } from '@angular/core';

import { TripsFacade } from '../+state/trips.facade';
import { TripModel } from '../models/trip.model';


@Component({
  selector: 'mlab-bus-on-demand-trip-list-container',
  templateUrl: 'trip-list-container.component.html',
})
export class TripListContainerComponent {

  constructor(private tripsFacade: TripsFacade) {
    this.tripsFacade.loadAll();
  }

  selectTrip(trip: TripModel) {
    this.tripsFacade.selectTrip(trip);
  }

}
