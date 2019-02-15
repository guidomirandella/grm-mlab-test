import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';

import { TripsPartialState } from './trips.reducer';
import { tripsQuery } from './trips.selectors';
import { LoadTrips, SelectTrip } from './trips.actions';
import { TripModel } from '../models/trip.model';

@Injectable()
export class TripsFacade {

  loaded$ = this.store.pipe(select(tripsQuery.getLoaded));
  allTrips$ = this.store.pipe(select(tripsQuery.getAllTrips));
  selectedTrips$ = this.store.pipe(select(tripsQuery.getSelectedTrips));
  selectedTrip$ = this.store.pipe(select(tripsQuery.getSelectedTrip));
  passengersStops$ = this.store.pipe(select(tripsQuery.getAllPassengersStops));

  constructor(private store: Store<TripsPartialState>) {}

  loadAll() {
    this.store.dispatch(new LoadTrips());
  }

  selectTrip(trip: TripModel) {
    this.store.dispatch(new SelectTrip(trip));
  }

}
