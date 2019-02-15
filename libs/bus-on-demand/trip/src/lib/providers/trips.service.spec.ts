import { HttpClient } from '@angular/common/http';
import { from as observableFrom } from 'rxjs';
import { mock, instance, when, verify } from 'ts-mockito';

import { TripsService } from './trips.service';
import { TripModel } from '../models/trip.model';

describe('TripsService', () => {

  let service: TripsService;
  let http: HttpClient;
  let httpMock: HttpClient;

  beforeEach(() => {
    httpMock = mock(HttpClient);
    http = instance(httpMock);
    service = new TripsService(http);
  });

  it('should return 2 Trips from the backend', () => {
    const trips: Partial<TripModel>[] = [{}, {}, {}];

    when(httpMock.get('/api/trips')).thenReturn(observableFrom(trips));

    service.loadAll().subscribe(loadedTrips => {
      expect(loadedTrips).toBeTruthy();
      expect(loadedTrips.length).toBe(3);

      verify(httpMock.get('/api/trips')).once();
    });

  });

});
