import { Action } from '@ngrx/store';

import { TripModel } from '../models/trip.model';


export enum TripsActionTypes {
  LoadTrips = '[Trips] Load Trips',
  TripsLoaded = '[Trips] Trips Loaded',
  TripsLoadError = '[Trips] Trips Load Error'
}

export class LoadTrips implements Action {
  readonly type = TripsActionTypes.LoadTrips;
}

export class TripsLoadError implements Action {
  readonly type = TripsActionTypes.TripsLoadError;
  constructor(public payload: any) {}
}

export class TripsLoaded implements Action {
  readonly type = TripsActionTypes.TripsLoaded;
  constructor(public payload: TripModel[]) {}
}

export type TripsAction = LoadTrips | TripsLoaded | TripsLoadError;

export const fromTripsActions = {
  LoadTrips,
  TripsLoaded,
  TripsLoadError
};
