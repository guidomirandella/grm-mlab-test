import { Point } from './point.model';


export interface PassengerStopModel {

  stopId: number;
  stopTime: Date;
  paid: boolean;
  address: string;
  tripId: number;
  userName: string;
  point: Point;
  price: number;

}
