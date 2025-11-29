export type PassType = 'ONE_DAY' | 'SEVEN_DAY' | 'THIRTY_DAY' | 'ANNUAL';

export interface ResponsePass {
  passId: number;
  passType: PassType;
  price: number;
}

export interface ResponsePassList {
  passes: ResponsePass[];
}

export interface ResponseUserPass {
  userPassId: number;
  passId: number;
  passType: PassType;
  price: number;
  status: 'ACTIVATE' | 'EXPIRED' | 'CANCELED';
  activatedDate: string;
  expiredDate: string;
}

export interface ResponseUserPassList {
  userPasses: ResponseUserPass[];
}

