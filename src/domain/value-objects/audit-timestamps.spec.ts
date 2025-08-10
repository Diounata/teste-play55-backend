import { describe, expect, it } from 'vitest';
import { AuditTimestamps } from './audit-timestamps';

describe('[VO] AuditTimestamps', () => {
  it('should create with provided dates', () => {
    const timestamp = new AuditTimestamps(
      new Date('2024-01-01T00:00:00.000Z'),
      new Date('2024-01-02T00:00:00.000Z'),
    );

    expect(timestamp.getCreatedAt().toISOString()).toBe(
      '2024-01-01T00:00:00.000Z',
    );
    expect(timestamp.getUpdatedAt()!.toISOString()).toBe(
      '2024-01-02T00:00:00.000Z',
    );
  });

  it('should default to current date when not provided', () => {
    const now = new Date();
    const timestamp = new AuditTimestamps();

    expect(timestamp.getCreatedAt().getTime()).toBeCloseTo(now.getTime(), -2);
    expect(timestamp.getUpdatedAt()).toBeNull();
  });

  it('should allow createdAt only', () => {
    const createdAt = new Date('2024-01-01T00:00:00.000Z');
    const timestamp = new AuditTimestamps(createdAt);

    expect(timestamp.getCreatedAt().toISOString()).toBe(
      '2024-01-01T00:00:00.000Z',
    );
    expect(timestamp.getUpdatedAt()).toBeNull();
  });

  it('should throw error if createdAt is greater than updatedAt', () => {
    expect(
      () =>
        new AuditTimestamps(
          new Date('2024-01-02T00:00:00.000Z'),
          new Date('2024-01-01T00:00:00.000Z'),
        ),
    ).toThrowError('createdAt should be less than updatedAt');
  });

  it('should throw error if updatedAt is provided without createdAt', () => {
    expect(
      () => new AuditTimestamps(null, new Date('2024-01-01T00:00:00.000Z')),
    ).toThrowError('createdAt is required when updatedAt is provided');
  });
});
