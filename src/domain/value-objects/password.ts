import { compareSync, hashSync } from 'bcryptjs';

export class Password {
  private readonly value: string;

  private constructor(hashedValue: string) {
    this.value = hashedValue;
  }

  public static create(rawPassword: string): Password {
    if (rawPassword.length < 6) {
      throw new Error('Password must be at least 6 characters long');
    }
    const salt = 7;
    const hashedPassword = hashSync(rawPassword, salt);
    return new Password(hashedPassword);
  }

  public static fromHash(hash: string): Password {
    return new Password(hash);
  }

  public getValue(): string {
    return this.value;
  }

  public verifyRawPassword(rawPassword: string): boolean {
    return compareSync(rawPassword, this.value);
  }
}
