import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AgmMap } from '@agm/core';


@Component({
  selector: 'mlab-ui-map',
  templateUrl: 'map.component.html',
})
export class MapComponent implements OnInit {

  @ViewChild(AgmMap) map: AgmMap;

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

  ngOnInit() {

  }

}
