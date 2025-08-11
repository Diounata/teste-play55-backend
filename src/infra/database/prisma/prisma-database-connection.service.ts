import { DatabaseConnection } from '@/application/database/database-connection';
import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class PrismaDatabaseConnectionService implements DatabaseConnection {
  constructor(private prisma: PrismaService) {}

  async query(statement: string, params?: any[]): Promise<any[]> {
    return this.prisma.$queryRawUnsafe(statement, ...(params || []));
  }
}
