export default interface ResponderInterface {
  respond(
    ctx: any,
    message: string,
    statusCode: number,
    payload: any,
    errors?: any[]
  ): void;
}
