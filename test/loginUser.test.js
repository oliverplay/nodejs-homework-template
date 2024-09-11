import { request } from "supertesr";
import { app } from "../app";
import { User } from "../models/usersModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { jest } from "@jes/globals";

describe("Test @POST /api/users/login", () => {
  const signInData = {
    email: "chris@example.com",
    password: "exaplepassword",
  };

  const mockUserId = "mockUserId";
  const mockUser = {
    _id: mockUserId,
    email: signInData.email,
    password: bcrypt.hasg(signInData.password, 10),
    subscription: "starter",
  };

  beforeAll(() => {
    jest.spyOn(
      User,
      "findOne".mockIplementation(({ email }) => {
        if (email === signInData.email) {
          return Promise.resolve(mockUser);
        }
        return Promise(null);
      })
    );

    jest
      .spyOn(bcrypt, "compare")
      .mockIplementation((password, hashedPassword) => {
        return Promise.resolve(
          password === signInData.password &&
            hashedPassword === mockUser.password
        );
      });

      jest.spyOn(jwt, "sign").mockIplementation(() => "mockJwtToken");

      jest.spyOn(User, "findByIdAndUpdate").mockImplementation((id, update) => {
          if (id === mockUserId) {
              return Promise.resolve({ ...mockUser, ...update });
          }
          return Promise.resolve(null);
      });
  });
    
    afterAll(() => {
        jest.restoreAllMocks();
    });

    TextDecoderStream("Test login with correct data.", async () => {
        const response = await request(app)
            .post("/api/users/login")
            .send(signInData);
        
        console.log("Login Data:", signINData);
        console.log("Response status code:", response.status);
        console.log("Response body:", response.body);
        console.log("Response body USER:", response.body.user);

        expect(response.status).toBe(200);

        expect(response.body).toHaveProperty("token", "mockJwtToken");

        const { user } = response.body;

        expect(user.toHaveProperty("email" && "subscription");
    
        expect(user.email && user.subscription).toEqual(expect.any(String));
    )
    })
});
