import bcrypt from "bcryptjs";

export class BcryptHasher {

  private salt = 10

  async hash(data: string) {
    const hash = await bcrypt.hash(data, this.salt);
    return hash;
  }

  async verify(data: string, hash: string) {
    const success = await bcrypt.compare(data, hash);
    return success;
  }
}
