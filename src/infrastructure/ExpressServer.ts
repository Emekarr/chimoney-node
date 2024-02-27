import ServerInterface from "./types";
import express from "express";
import morgan from "morgan";
import cookieparser from 'cookie-parser'
import RateLimiter from "./ratelimiter/RateLimiter";
import CORS from "./cors/cors";
import Responder from "./responder";
import config from "../config";
import ExpressRouter from "./routes/express";
import { container } from "tsyringe";
import LoggerClass from "../application/loggers/Logger";
import { LoggerLevel } from "../application/loggers/types";
import ErrorMiddleware from "./middleware/express/error";
import helmet from "helmet";
import HeadersMiddleware from "./middleware/express/headers";
import mongodb from "./repository/datastore/firebase";
const Logger = container.resolve(LoggerClass);

export default class ExpressServer implements ServerInterface {
  start(): any {
    const server = express();

    server.use(morgan("combined"));
    server.use(helmet());

    // rate limiter
    server.use(
      RateLimiter.init(10 * 60 * 1000, 30, {
        standardHeaders: true,
        legacyHeaders: false,
        handler: (req, res, next) => {
          Responder.respond(
            res,
            "slow down! you have been rate limited",
            429,
            null
          );
          return;
        },
      })
    );

    server.use(
      CORS.init(
        config.getOrigins(),
        "GET,HEAD,PUT,PATCH,POST,DELETE",
        false,
        {
          credentials: true,
        }
      )
    );

    server.use(express.json({ limit: config.getJSONLimit() }));

    server.use(
      express.urlencoded({ extended: true, limit: config.getJSONLimit() })
    );

    server.use(HeadersMiddleware);

    server.use(cookieparser())

    server.use("/api", new ExpressRouter().registerRoutes());

    server.use("/ping", (req, res, next) => {
      Responder.respond(res, "pong", 200, null);
    });

    server.use("*", (req, res, next) => {
      Responder.respond(
        res,
        `${req.method} ${req.baseUrl} does not exist`,
        404,
        null
      );
    });

    server.use(ErrorMiddleware);

    if (config.getNodeEnv() !== "test") {
      server.listen(config.getPort(), () => {
        Logger.bl.write(
          LoggerLevel.info,
          `server running on PORT ${config.getPort()}`
        );
      });
    }

    return server;
  }
}
