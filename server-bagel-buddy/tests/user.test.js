const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");
require("dotenv").config();

const base_url = "/api/user";

/* Connecting to the database before all test. */
beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI);
});

/* Closing connection after each test. */
afterAll(async () => {
    await mongoose.connection.close();
});

/* Testing the API endpoints. */
describe(`POST ${base_url}/auth/login`, () => {
    it("user1 with correct password should login", async () => {
        const res = await request(app)
            .post(`${base_url}/auth/login`)
            .send({
                email: "user1@gmail.com",
                password: "user1"
            });
        expect(res.statusCode).toBe(200);
    });

    it("user1 with wrong password should not login", async () => {
        const res = await request(app)
            .post(`${base_url}/auth/login`)
            .send({
                email: "user1@gmail.com",
                password: "user2"
            });
        expect(res.statusCode).toBe(401);
    });
});
