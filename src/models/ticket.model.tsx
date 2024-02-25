export interface Ticket {
  id: number;
  ticketNumber: number;
  day: string;
  start: string;
  end: string;
  trainClass: string;
  interCityNumber: number;
  stations: string[];
  price: string;
}
