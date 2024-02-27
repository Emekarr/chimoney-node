declare namespace Express {
  interface Request {
    ctx: {
      respond: (
        ctx: any,
        message: string,
        statusCode: number,
        payload: any,
        errors?: any[]
      ) => void;
      errRespond: (errors: any) => void;
      setHTTPOnlyCookie: (ctx: any, name: string, cookie: string) => void;
      query?: Record<string, string>;
      ctxParams?: Record<string, string>;
      body?: T;
      ctx: any;
      headers?: Record<string, string>;
      err?: BaseError | any;
    };
  }
}
