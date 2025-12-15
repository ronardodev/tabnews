test("GET api/v1/status deve retornar 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const body = await response.json();

  expect(body.updated_at).toBeDefined();
  const parsedDate = new Date(body.updated_at).toISOString();
  expect(body.updated_at).toEqual(parsedDate);

  const db = body.database;
  expect(db.host).toEqual("localho...");
  expect(db.version).toEqual("17.6");
  expect(db.max_conns).toEqual(100);
  expect(db.active_conns).toEqual(1);
});
