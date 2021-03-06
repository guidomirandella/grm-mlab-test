import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { map, filter, tap } from 'rxjs/operators';

import { TripModel } from '../models/trip.model';
import { MapComponent } from '@mlab/ui';
import { PassengerStopModel } from '../models/passenger-stop.model';


@Component({
  selector: 'mlab-bus-on-demand-trip-map',
  templateUrl: 'trip-map.component.html',
})
export class TripMapComponent {

  _tripSelected$ = new EventEmitter<TripModel>();

  @ViewChild(MapComponent) map: MapComponent;

  @Input()
  set trip(trip$: Observable<TripModel>) {
    this.map.encodedPolyline = trip$.pipe(
      filter(trip => !!trip),
      tap(trip => {
        this.map.latitude = trip.stops[0].point._latitude;
        this.map.longitude = trip.stops[0].point._longitude;
      }),
      map(trip => trip.route),
    );
  }

  @Input()
  set passengersStops(passengersStops$: Observable<PassengerStopModel[]>) {
    this.map.markers = passengersStops$.pipe(
      filter(passengersStops => !!passengersStops),
      map(passengersStops => {
        return passengersStops.map(passengerStop => ({
          infoContent: `Passenger: ${passengerStop.userName}`,
          point: { lat: passengerStop.point._latitude, lng: passengerStop.point._longitude }
        }))
      }),
    );
  }

  @Output()
  get tripSelected(): Observable<TripModel> {
    return this._tripSelected$.asObservable();
  }

  selectTrip(trip: TripModel) {
    this._tripSelected$.emit(trip);
  }

}
