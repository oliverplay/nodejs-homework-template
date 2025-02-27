const request = require("supertest");
const app = require("../app"); // presupunând că ai un fișier app.js care inițiază aplicația Express
const User = require("../models/user");
const { connectDB, disconnectDB } = require("./testDbConnection");

describe("POST /users/login", () => {
  let user;

  beforeAll(async () => {
    await connectDB();

    await User.deleteMany({ email: "naomimariuta1@gmail.com" });

    // Creează un utilizator de test
    user = await User.create({
      email: "naomimariuta1@gmail.com",
      password: "password123",
      subscription: "starter",
    });
  });

  afterAll(async () => {
    // Șterge baza de date după ce au terminat testele
    await disconnectDB();
  });

  it("should return status 200 and a token with user info when login is successful", async () => {
    const response = await request(app).post("/users/login").send({
      email: "naomimariuta1@gmail.com",
      password: "password123",
    });

    // Verifică dacă răspunsul este corect
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
    expect(response.body).toHaveProperty("user");
    expect(response.body.user).toHaveProperty("email", user.email);
    expect(response.body.user).toHaveProperty(
      "subscription",
      user.subscription
    );
  });

  it("should return 401 if the email is not found", async () => {
    const response = await request(app).post("/users/login").send({
      email: "nonexistent@example.com",
      password: "password123",
    });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Email not found ^_^");
  });

  it("should return 401 if the password is incorrect", async () => {
    const response = await request(app).post("/users/login").send({
      email: "naomimariuta1@gmail.com",
      password: "wrongpassword",
    });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Password is wrong ^_^");
  });
});
