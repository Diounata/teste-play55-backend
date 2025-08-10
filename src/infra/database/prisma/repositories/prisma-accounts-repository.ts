import { AccountsRepository } from '@/application/repositories/accounts-repository';
import { Account } from '@/domain/entities/account';
import { Injectable } from '@nestjs/common';
import { PrismaAccountsMapper } from '../mappers/prisma-accounts-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaAccountsRepository implements AccountsRepository {
  constructor(private prisma: PrismaService) {}

  async registerAccount(account: Account): Promise<void> {
    await this.prisma.account.create({
      data: PrismaAccountsMapper.toPrisma(account),
    });
  }

  async findAccountById(accountId: string): Promise<Account | null> {
    const account = await this.prisma.account.findUnique({
      where: { accountId: accountId },
    });
    return account ? PrismaAccountsMapper.toDomain(account) : null;
  }

  async findAccountByEmail(email: string): Promise<Account | null> {
    const account = await this.prisma.account.findUnique({
      where: { email: email },
    });
    return account ? PrismaAccountsMapper.toDomain(account) : null;
  }

  async editAccount(account: Account): Promise<void> {
    await this.prisma.account.update({
      where: { accountId: account.getId() },
      data: PrismaAccountsMapper.toPrisma(account),
    });
  }

  async removeAccount(account: Account): Promise<void> {
    await this.prisma.account.delete({
      where: { accountId: account.getId() },
    });
  }
}
