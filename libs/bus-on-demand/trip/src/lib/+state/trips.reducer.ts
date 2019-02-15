import { TripsAction, TripsActionTypes } from './trips.actions';
import { TripModel } from '../models/trip.model';
import { PassengerStopModel } from '../models/passenger-stop.model';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';


export const TRIPS_FEATURE_KEY = 'trips';

export interface TripsState {
  list: TripModel[]; // list of Trips; analogous to a sql normalized table
  passengersStops: PassengerStopState,
  selectedId?: string | number; // which Trips record has been selected
  selectedTrip?: TripModel,
  loaded: boolean; // has the Trips list been loaded
  error?: any; // last none error (if any)
}

export interface TripsPartialState {
  readonly [TRIPS_FEATURE_KEY]: TripsState;
}

export interface PassengerStopState extends EntityState<PassengerStopModel> {}

export const passengerStopAdapter: EntityAdapter<PassengerStopModel> = createEntityAdapter<PassengerStopModel>({
  selectId: passengerStopModel => passengerStopModel.stopId
});

export const initialState: TripsState = {
  list: [],
  passengersStops: passengerStopAdapter.getInitialState(),
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
    case TripsActionTypes.ClearPassengersStops: {
      state = {
        ...state,
        passengersStops: passengerStopAdapter.removeAll(state.passengersStops),
      };
      break;
    }
    case TripsActionTypes.PassengerStopLoaded: {
      state = {
        ...state,
        passengersStops: passengerStopAdapter.upsertOne(action.payload, state.passengersStops),
      };
      break;
    }
    case TripsActionTypes.SelectTrip: {
      state = {
        ...state,
        selectedTrip: action.payload,
      };
      break;
    }
  }

  return state;
}
