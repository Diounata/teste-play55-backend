import { Account } from '@/domain/entities/account';

export abstract class AccountsRepository {
  abstract registerAccount(account: Account): Promise<Account>;
  abstract findAccountById(accountId: string): Promise<Account>;
  abstract findAccountByEmail(email: string): Promise<Account>;
  abstract editAccount(account: Account): Promise<Account>;
  abstract removeAccount(account: Account): Promise<Account>;
}
