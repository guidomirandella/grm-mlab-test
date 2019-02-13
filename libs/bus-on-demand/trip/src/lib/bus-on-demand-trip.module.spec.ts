import { async, TestBed } from '@angular/core/testing';
import { BusOnDemandTripModule } from './bus-on-demand-trip.module';

describe('BusOnDemandTripModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BusOnDemandTripModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(BusOnDemandTripModule).toBeDefined();
  });
});
