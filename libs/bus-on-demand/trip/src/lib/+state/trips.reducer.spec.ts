import { TripsLoaded } from './trips.actions';
import {
  TripsState,
  Entity,
  initialState,
  tripsReducer
} from './trips.reducer';

describe('Trips Reducer', () => {
  const getTripsId = it => it['id'];
  let createTrips;

  beforeEach(() => {
    createTrips = (id: string, name = ''): Entity => ({
      id,
      name: name || `name-${id}`
    });
  });

  describe('valid Trips actions ', () => {
    it('should return set the list of known Trips', () => {
      const tripss = [createTrips('PRODUCT-AAA'), createTrips('PRODUCT-zzz')];
      const action = new TripsLoaded(tripss);
      const result: TripsState = tripsReducer(initialState, action);
      const selId: string = getTripsId(result.list[1]);

      expect(result.loaded).toBe(true);
      expect(result.list.length).toBe(2);
      expect(selId).toBe('PRODUCT-zzz');
    });
  });

  describe('unknown action', () => {
    it('should return the initial state', () => {
      const action = {} as any;
      const result = tripsReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
