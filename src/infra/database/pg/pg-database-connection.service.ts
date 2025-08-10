import { DatabaseConnection } from '@/application/database/database-connection';
import { Injectable } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class PgDatabaseConnectionService implements DatabaseConnection {
  private pool: Pool;

  constructor() {
    this.pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });
  }

  async query(statement: string, params?: any[]): Promise<Array<any>> {
    const client = await this.pool.connect();
    try {
      return (await client.query(statement, params)).rows;
    } finally {
      client.release();
    }
  }
}
