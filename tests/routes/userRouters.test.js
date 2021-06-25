const request = require("supertest");
const app = require("../../src/loaders/express");
const db = require("../../src/models");

describe("Test the users", () => {
  afterAll(async () => {
    await db.sequelize.close();
  });
  test("It should response the POST method with statusCode 201 and USER role", async () => {
    const { statusCode, body } = await request(app).post("/v1/users").send({
      name: "gabriel",
      email: "gabrields@dcomp.ufs.br",
      password: "123456",
    });
    expect(statusCode).toBe(201);
    expect(body.role).toBe("USER");
  });
});
