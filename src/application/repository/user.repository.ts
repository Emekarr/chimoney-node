import { container, inject, injectable } from "tsyringe";
import FirebaseStore from "../../infrastructure/repository/datastore/firebase";
import { User } from "../../entities/domain/UserDomain";
import { Collections } from "../../entities/collections";

@injectable()
class UserRepository {
  constructor(public db: FirebaseStore<User>) {}
}

const instance = container.resolve(UserRepository);
instance.db.setUp(Collections.user);
export default instance;
