import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PortalModule } from '@angular/cdk/portal';
import { AgmCoreModule } from '@agm/core';

import { MapComponent } from './components/map.component';
import { MapModuleOptionsModel } from './map-module-options.model';
import { MAP_API_KEY } from './providers/map-api-key.token';


@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    PortalModule,
    AgmCoreModule,
  ],
  declarations: [
    MapComponent,
  ],
  exports: [
    MapComponent
  ],
})
export class MapModule {

  static forRoot(options: MapModuleOptionsModel): ModuleWithProviders[] {
    return [
      {
        ngModule: MapModule,
        providers: [
          { provide: MAP_API_KEY, useValue: options.apiKey },
        ],
      },
      AgmCoreModule.forRoot({ apiKey:  options.apiKey }),
    ];
  }

}
