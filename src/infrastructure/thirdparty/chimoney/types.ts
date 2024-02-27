export interface BaseResponse<T> {
  status: string;
  data: T;
  error?: string;
}

export interface WalletCreated {
  id: string;
}
