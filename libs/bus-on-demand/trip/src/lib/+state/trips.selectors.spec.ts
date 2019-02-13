import { Entity, TripsState } from './trips.reducer';
import { tripsQuery } from './trips.selectors';

describe('Trips Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getTripsId = it => it['id'];

  let storeState;

  beforeEach(() => {
    const createTrips = (id: string, name = ''): Entity => ({
      id,
      name: name || `name-${id}`
    });
    storeState = {
      trips: {
        list: [
          createTrips('PRODUCT-AAA'),
          createTrips('PRODUCT-BBB'),
          createTrips('PRODUCT-CCC')
        ],
        selectedId: 'PRODUCT-BBB',
        error: ERROR_MSG,
        loaded: true
      }
    };
  });

  describe('Trips Selectors', () => {
    it('getAllTrips() should return the list of Trips', () => {
      const results = tripsQuery.getAllTrips(storeState);
      const selId = getTripsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelectedTrips() should return the selected Entity', () => {
      const result = tripsQuery.getSelectedTrips(storeState);
      const selId = getTripsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getLoaded() should return the current 'loaded' status", () => {
      const result = tripsQuery.getLoaded(storeState);

      expect(result).toBe(true);
    });

    it("getError() should return the current 'error' storeState", () => {
      const result = tripsQuery.getError(storeState);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
