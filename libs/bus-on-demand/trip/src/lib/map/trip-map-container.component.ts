import { Component } from '@angular/core';

import { TripsFacade } from '../+state/trips.facade';


@Component({
  selector: 'mlab-bus-on-demand-trip-map-container',
  templateUrl: 'trip-map-container.component.html',
})
export class TripMapContainerComponent {

  constructor(private tripsFacade: TripsFacade) {}

}
