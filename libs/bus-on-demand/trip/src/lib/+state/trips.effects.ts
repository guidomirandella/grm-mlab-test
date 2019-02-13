import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Effect, Actions } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';

import { TripsPartialState } from './trips.reducer';
import {
  LoadTrips,
  TripsLoaded,
  TripsLoadError,
  TripsActionTypes
} from './trips.actions';
import { TripsService } from '../providers/trips.service';

@Injectable()
export class TripsEffects {
  @Effect() loadTrips$ = this.dataPersistence.fetch(
    TripsActionTypes.LoadTrips,
    {
      run: (action: LoadTrips, state: TripsPartialState) => {
        return this.tripsService.loadAll().pipe(map((trips) => new TripsLoaded(trips)));
      },

      onError: (action: LoadTrips, error) => {
        console.error('Error', error);
        return new TripsLoadError(error);
      }
    }
  );

  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<TripsPartialState>,
    private tripsService: TripsService,
  ) {}
}
