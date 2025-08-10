import { describe, expect, it } from 'vitest';
import { Url } from './url';

describe('[VO] Url', () => {
  it.each([
    'https://example.com',
    'http://localhost:3000',
    'https://example.domain.com/path?query=1',
  ])('should create a valid url: "%s"', (validUrl) => {
    const url = new Url(validUrl);
    expect(url.getValue()).toBe(validUrl);
  });

  it.each(['', 'not-a-url', '://invalid.url.com', 'http//invalidurl.com'])(
    'should throw error for invalid url: "%s"',
    (invalidUrl) => {
      expect(() => new Url(invalidUrl)).toThrowError('Invalid URL');
    },
  );
});
