import { AuditTimestamps } from '@/domain/value-objects/audit-timestamps';
import { Email } from '@/domain/value-objects/email';
import { Name } from '@/domain/value-objects/name';
import { Password } from '@/domain/value-objects/password';
import { Ulid } from '@/domain/value-objects/ulid';

export class Account {
  private accountId: Ulid;
  private name: Name;
  private email: Email;
  private password: Password;
  private auditTimestamps: AuditTimestamps;

  constructor(
    accountId: string,
    name: string,
    email: string,
    passwordHash: string,
    createdAt: Date | null = null,
    updatedAt: Date | null = null,
  ) {
    this.accountId = new Ulid(accountId);
    this.name = new Name(name);
    this.email = new Email(email);
    this.password = Password.fromHash(passwordHash);
    this.auditTimestamps = new AuditTimestamps(createdAt, updatedAt);
  }

  static create(
    name: string,
    email: string,
    rawPassword: string,
    createdAt: Date | null = null,
    updatedAt: Date | null = null,
  ): Account {
    const accountId = Ulid.create().getValue();
    const hashedPassword = Password.create(rawPassword).getValue();
    return new Account(
      accountId,
      name,
      email,
      hashedPassword,
      createdAt,
      updatedAt,
    );
  }

  getId() {
    return this.accountId.getValue();
  }

  getName() {
    return this.name.getValue();
  }

  getEmail() {
    return this.email.getValue();
  }

  getPassword() {
    return this.password.getValue();
  }

  getCreatedAt() {
    return this.auditTimestamps.getCreatedAt();
  }

  getUpdatedAt() {
    return this.auditTimestamps.getUpdatedAt();
  }
}
