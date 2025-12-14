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

// 랭킹 관련 인터페이스
export interface RankingResponseDto {
  rank: number;
  userId: number;
  userName: string;
  value: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface RankingListResponseDto {
  rankings: RankingResponseDto[];
}
