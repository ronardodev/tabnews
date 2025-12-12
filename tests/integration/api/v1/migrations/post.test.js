import database from "infra/database";

beforeAll(cleanDatabase);

async function cleanDatabase() {
  await database.query("drop schema public cascade; create schema public;");
}

test("POST api/v1/migrations deve retornar 200", async () => {
  const response1 = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });
  expect(response1.status).toBe(201);
  const body1 = await response1.json();
  expect(Array.isArray(body1)).toBe(true);
  expect(body1.length).toBeGreaterThan(0);

  const response2 = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });
  expect(response2.status).toBe(200);
  const body2 = await response2.json();
  expect(Array.isArray(body2)).toBe(true);
  expect(body2.length).toBe(0);
});
