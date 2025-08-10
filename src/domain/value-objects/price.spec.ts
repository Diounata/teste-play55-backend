import { describe, expect, it } from 'vitest';
import { Price } from './price';

describe('[VO] Price', () => {
  it.each([0, 1, 10.5, 100, 9999.99])(
    'should create a valid price: "%s"',
    (validPrice) => {
      const price = new Price(validPrice);
      expect(price.getValue()).toBe(validPrice);
    },
  );

  it.each([-1, -100])(
    'should throw error for invalid price: "%s"',
    (invalidPrice) => {
      expect(() => new Price(invalidPrice)).toThrowError('Invalid price');
    },
  );
});
