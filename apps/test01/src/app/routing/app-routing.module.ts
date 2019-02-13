import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BusOnDemandTripModule } from '@mlab/bus-on-demand/trip';


export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'bus-on-demand' },
  { path: 'bus-on-demand', loadChildren: busOnDemandTripModule },
];

export function busOnDemandTripModule() {
  return BusOnDemandTripModule;
}

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { initialNavigation: 'enabled' })
  ],
  exports: [
    RouterModule,
  ],
})
export class AppRoutingModule {

}
