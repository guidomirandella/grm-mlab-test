/// <reference path="../../../../../../node_modules/@types/googlemaps/index.d.ts" />
import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AgmMap, MouseEvent, LatLngLiteral } from '@agm/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as polylineUtils from 'polyline-encoded';

import { PolylinePointModel } from '../models/polyline-point.model';
import { MarkerInfoModel } from '../models/marker-info.model';


@Component({
  selector: 'mlab-ui-map',
  templateUrl: 'map.component.html',
})
export class MapComponent implements OnInit {

  @ViewChild(AgmMap) map: AgmMap;

  _fitBounds = false;
  _polylinePoints$: Observable<PolylinePointModel[]>;
  _decodedPolyline$: Observable<LatLngLiteral[]>;
  _markers$: Observable<MarkerInfoModel[]>;

  get fitBounds(): boolean {
    return this._fitBounds;
  }

  set fitBounds(fitBounds: boolean) {
    this._fitBounds = fitBounds;
  }

  @Input()
  set zoom(zoom: number) {
    this.map.zoom = zoom;
  }

  get zoom(): number {
    return this.map.zoom;
  }

  @Input()
  set latitude(latitude: number) {
    this.map.latitude = latitude;
    this.map.fitBounds = true;
  }

  get latitude(): number {
    return this.map.latitude;
  }

  @Input()
  set longitude(longitude: number) {
    this.map.longitude = longitude;
    this.map.fitBounds = true;
  }

  get longitude(): number {
    return this.map.longitude;
  }

  @Input()
  set polylinePoints(polylinePoints$: Observable<PolylinePointModel[]>) {
    this._polylinePoints$ = polylinePoints$;
  }

  @Input()
  set markers(markers$: Observable<MarkerInfoModel[]>) {
    this._markers$ = markers$;
  }

  @Input()
  set encodedPolyline(encodedPolyline$: Observable<string>) {
    this._decodedPolyline$ = encodedPolyline$.pipe(
      map(encoded => polylineUtils.decode(encoded)),
      map((decoded: number[][]) => {
        const polyline: LatLngLiteral[] = [];

        decoded.forEach(latlng => polyline.push({ lat: latlng[0], lng: latlng[1] }));

        this.fitBounds = true;

        return polyline;
      }),
    );
  }

  @Output()
  get mapClick(): Observable<MouseEvent> {
    return this.map.mapClick.asObservable();
  }

  constructor() {}


  ngOnInit() {

  }

}


