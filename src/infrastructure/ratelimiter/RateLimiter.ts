import rateLimiter, { Options } from "express-rate-limit";

import RateLimiterInterface from "./types";

class RateLimiter implements RateLimiterInterface {
  init(timeFrame: number, maxRequests: number, opts: Partial<Options>) {
    return rateLimiter({
      windowMs: timeFrame,
      max: maxRequests,
      ...opts,
    });
  }
}

export default Object.freeze(new RateLimiter());
