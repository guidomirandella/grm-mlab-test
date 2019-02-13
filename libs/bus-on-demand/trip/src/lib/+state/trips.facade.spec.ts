import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/nx/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/nx';

import { TripsEffects } from './trips.effects';
import { TripsFacade } from './trips.facade';

import { tripsQuery } from './trips.selectors';
import { LoadTrips, TripsLoaded } from './trips.actions';
import {
  TripsState,
  Entity,
  initialState,
  tripsReducer
} from './trips.reducer';

interface TestSchema {
  trips: TripsState;
}

describe('TripsFacade', () => {
  let facade: TripsFacade;
  let store: Store<TestSchema>;
  let createTrips;

  beforeEach(() => {
    createTrips = (id: string, name = ''): Entity => ({
      id,
      name: name || `name-${id}`
    });
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature('trips', tripsReducer, { initialState }),
          EffectsModule.forFeature([TripsEffects])
        ],
        providers: [TripsFacade]
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule
        ]
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.get(Store);
      facade = TestBed.get(TripsFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async done => {
      try {
        let list = await readFirst(facade.allTrips$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.loadAll();

        list = await readFirst(facade.allTrips$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `TripsLoaded` to manually submit list for state management
     */
    it('allTrips$ should return the loaded list; and loaded flag == true', async done => {
      try {
        let list = await readFirst(facade.allTrips$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        store.dispatch(
          new TripsLoaded([createTrips('AAA'), createTrips('BBB')])
        );

        list = await readFirst(facade.allTrips$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(2);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });
  });
});
