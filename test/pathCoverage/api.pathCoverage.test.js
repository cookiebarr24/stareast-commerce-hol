const request = require("supertest");
const { expect } = require("chai");

const BASE_URL = process.env.TEST_BASE_URL || "http://localhost:3000";

describe("API path coverage", function () {
  this.timeout(10000);

  it("GET /healthcheck returns API health status", async function () {
    const response = await request(BASE_URL).get("/healthcheck");

    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal({ status: "ok" });
  });

  it("POST /register creates a new user with valid data from README format", async function () {
    const unique = Date.now();
    const payload = {
      name: "John",
      email: `john.${unique}@example.com`,
      password: "john123",
    };

    const response = await request(BASE_URL).post("/register").send(payload);

    expect(response.status).to.equal(201);
    expect(response.body).to.include({
      name: payload.name,
      email: payload.email,
    });
    expect(response.body).to.have.property("id").that.is.a("number");
  });

  it("POST /login authenticates using README initial user data", async function () {
    const payload = {
      email: "alice@example.com",
      password: "alice123",
    };

    const response = await request(BASE_URL).post("/login").send(payload);

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property("token").that.is.a("string");
  });

  it("POST /checkout processes purchase using README products and cash payment", async function () {
    const loginResponse = await request(BASE_URL).post("/login").send({
      email: "alice@example.com",
      password: "alice123",
    });

    expect(loginResponse.status).to.equal(200);
    const { token } = loginResponse.body;

    const payload = {
      paymentMethod: "cash",
      items: [
        { productId: 1, quantity: 2 },
        { productId: 2, quantity: 1 },
      ],
    };

    const response = await request(BASE_URL)
      .post("/checkout")
      .set("Authorization", `Bearer ${token}`)
      .send(payload);

    expect(response.status).to.equal(200);
    expect(response.body).to.include({
      paymentMethod: "cash",
      subtotal: 75,
      discount: 7.5,
      total: 67.5,
    });
    expect(response.body).to.have.property("items").with.lengthOf(2);
    expect(response.body).to.have.nested.property("customer.email", "alice@example.com");
  });
});
