import { AccountsRepository } from '@/application/repositories/accounts-repository';
import { Account } from '@/domain/entities/account';

export class InMemoryAccountsRepository implements AccountsRepository {
  accounts: Account[] = [];

  async registerAccount(account: Account) {
    this.accounts.push(account);
    return Promise.resolve(account);
  }

  async findAccountById(accountId: string) {
    const account = this.accounts.find((acc) => acc.getId() === accountId);
    return Promise.resolve(account || null);
  }

  async findAccountByEmail(email: string) {
    const account = this.accounts.find((acc) => acc.getEmail() === email);
    return Promise.resolve(account || null);
  }

  editAccount(account: Account): Promise<Account | null> {
    const index = this.accounts.findIndex(
      (acc) => acc.getId() === account.getId(),
    );
    if (index !== -1) {
      this.accounts[index] = account;
      return Promise.resolve(account);
    }
    return Promise.resolve(null);
  }

  removeAccount(account: Account): Promise<Account | null> {
    const index = this.accounts.findIndex(
      (acc) => acc.getId() === account.getId(),
    );
    if (index !== -1) {
      this.accounts.splice(index, 1);
      return Promise.resolve(account);
    }
    return Promise.resolve(null);
  }
}
