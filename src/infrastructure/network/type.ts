export interface NetworkServiceType {
  post(url: string, payload: any, params: Record<string, string>): Promise<any>;
  get(url: string, params: Record<string, string>): Promise<any>;
  logCall(payload: any): any;
}
