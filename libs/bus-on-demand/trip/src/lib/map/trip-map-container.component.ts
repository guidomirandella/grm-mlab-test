import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { TripsFacade } from '../+state/trips.facade';
import { PassengerStopModel } from '../models/passenger-stop.model';


@Component({
  selector: 'mlab-bus-on-demand-trip-map-container',
  templateUrl: 'trip-map-container.component.html',
})
export class TripMapContainerComponent {

  selectedTrip$ = this.tripsFacade.selectedTrip$;
  passengersStops$: Observable<PassengerStopModel[]>;

  constructor(private tripsFacade: TripsFacade) {
    this.passengersStops$ = this.tripsFacade.passengersStops$;
  }

}
