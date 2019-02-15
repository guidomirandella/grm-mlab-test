import { Injectable } from '@angular/core';
import { from as observableFrom } from 'rxjs';
import { concatMap, map, tap, filter } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';

import { TripsPartialState } from './trips.reducer';
import {
  SelectTrip,
  LoadTrips,
  LoadPassengerStop,
  PassengerStopLoaded,
  PassengerStopLoadError,
  TripsLoaded,
  TripsLoadError,
  TripsActionTypes, ClearPassengersStops
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

  @Effect() tripSelected$ = this.actions$.pipe(
    ofType<SelectTrip>(TripsActionTypes.SelectTrip),
    map(action => action.payload.stops),
    filter(stops => !!stops && stops.length > 0),
    concatMap(stops => {
      const actions: Action[]  = stops.filter(stop => !!stop.id).map(stop => new LoadPassengerStop(stop.id));
      actions.push(new ClearPassengersStops());

      return observableFrom(actions.reverse());
    })
  );

  @Effect() loadPassengersStops$ = this.dataPersistence.fetch(
    TripsActionTypes.LoadPassengerStop,
    {
      run: (action: LoadPassengerStop, state: TripsPartialState) => {
        return this.tripsService.loadPassengerStop(action.payload).pipe(
          tap(stop => stop.stopId = action.payload),
          map((stop) => new PassengerStopLoaded(stop))
        );
      },

      onError: (action: LoadPassengerStop, error) => {
        console.error('Error', error);
        return new PassengerStopLoadError(error);
      }
    }
  );

  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<TripsPartialState>,
    private tripsService: TripsService,
  ) {}

}
