import { runner } from "node-pg-migrate";
import { resolve } from "node:path";
import database from "infra/database";

export default async function migrations(request, response) {
  const allowedMethods = ["GET", "POST"];
  if (!allowedMethods.includes(request.method)) {
    return response.status(405).json({
      error: `Method "${request.method}" not allowed`,
    });
  }
  let dbClient;
  try {
    dbClient = await database.getNewClient();
    const options = {
      dbClient: dbClient,
      dryRun: true,
      dir: resolve("infra", "migrations"),
      direction: "up",
      verbose: true,
      migrationsTable: "pgmigrations",
    };

    console.log("teste staging");

    if (request.method === "GET") {
      const penddingMigrations = await runner(options);
      return response.status(200).json(penddingMigrations); // 200: ok
    }

    if (request.method === "POST") {
      const migratedMigrations = await runner({
        ...options, // operador spread (cópia) substituindo o valor de dryRun
        dryRun: false,
      });

      if (migratedMigrations.length > 0) {
        return response.status(201).json(migratedMigrations); // 201: created
      }
      return response.status(200).json(migratedMigrations); // 200: ok
    }
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await dbClient.end();
  }
}
