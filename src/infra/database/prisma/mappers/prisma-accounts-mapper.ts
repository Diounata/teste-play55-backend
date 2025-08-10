import { Prisma, Account as PrismaAccount } from '@prisma/client';
import { Account } from 'src/domain/entities/account';

export class PrismaAccountsMapper {
  static toDomain(raw: PrismaAccount): Account {
    return new Account(
      raw.accountId,
      raw.name,
      raw.email,
      raw.passwordHash,
      raw.createdAt,
      raw.updatedAt,
    );
  }

  static toPrisma(account: Account): Prisma.AccountUncheckedCreateInput {
    return {
      accountId: account.getId(),
      name: account.getName(),
      email: account.getEmail(),
      passwordHash: account.getPassword().getValue(),
      createdAt: account.getCreatedAt(),
      updatedAt: account.getUpdatedAt(),
    };
  }
}
