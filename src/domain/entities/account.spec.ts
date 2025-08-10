import { Account } from '@/domain/entities/account';

describe('[Entity] Account', () => {
  it('should create a valid account', () => {
    const account = Account.create('John Doe', 'johndoe@gmail.com', '123456');
    expect(account.getId()).toEqual(expect.any(String));
    expect(account.getName()).toEqual(expect.any(String));
    expect(account.getEmail()).toEqual(expect.any(String));
    expect(account.getPassword()).toEqual(expect.any(String));
    expect(account.getCreatedAt()).toBeInstanceOf(Date);
    expect(account.getUpdatedAt()).toEqual(null);
  });
});
