import { describe, expect, it } from 'vitest';
import { Password } from './password';

describe('[VO] Password', () => {
  it.each(['Abcdef1', 'A1b2c3', 'Teste123', 'Senha9', 'Qwerty1', 'ZxCvB2'])(
    'should accept valid password: "%s"',
    (rawPassword) => {
      const password = Password.create(rawPassword);
      expect(password.getValue()).not.toBe(rawPassword);
      expect(password.verifyRawPassword(rawPassword)).toBe(true);
    },
  );

  it.each(['short', 'abc', '', '12345'])(
    'should throw error for invalid password: "%s"',
    (password) => {
      expect(() => Password.create(password)).toThrowError(
        'Password must be at least 6 characters long',
      );
    },
  );

  it('should not verify with wrong password', () => {
    const password = Password.create('Abcdef1');
    expect(password.verifyRawPassword('wrongpass')).toBe(false);
  });
});
