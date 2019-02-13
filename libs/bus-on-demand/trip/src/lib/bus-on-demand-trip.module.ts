import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { MapModule } from '@mlab/ui';

import { TripRoutingModule } from './routing/trip-routing.module';
import { TripAvailabilityPageComponent } from './routing/pages/availability/trip-availability-page.component';
import { TripListComponent } from './list/trip-list.component';
import { TripListContainerComponent } from './list/trip-list-container.component';
import { TripMapComponent } from './map/trip-map.component';
import {
  TRIPS_FEATURE_KEY,
  initialState as tripsInitialState,
  tripsReducer,
} from './+state/trips.reducer';
import { TripsEffects } from './+state/trips.effects';
import { TripsFacade } from './+state/trips.facade';



@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatListModule,
    MapModule,
    TripRoutingModule,
    StoreModule.forFeature(TRIPS_FEATURE_KEY, tripsReducer, {
      initialState: tripsInitialState
    }),
    EffectsModule.forFeature([TripsEffects])
  ],
  declarations: [
    TripAvailabilityPageComponent,
    TripListComponent,
    TripListContainerComponent,
    TripMapComponent,
  ],
  exports: [
    TripAvailabilityPageComponent,
    TripListComponent,
    TripListContainerComponent,
    TripMapComponent,
  ],
  providers: [TripsFacade]
})
export class BusOnDemandTripModule {}
