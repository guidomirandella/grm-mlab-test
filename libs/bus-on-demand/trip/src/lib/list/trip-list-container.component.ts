import { Component } from '@angular/core';

import { TripsFacade } from '../+state/trips.facade';


@Component({
  selector: 'mlab-bus-on-demand-trip-list-container',
  templateUrl: 'trip-list-container.component.html',
})
export class TripListContainerComponent {

  constructor(private tripsFacade: TripsFacade) {
    this.tripsFacade.loadAll();
  }

}
