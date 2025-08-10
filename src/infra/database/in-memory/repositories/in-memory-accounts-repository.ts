import { AccountsRepository } from '@/application/repositories/accounts-repository';
import { Account } from '@/domain/entities/account';

export class InMemoryAccountsRepository implements AccountsRepository {
  accounts: Account[] = [];

  async registerAccount(account: Account) {
    this.accounts.push(account);
  }

  async findAccountById(accountId: string) {
    const account = this.accounts.find((acc) => acc.getId() === accountId);
    return account || null;
  }

  async findAccountByEmail(email: string) {
    const account = this.accounts.find((acc) => acc.getEmail() === email);
    return account || null;
  }

  async editAccount(account: Account) {
    const index = this.accounts.findIndex(
      (acc) => acc.getId() === account.getId(),
    );
    if (index !== -1) {
      this.accounts[index] = account;
      return;
    }
  }

  async removeAccount(account: Account) {
    const index = this.accounts.findIndex(
      (acc) => acc.getId() === account.getId(),
    );
    if (index !== -1) {
      this.accounts.splice(index, 1);
    }
  }
}
