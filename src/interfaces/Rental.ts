export interface RentalInfo {
  rentalId: number;
  bikeNumber: string;
  startStationName: string;
  endStationName?: string;
  startTime: string;
  endTime?: string;
  status: string;
}

export interface ResponseRentalList {
  rentals: RentalInfo[];
}

export interface RentalResponseDto {
  rentalId: number;
  startStationId: number;
  startStationName: string;
  endStationId?: number;
  endStationName?: string;
  bikeNum: string;
  startTime: string;
  endTime?: string;
  createdDate: string;
}

