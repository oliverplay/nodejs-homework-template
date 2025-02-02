const mongoose = require("mongoose");
const User = require("../models/user");
const { updateAvatar } = require("../controllers/users");
const { processAvatar, moveAvatar } = require("../services/avatar");

jest.mock("../services/avatar.js", () => ({
  processAvatar: jest.fn(),
  moveAvatar: jest.fn().mockResolvedValue("public/avatars/test.png"),
}));

describe("PATCH /users/avatars", () => {
  let testUser;

  beforeAll(async () => {
    await mongoose.connect(
      "mongodb+srv://naomimariuta:123456Xcvbnm!@cluster0.zftuw.mongodb.net/"
    );

    testUser = new User({ email: "test@gmail.com", password: "parola123" });
    await testUser.save();
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.disconnect();
  });

  it("✔️ Ar trebui să actualizeze avatar-ul unui utilizator", async () => {
    const req = {
      user: { _id: testUser._id },
      file: { path: "tmp/test.png", filename: "test.png" },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await updateAvatar(req, res);

    expect(processAvatar).toHaveBeenCalledWith("tmp/test.png");
    expect(moveAvatar).toHaveBeenCalledWith("tmp/test.png", "test.png");

    const updatedUser = await User.findById(testUser._id);
    expect(updatedUser.avatarURL).toBe("public/avatars/test.png");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      avatarURL: "public/avatars/test.png",
    });
  });

  it("❌ Ar trebui să returneze 400 dacă nu se trimite un fișier", async () => {
    const req = { user: { _id: testUser._id }, file: null };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await updateAvatar(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "No file uploaded ^_^" });
  });
});
