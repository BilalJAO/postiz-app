import { PostgresStore } from '@mastra/pg';

function buildPostgresStoreConfig(): ConstructorParameters<typeof PostgresStore>[0] {
  if (process.env.DATABASE_URL) {
    return {
      connectionString: process.env.DATABASE_URL,
    };
  }

  if (
    process.env.PGHOST &&
    process.env.PGDATABASE &&
    process.env.PGUSER &&
    process.env.PGPASSWORD
  ) {
    return {
      host: process.env.PGHOST,
      port: process.env.PGPORT ? parseInt(process.env.PGPORT, 10) : 5432,
      database: process.env.PGDATABASE,
      user: process.env.PGUSER,
      password: process.env.PGPASSWORD,
    };
  }

  throw new Error(
    'PostgresStore: missing database configuration. ' +
      'Provide DATABASE_URL or individual PGHOST, PGPORT, PGDATABASE, PGUSER, PGPASSWORD environment variables.'
  );
}

export const pStore = new PostgresStore(buildPostgresStoreConfig());
