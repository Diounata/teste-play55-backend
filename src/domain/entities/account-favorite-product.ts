import { Ulid } from '@/domain/value-objects/ulid';
import { AuditTimestamps } from '../value-objects/audit-timestamps';

export class AccountFavoriteProduct {
  private accountFavoriteProductId: Ulid;
  private accountId: Ulid;
  private productId: number;
  private auditTimestamps: AuditTimestamps;

  constructor(
    accountFavoriteProductId: string,
    accountId: string,
    productId: number,
    createdAt: Date | null = null,
  ) {
    this.accountFavoriteProductId = new Ulid(accountFavoriteProductId);
    this.accountId = new Ulid(accountId);
    this.productId = productId;
    this.auditTimestamps = new AuditTimestamps(createdAt);
  }

  static create(
    accountId: string,
    productId: number,
    createdAt: Date | null = null,
  ): AccountFavoriteProduct {
    const accountFavoriteProductId = Ulid.create().getValue();
    return new AccountFavoriteProduct(
      accountFavoriteProductId,
      accountId,
      productId,
      createdAt,
    );
  }

  getId() {
    return this.accountFavoriteProductId.getValue();
  }

  getAccountId() {
    return this.accountId.getValue();
  }

  getProductId() {
    return this.productId;
  }

  getCreatedAt() {
    return this.auditTimestamps.getCreatedAt();
  }
}
