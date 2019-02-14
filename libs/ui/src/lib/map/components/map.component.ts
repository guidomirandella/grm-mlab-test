import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AgmMap, MouseEvent } from '@agm/core';
import { Observable } from 'rxjs';

import { PolylinePointModel } from '../models/polyline-point.model';


@Component({
  selector: 'mlab-ui-map',
  templateUrl: 'map.component.html',
})
export class MapComponent implements OnInit {

  @ViewChild(AgmMap) map: AgmMap;

  _polylinePoints$: Observable<PolylinePointModel[]>;

  @Input()
  set latitude(latitude: number) {
    this.map.latitude = latitude;
  }

  get latitude(): number {
    return this.map.latitude;
  }

  @Input()
  set longitude(longitude: number) {
    this.map.longitude = longitude;
  }

  get longitude(): number {
    return this.map.longitude;
  }

  @Input()
  set polylinePoints(polylinePoints$: Observable<PolylinePointModel[]>) {
    this._polylinePoints$ = polylinePoints$;
  }

  @Output()
  get mapClick(): Observable<MouseEvent> {
    return this.map.mapClick.asObservable();
  }

  ngOnInit() {

  }

}
