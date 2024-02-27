import { initializeApp, FirebaseApp } from "firebase/app";
import {
  getFirestore,
  Firestore,
  CollectionReference,
  collection,
  getDocsFromServer,
  orderBy,
  updateDoc,
  query,
  limit,
  startAfter,
  where,
  addDoc,
  doc,
  getDocFromServer,
} from "firebase/firestore";
import config from "../../../config";
import { Collections } from "../../../entities/collections";
import { Options } from "../types";
import LoggerClass from "../../../application/loggers/Logger";
import { container } from "tsyringe";
import { LoggerLevel } from "../../../application/loggers/types";
const Logger = container.resolve(LoggerClass);

export default class FirebaseStore<T> {
  private app!: FirebaseApp;
  private db!: Firestore;
  private collName!: Collections;
  private collection!: CollectionReference;

  private config = {
    appId: config.getFirebaseAppID(),
    messagingSenderId: config.getFirebaseMSGSenderID(),
    storageBucket: config.getFirebaseStorageBucket(),
    projectId: config.getFirebaseProjectID(),
    authDomain: config.getFirebaseAuthDomain(),
    apiKey: config.getFirebaseAPIKey(),
  };

  setUp(collectionName: Collections) {
    this.app = initializeApp(this.config);
    this.db = getFirestore();
    this.collName = collectionName;
    this.collection = collection(this.db, this.collName);
  }

  async findOne(opts: Partial<Options>): Promise<T> {
    const queryFilter = [];
    if (opts.orderBy)
      queryFilter.push(orderBy(opts.orderBy.field, opts.orderBy.direction));
    if (opts.limit) queryFilter.push(limit(opts.limit));
    if (opts.startAfter) queryFilter.push(startAfter(opts.startAfter));
    if (opts.filter) {
      opts.filter.forEach((opt) => {
        queryFilter.push(where(opt.field, opt.operation, opt.value));
      });
    }
    const q = query(this.collection, ...queryFilter);
    const docs = (await getDocsFromServer(q)).docs;
    const parsedDocs = docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
    return parsedDocs[0] as T;
  }

  async updateOne(id: string, payload: Partial<T>): Promise<boolean> {
    const docRef = doc(this.db, this.collName, id);
    updateDoc(docRef, payload as any);
    return true;
  }

  async findbyID(id: string): Promise<T> {
    const docRef = doc(this.db, this.collName, id);
    const result = await getDocFromServer(docRef);
    return { ...result.data(), id: result.id } as T;
  }

  async saveOne(payload: Partial<T>): Promise<string> {
    const result = await addDoc(this.collection, payload as any);
    return result.id;
  }
}
