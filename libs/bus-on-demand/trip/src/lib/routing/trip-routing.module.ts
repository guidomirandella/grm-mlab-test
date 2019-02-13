import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TripAvailabilityPageComponent } from './pages/availability/trip-availability-page.component';


const routes: Routes = [
  { path: '', component: TripAvailabilityPageComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
})
export class TripRoutingModule {
  
}
