import "reflect-metadata";
import infrastructure from "./infrastructure";


class App {
  constructor() {
    infrastructure();
  }
}

new App();
