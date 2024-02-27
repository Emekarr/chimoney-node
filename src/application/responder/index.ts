import { autoInjectable } from "tsyringe";
import ResponderInterface from "./types";

@autoInjectable()
export default class Responder {
  constructor(public res: ResponderInterface) {}
}
