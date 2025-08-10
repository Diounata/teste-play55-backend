import { describe, expect, it } from 'vitest';
import { Ulid } from './ulid';

describe('[VO] Ulid', () => {
  it('should create a valid ulid', () => {
    const validUlid = '01HZYFQK6X8ZQK2R7QJ6Y4B6V7';
    const ulid = new Ulid(validUlid);
    expect(ulid.getValue()).toBe(validUlid);
  });

  it.each(['', 'not-a-ulid', '01HZYFQK6X8ZQK2R7QJ6Y4B6V'])(
    'should throw error for invalid ulid: "%s"',
    (invalidUlid) => {
      expect(() => new Ulid(invalidUlid)).toThrowError('Invalid ULID');
    },
  );

  it('should create a new ulid using the static create method', () => {
    const ulid = Ulid.create();
    expect(Ulid.isValid(ulid.getValue())).toBe(true);
  });
});
