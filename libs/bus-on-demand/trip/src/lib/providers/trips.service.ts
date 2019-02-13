import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { TripModel } from '../models/trip.model';


@Injectable({ providedIn: 'root' })
export class TripsService {

  constructor(private http: HttpClient) {}

  public loadAll(): Observable<TripModel[]> {
    return this.http.get<TripModel[]>('/api/trips');
  }

}
