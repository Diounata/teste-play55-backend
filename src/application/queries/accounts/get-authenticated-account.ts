import { DatabaseConnection } from '@/application/database/database-connection';
import { AccountNotFoundError } from '@/application/usecases/accounts/_errors/account-not-found-error';
import { Either, left, right } from '@/core/either';
import { QueryError } from '@/core/errors/query-error';
import { Injectable } from '@nestjs/common';

interface Input {
  accountId: string;
}

type Output = Either<
  QueryError,
  {
    account: {
      accountId: string;
      name: string;
      email: string;
      createdAt: Date;
      updatedAt: Date | null;
    };
  }
>;

@Injectable()
export class GetAuthenticatedAccountQuery {
  constructor(private database: DatabaseConnection) {}

  async handle(input: Input): Promise<Output> {
    const queryData = await this.database.query(
      /* SQL */ `
      SELECT 
        account_id AS "accountId",
        name,
        email,
        created_at AS "createdAt",
        updated_at AS "updatedAt"
      FROM accounts
      WHERE account_id = ?;
    `,
      [input.accountId],
    );

    if (!queryData[0]) {
      return left(new AccountNotFoundError());
    }

    const account = queryData[0];

    return right({
      account: {
        accountId: account.accountId,
        name: account.name,
        email: account.email,
        createdAt: account.createdAt,
        updatedAt: account.updatedAt,
      },
    });
  }
}
