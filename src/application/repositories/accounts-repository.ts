import { Account } from '@/domain/entities/account';

export abstract class AccountsRepository {
  abstract registerAccount(account: Account): Promise<void>;
  abstract findAccountById(accountId: string): Promise<Account | null>;
  abstract findAccountByEmail(email: string): Promise<Account | null>;
  abstract editAccount(account: Account): Promise<void>;
  abstract removeAccount(account: Account): Promise<void>;
}
