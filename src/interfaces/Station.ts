export interface ResponseStation {
  stationId: number;
  stationName: string;
  latitude: number;
  longitude: number;
  address: string;
  capacity: number;
  installationDate: string;
  closedDate?: {
    hour: number;
    minute: number;
    second: number;
    nano: number;
  };
}

export interface ResponseStationList {
  stationList: ResponseStation[];
}

export interface ResponseStationSpecific {
  responseStation: ResponseStation;
}

export interface RequestRegisterStation {
  stationName: string;
  latitude: number;
  longitude: number;
  address: string;
  capacity: number;
  installationDate: string;
  closedDate?: {
    hour: number;
    minute: number;
    second: number;
    nano: number;
  };
}

export interface UpdateStation {
  stationName?: string;
  latitude?: number;
  longitude?: number;
  address?: string;
  capacity?: number;
  installationDate?: string;
  closedDate?: {
    hour: number;
    minute: number;
    second: number;
    nano: number;
  };
}

