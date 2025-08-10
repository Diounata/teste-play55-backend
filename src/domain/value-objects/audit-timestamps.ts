export class AuditTimestamps {
  private createdAt: Date;
  private updatedAt: Date | null;

  constructor(createdAt?: Date | null, updatedAt?: Date | null) {
    if (!createdAt && updatedAt) {
      throw new Error('createdAt is required when updatedAt is provided');
    }
    if (createdAt && updatedAt && createdAt > updatedAt) {
      throw new Error('createdAt should be less than updatedAt');
    }

    this.createdAt = createdAt ?? new Date();
    this.updatedAt = updatedAt ?? null;
  }

  getCreatedAt() {
    return this.createdAt;
  }

  getUpdatedAt() {
    return this.updatedAt;
  }
}
