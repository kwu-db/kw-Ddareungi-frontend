export interface ResponseStation {
  stationId: number;
  stationName: string;
  latitude: number;
  longitude: number;
  address: string;
  capacity: number;
  availableBikes: number; // SWAGGER에 명시된 필드 추가
  installationDate: string;
  closedDate?: {
    hour: number;
    minute: number;
    second: number;
    nano: number;
  };
}

// 페이지네이션 응답 구조 (SWAGGER 기준)
export interface PageResponseStation {
  content: ResponseStation[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  pageable: {
    pageNumber: number;
    offset: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
  };
}

// 하위 호환성을 위한 레거시 인터페이스 (사용 중단 예정)
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

