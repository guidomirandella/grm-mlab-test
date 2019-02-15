import { Action } from '@ngrx/store';

import { TripModel } from '../models/trip.model';
import { PassengerStopModel } from '../models/passenger-stop.model';


export enum TripsActionTypes {
  LoadTrips = '[Trips] Load Trips',
  TripsLoaded = '[Trips] Trips Loaded',
  TripsLoadError = '[Trips] Trips Load Error',
  SelectTrip = '[Trips] Select Trip',
  ClearPassengersStops = '[Trip] Clear Passengers Stops',
  LoadPassengerStop = '[Trips] Load Passenger Stop',
  PassengerStopLoaded = '[Trips] Passenger Stop Loaded',
  PassengerStopLoadError = '[Trips] Passenger Stop Load Error',
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

export class SelectTrip implements Action {
  readonly type = TripsActionTypes.SelectTrip;

  constructor(public payload: TripModel) {}
}

export class LoadPassengerStop implements Action {
  readonly type = TripsActionTypes.LoadPassengerStop;

  constructor(public payload: number) {}
}

export class PassengerStopLoadError implements Action {
  readonly type = TripsActionTypes.PassengerStopLoadError;

  constructor(public payload: any) {}
}

export class PassengerStopLoaded implements Action {
  readonly type = TripsActionTypes.PassengerStopLoaded;

  constructor(public payload: PassengerStopModel) {}
}

export class ClearPassengersStops {
  readonly type = TripsActionTypes.ClearPassengersStops;
}

export type TripsAction =
  | LoadTrips
  | TripsLoaded
  | TripsLoadError
  | SelectTrip
  | ClearPassengersStops
  | LoadPassengerStop
  | PassengerStopLoaded
  | PassengerStopLoadError;

export const fromTripsActions = {
  LoadTrips,
  TripsLoaded,
  TripsLoadError,
  SelectTrip,
  ClearPassengersStops,
  LoadPassengerStop,
  PassengerStopLoaded,
  PassengerStopLoadError,
};
