import database from "infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();
  const dbVersion = await database.query("show server_version;");
  const dbMaxConns = await database.query("show max_connections;");

  const dbName = process.env.POSTGRES_DB;
  const dbActiveConns = await database.query({
    text: "select count(*) as active_conns from pg_stat_activity where datname = $1 and state = $2;",
    values: [dbName, "active"],
  });

  response.status(200).json({
    updated_at: updatedAt,
    database: {
      host: process.env.POSTGRES_HOST.substring(0, 7) + "...",
      version: dbVersion.rows[0].server_version,
      max_conns: parseInt(dbMaxConns.rows[0].max_connections),
      active_conns: parseInt(dbActiveConns.rows[0].active_conns),
    },
  });
}

export default status;
