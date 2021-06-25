const request = require("supertest");
const jwt = require("jsonwebtoken");
const { secret } = require("../../src/config/jwt");
const app = require("../../src/loaders/express");
const db = require("../../src/models");
const MovieRepository = require("../../src/services/movieService");
const MovieService = require("../../src/repositories/movieRepository");
const UserRepository = require("../../src/repositories/userRepository");
const UserService = require("../../src/services/userService");

let movieRepository;
let movieService;
let userRepository;
let userService;
let userId;
let movieId;
let token;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

describe("Test the users", () => {
  beforeAll(async () => {
    movieRepository = new MovieRepository();
    movieService = new MovieService(movieRepository);
    userRepository = new UserRepository();
    userService = new UserService(userRepository);
    const user = await userService.createAdmin({
      name: "test-user",
      email: "test@email.com",
      password: "12345678",
    });
    const { id, name, role } = user;
    token = jwt.sign(
      {
        id,
        name,
        role,
      },
      secret,
      {
        expiresIn: 3600,
      }
    );
    const movie = await movieService.create({
      title: "didi 2",
      director: "keanu reeves",
      price: 10.0,
      totalCopies: 50,
      currentCopies: 50,
    });
    userId = id;
    movieId = movie.id;
  });
  afterAll(async () => {
    await db.sequelize.close();
  });
  test("It should response the POST method with statusCode 201 and devolution date to be created plus 60 s", async () => {
    const { statusCode, body } = await request(app)
      .post("/v1/rents")
      .send({
        userId,
        movieId,
      })
      .auth(token, { type: "bearer" });
    expect(statusCode).toBe(201);
    expect(
      (new Date(body.devolutionDate).getTime() -
        new Date(body.createdAt).getTime()) /
        1000
    ).toBe(60);
  });

  test("It should response the PUT method with statusCode 200 and deliveredDate and devolutionPrice to be not null", async () => {
    const { statusCode, body } = await request(app)
      .put(`/v1/rents/${userId}/${movieId}`)
      .send({
        deliveredDate: Date.now() + 90 * 1000,
      })
      .auth(token, { type: "bearer" });
    console.log(body);
    expect(statusCode).toBe(200);
    expect(body.price).not.toBe(null);
    expect(body.price).toBe(13);
  });
});
