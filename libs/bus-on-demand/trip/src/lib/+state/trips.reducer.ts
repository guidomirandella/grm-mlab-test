import { TripsAction, TripsActionTypes } from './trips.actions';
import { TripModel } from '../models/trip.model';


export const TRIPS_FEATURE_KEY = 'trips';

export interface TripsState {
  list: TripModel[]; // list of Trips; analogous to a sql normalized table
  selectedId?: string | number; // which Trips record has been selected
  loaded: boolean; // has the Trips list been loaded
  error?: any; // last none error (if any)
}

export interface TripsPartialState {
  readonly [TRIPS_FEATURE_KEY]: TripsState;
}

export const initialState: TripsState = {
  list: [],
  loaded: false
};

export function tripsReducer(
  state: TripsState = initialState,
  action: TripsAction
): TripsState {
  switch (action.type) {
    case TripsActionTypes.TripsLoaded: {
      state = {
        ...state,
        list: action.payload,
        loaded: true
      };
      break;
    }
  }

  return state;
}
