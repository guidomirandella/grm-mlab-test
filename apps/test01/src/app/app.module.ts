import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NxModule } from '@nrwl/nx';

import { MapModule } from '@mlab/ui';

import { AppComponent } from './app.component';
import { AppHeaderComponent } from './header/app-header.component';
import { AppRoutingModule } from './routing/app-routing.module';
import {
  initialState as appInitialState,
  appReducer
} from './+state/app.reducer';
import { AppEffects } from './+state/app.effects';
import { AppFacade } from './+state/app.facade';

import { environment } from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    HttpClientModule,
    NxModule.forRoot(),
    AppRoutingModule,
    StoreModule.forRoot(
      { app: appReducer },
      {
        initialState: { app: appInitialState },
      }
    ),
    EffectsModule.forRoot([AppEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    MapModule.forRoot({ apiKey: environment.googleMapsKey }),
  ],
  providers: [AppFacade],
  bootstrap: [AppComponent]
})
export class AppModule {}
