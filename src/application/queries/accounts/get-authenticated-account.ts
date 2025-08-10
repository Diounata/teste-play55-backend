import { DatabaseConnection } from '@/application/database/database-connection';
import { ResourceNotFoundError } from '@/application/usecases/_errors/resource-not-found';
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
export class DeprecatedGetAuthenticatedAccountQuery {
  constructor(private database: DatabaseConnection) {}

  async handle(input: Input): Promise<Output> {
    const queryData = await this.database.query(
      /* SQL */ `
      SELECT 
        id AS "accountId",
        name,
        email,
        created_at AS "createdAt",
        updated_at AS "updatedAt"
      FROM accounts
      WHERE id = $1
    `,
      [input.accountId],
    );

    if (!queryData) {
      return left(new ResourceNotFoundError());
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
