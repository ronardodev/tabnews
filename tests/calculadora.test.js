const calculadora = require("../models/calculadora.js");

test("somar 2 + 2 deve ser igual a 4", () => {
  const resultado = calculadora.somar(2, 2);
  expect(resultado).toBe(4);
});

test("somar 5 + 100 deve ser igual a 105", () => {
  const resultado = calculadora.somar(5, 100);
  expect(resultado).toBe(105);
});

// test("somar 0.1 + 0.2 deve ser igual a 0.3", () => {
//   const resultado = calculadora.somar(0.1, 0.2);
//   expect(resultado).toBe(0.3);
// });
