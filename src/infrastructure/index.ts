import ExpressServer from "./ExpressServer";
import ServerInterface from "./types";

export const startServer = (server: ServerInterface) => {
  return server.start();
};

export const startServices = () => {};

export default () => {
  startServices();
  return startServer(new ExpressServer());
};
