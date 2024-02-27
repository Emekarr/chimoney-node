import jwt from "jsonwebtoken";
import JWTPayload from "../../../entities/interfaces/JWTPayload";
import config from "../../../config";

export class JWTGenerator {
  generate(payload: JWTPayload) {
    const token = jwt.sign(payload, config.getJWTKey(), {
      expiresIn: 600, //expires in 10 mins
      audience: config.getJWTAud(),
      issuer: config.getJWTISS(),
    });
    return token;
  }

  verify(token: string): JWTPayload {
    const verified = jwt.verify(token, config.getJWTKey(), {
      audience: config.getJWTAud(),
      issuer: config.getJWTISS(),
    });
    return verified as JWTPayload;
  }
}
