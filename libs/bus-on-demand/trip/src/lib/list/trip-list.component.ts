import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { TripModel } from '../models/trip.model';


@Component({
  selector: 'mlab-bus-on-demand-trip-list',
  templateUrl: 'trip-list.component.html',
})
export class TripListComponent {

  _trips$: Observable<TripModel[]>;
  _tripSelected$ = new EventEmitter<TripModel>();

  @Input()
  set trips(trips$: Observable<TripModel[]>) {
    this._trips$ = trips$;
  }

  @Output()
  get tripSelected(): Observable<TripModel> {
    return this._tripSelected$.asObservable();
  }

  selectTrip(trip: TripModel) {
    this._tripSelected$.emit(trip);
  }

}
