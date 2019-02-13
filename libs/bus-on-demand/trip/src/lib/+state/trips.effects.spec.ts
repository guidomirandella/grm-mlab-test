import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';

import { NxModule } from '@nrwl/nx';
import { DataPersistence } from '@nrwl/nx';
import { hot } from '@nrwl/nx/testing';

import { TripsEffects } from './trips.effects';
import { LoadTrips, TripsLoaded } from './trips.actions';

describe('TripsEffects', () => {
  let actions: Observable<any>;
  let effects: TripsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NxModule.forRoot(),
        StoreModule.forRoot({}),
        EffectsModule.forRoot([])
      ],
      providers: [
        TripsEffects,
        DataPersistence,
        provideMockActions(() => actions)
      ]
    });

    effects = TestBed.get(TripsEffects);
  });

  describe('loadTrips$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: new LoadTrips() });
      expect(effects.loadTrips$).toBeObservable(
        hot('-a-|', { a: new TripsLoaded([]) })
      );
    });
  });
});
