import dotenv from "dotenv";
dotenv.config();

const getPort = (): string => {
  return (process.env.PORT as string) ?? "3000";
};

const getJSONLimit = (): string => {
  return process.env.JSON_LIMIT as string;
};

const getAllowedHeaders = (): string[] => {
  return (process.env.ALLOWED_HEADERS as string).split(",");
};

const getOrigins = (): string[] => {
  return (process.env.ORIGINS as string).split(",");
};

const getNodeEnv = (): string => {
  return process.env.NODE_ENV as string;
};

const getMongoURL = (): string => {
  return process.env.MONGODB_URL as string;
};

const getDatabaseName = (): string => {
  return process.env.DB_NAME as string;
};

const getFirebaseProjectID = (): string => {
  return process.env.FIREBASE_PROJECT_ID as string;
};

const getFirebaseAPIKey = (): string => {
  return process.env.FIREBASE_API_KEY as string;
};

const getFirebasePrivateKey = (): string => {
  return process.env.FIREBASE_PRIVATE_KEY as string;
};

const getFirebaseAuthDomain = (): string => {
  return process.env.FIREBASE_AUTH_DOMAIN as string;
};

const getFirebaseStorageBucket = (): string => {
  return process.env.FIREBASE_STORAGE_BUCKET as string;
};

const getFirebaseMSGSenderID = (): string => {
  return process.env.FIREBASE_MSG_SENDER_ID as string;
};

const getFirebaseAppID = (): string => {
  return process.env.FIREBASE_APP_ID as string;
};

const getChimoneyBaseURL = (): string => {
  return process.env.CHIMONEY_BASE_URL as string;
};

const getChimoneyAPIKey = (): string => {
  return process.env.CHIMONEY_API_KEY as string;
};

const getJWTKey = (): string => {
  return process.env.JWT_KEY as string;
};

const getJWTISS = (): string => {
  return process.env.JWT_ISS as string;
};

const getJWTAud = (): string => {
  return process.env.JWT_AUD as string;
};

const getClientURL = (): string => {
  return process.env.CLIENT_URL as string;
};

export default {
  getAllowedHeaders,
  getJSONLimit,
  getJWTKey,
  getOrigins,
  getClientURL,
  getPort,
  getJWTAud,
  getJWTISS,
  getMongoURL,
  getDatabaseName,
  getFirebaseAuthDomain,
  getNodeEnv,
  getFirebaseProjectID,
  getFirebasePrivateKey,
  getFirebaseAPIKey,
  getFirebaseAppID,
  getFirebaseMSGSenderID,
  getFirebaseStorageBucket,
  getChimoneyBaseURL,
  getChimoneyAPIKey,
};
