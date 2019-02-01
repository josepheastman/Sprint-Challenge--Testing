const request = require("supertest");

const db = require("../data/dbConfig.js");

const server = require("./server.js");

afterEach(async () => {
  await db("games").truncate();
});

describe("server.js", async () => {
  describe("POST /games endpoint", () => {
    it("should post to server & respond with 201 status code", async () => {
      const body = {
        title: "Super Smash Bros",
        genre: "Fighting",
        releaseYear: 1999
      };

      let response = await request(server)
        .post("/games")
        .send(body);
      expect(response.body).toEqual([1]);
      expect(response.status).toBe(201);
    });

    it("should fail & respond with 422 status code", async () => {
      const body = {
        genre: "Fighting",
        releaseYear: 1999
      };

      let response = await request(server)
        .post("games")
        .send(body);

      expect(response.status).toBe(422);
    });

    it("should respond with JSON object", async () => {
      let response = await request(server)
        .post("games")
        .send({
          title: "Dark Souls",
          genre: "Action RPG",
          releaseYear: 2011
        });
      expect(response.type).toBe("application/json");
    });
  });

  describe("GET /games endpoint", async () => {
    it("should respond with status code 200", async () => {
      const response = await request(server).get("/games");
      expect(response.status).toBe(200);
    });

    it("should respond with JSON object", async () => {
      const response = await request(server).get("/games");
      expect(response.type).toBe("application/json");
    });

    it("should respond with an array", async () => {
      const response = await request(server).get("/games");
      expect(response.body).toEqual([]);
    });
  });
});
