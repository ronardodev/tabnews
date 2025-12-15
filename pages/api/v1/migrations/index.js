import { runner } from "node-pg-migrate";
import { resolve } from "node:path";
import database from "infra/database";

export default async function migrations(request, response) {
  const dbClient = await database.getNewClient();
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
    await dbClient.end();
    return response.status(200).json(penddingMigrations); // 200: ok
  }

  if (request.method === "POST") {
    const migratedMigrations = await runner({
      ...options, // operador spread (cópia) substituindo o valor de dryRun
      dryRun: false,
    });
    await dbClient.end();

    if (migratedMigrations.length > 0) {
      return response.status(201).json(migratedMigrations); // 201: created
    }
    return response.status(200).json(migratedMigrations); // 200: ok
  }

  return response.status(405); // 405: method not allowed
}
