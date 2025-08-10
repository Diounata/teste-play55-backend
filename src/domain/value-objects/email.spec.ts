import { describe, expect, it } from 'vitest';
import { Email } from './email';

describe('[VO] Email', () => {
  it.each([
    'john.doe@example.com',
    'user+tag@domain.co',
    'first.last@sub.domain.org',
  ])('should create a valid email: "%s"', (validEmail) => {
    const email = new Email(validEmail);
    expect(email.getValue()).toBe(validEmail);
  });

  it.each([
    '',
    ' ',
    'John123',
    'invalid@',
    '@domain.com',
    'user@domain',
    'user@.com',
    'name@domain.c',
  ])('should throw error for invalid email: "%s"', (invalidEmail) => {
    expect(() => new Email(invalidEmail)).toThrowError('Invalid email');
  });
});
