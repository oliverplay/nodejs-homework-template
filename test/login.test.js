const request = require('supertest');
const { app, connectDB } = require('../app');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const Joi = require('joi');

// Mock bcrypt and jwt
jest.mock('bcryptjs', () => ({
  compare: jest.fn(),
}));
jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
}));

// Mock Joi validation
jest.mock('joi', () => {
  const actualJoi = jest.requireActual('joi');
  return {
    ...actualJoi,
    object: jest.fn((schema) => ({
      validateAsync: jest.fn((input) => actualJoi.object(schema).validateAsync(input)),
    })),
  };
});

// Mock mongoose model
jest.mock('mongoose', () => {
  const actualMongoose = jest.requireActual('mongoose');
  const mockFindOne = jest.fn();

  return {
    ...actualMongoose,
    connect: jest.fn(),
    model: jest.fn(() => ({
      findOne: mockFindOne,
    })),
    connection: { close: jest.fn() },
    __mockFindOne: mockFindOne, // Expose mockFindOne for use in tests
  };
});

beforeAll(async () => {
  await connectDB();
});

afterAll(() => {
  mongoose.connection.close();
});

describe('Login Controller', () => {
  const mockFindOne = mongoose.__mockFindOne;

  it('should return 200 and a token with user details', async () => {
    const mockUser = {
      email: 'test@example.com',
      password: 'hashedpassword',
      _id: '123',
      token: null,
      save: jest.fn(),
    };

    mockFindOne.mockResolvedValue(mockUser);
    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue('fake-token');

    const user = { email: 'test@example.com', password: 'testpassword' };
    const res = await request(app).post('/api/users/login').send(user);

    expect(res.status).toBe(200);
    expect(res.body.token).toBe('fake-token');
    expect(res.body.user.email).toBe('test@example.com');
  });

  it('should return 401 if email or password is incorrect', async () => {
    mockFindOne.mockResolvedValue(null); // Simulate user not found
    const user = { email: 'wrong@example.com', password: 'wrongpassword' };
    const res = await request(app).post('/api/users/login').send(user);

    expect(res.status).toBe(401);
    expect(res.body.message).toBe('Email or password is wrong');
  });
});
