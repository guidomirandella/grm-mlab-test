import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';

import { TripsPartialState } from './trips.reducer';
import { tripsQuery } from './trips.selectors';
import { LoadTrips } from './trips.actions';

@Injectable()
export class TripsFacade {

  loaded$ = this.store.pipe(select(tripsQuery.getLoaded));
  allTrips$ = this.store.pipe(select(tripsQuery.getAllTrips));
  selectedTrips$ = this.store.pipe(select(tripsQuery.getSelectedTrips));

  constructor(private store: Store<TripsPartialState>) {}

  loadAll() {
    this.store.dispatch(new LoadTrips());
  }

}
