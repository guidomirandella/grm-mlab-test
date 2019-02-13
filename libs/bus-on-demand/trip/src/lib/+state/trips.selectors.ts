import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TRIPS_FEATURE_KEY, TripsState } from './trips.reducer';

// Lookup the 'Trips' feature state managed by NgRx
const getTripsState = createFeatureSelector<TripsState>(TRIPS_FEATURE_KEY);

const getLoaded = createSelector(
  getTripsState,
  (state: TripsState) => state.loaded
);
const getError = createSelector(
  getTripsState,
  (state: TripsState) => state.error
);

const getAllTrips = createSelector(
  getTripsState,
  getLoaded,
  (state: TripsState, isLoaded) => {
    return isLoaded ? state.list : [];
  }
);
const getSelectedId = createSelector(
  getTripsState,
  (state: TripsState) => state.selectedId
);
const getSelectedTrips = createSelector(
  getAllTrips,
  getSelectedId,
  (trips, id) => {
    const result = trips.find(it => it['id'] === id);
    return result ? Object.assign({}, result) : undefined;
  }
);

export const tripsQuery = {
  getLoaded,
  getError,
  getAllTrips,
  getSelectedTrips
};
