const request = require("supertest");
const app = require("../app");
const {
  checkJwt,
  checkScopes,
} = require("../middleware/authorisationMiddleware");

jest.mock("../middleware/authorisationMiddleware");

describe("GIVEN that the GET /teams route exist", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("WHEN the user is authenticated THEN return status 200", async () => {

    checkJwt.mockImplementation((req, res, next) => next());

    checkScopes.mockImplementation((req, res, next) => next());

    const response = await request(app)
      .get("/api/teams")
      .set("Accept", "application/json");

    expect(response.status).toBe(200);
  });

  test("WHEN the user is not authenticated THEN return status 401", async () => {
    checkJwt.mockImplementation((req, res, next) => {
      try {
        const error = new Error("Unauthorized");
        error.status = 401;
        throw error;
      } catch (e) {
        next(e);
      }
    });

    const response = await request(app)
      .get("/api/teams")
      .set("Accept", "application/json");

    expect(response.status).toBe(401);
  });

  test("WHEN the user is authenticated but does not have the right permissions THEN return status 403", async () => {
    checkJwt.mockImplementation((req, res, next) => next());

    checkScopes.mockImplementation((req, res, next) => {
      try {
        const error = new Error("Forbidden");
        error.status = 403;
        throw error;
      } catch (e) {
        next(e);
      }
    });

    const response = await request(app)
      .get("/api/teams")
      .set("Accept", "application/json");

    expect(response.status).toBe(403);
  });
});
