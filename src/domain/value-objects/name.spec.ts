import { describe, expect, it } from 'vitest';
import { Name } from './name';

describe('[VO] Name', () => {
  it.each(['John Doe', '  Jane Doe  ', 'Al'])(
    'should create a valid name: "%s"',
    (validName) => {
      const name = new Name(validName);
      expect(name.getValue()).toBe(validName.trim());
    },
  );

  it.each(['', ' ', 'A'])(
    'should throw error for invalid name: "%s"',
    (invalidName) => {
      expect(() => new Name(invalidName)).toThrowError('Invalid name');
    },
  );
});
