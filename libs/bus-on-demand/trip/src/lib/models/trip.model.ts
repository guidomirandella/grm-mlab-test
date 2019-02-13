import { Stop } from './stop.model';
import { Destination } from './destination.model';
import { Origin } from './origin.model';
import { TripStatus } from './trip-status.model';


export interface TripModel {

  stops: Stop[];
  destination: Destination;
  endTime: Date;
  startTime: Date;
  description: string;
  driverName: string;
  route: string;
  status: TripStatus;
  origin: Origin;

}
