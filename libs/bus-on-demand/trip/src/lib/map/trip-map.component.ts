import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { map, filter, tap } from 'rxjs/operators';

import { TripModel } from '../models/trip.model';
import { MapComponent } from '@mlab/ui';


@Component({
  selector: 'mlab-bus-on-demand-trip-map',
  templateUrl: 'trip-map.component.html',
})
export class TripMapComponent {

  _tripSelected$ = new EventEmitter<TripModel>();

  @ViewChild(MapComponent) map: MapComponent;

  @Input()
  set trip(trip$: Observable<TripModel>) {
    this.map.polylinePoints = trip$.pipe(
      filter(trip => !!trip),
      map(trip => trip.stops),
      map(stops => stops.map(stop => ({ latitude: stop.point._latitude, longitude: stop.point._longitude }))),
      tap(points => console.table(points)),
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
