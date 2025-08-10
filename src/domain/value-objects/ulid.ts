import { ulid } from 'ulid';

export class Ulid {
  private readonly value: string;

  constructor(value: string) {
    if (!Ulid.isValid(value)) {
      throw new Error(`Invalid ULID: ${value}`);
    }
    this.value = value;
  }

  static create() {
    return new Ulid(ulid());
  }

  public static isValid(value: string): boolean {
    const ULID_REGEX = /^[0-9A-HJKMNP-TV-Z]{26}$/i;
    return ULID_REGEX.test(value);
  }

  public getValue(): string {
    return this.value;
  }
}
