const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");
const routes = require("../routes/index");
require("dotenv").config();

const base_url = "/api/lesson";
let studentToken = '';
let teacherToken = '';
const teacherId = '65430bdd5f100ff025efbc94';

/* Connecting to the database before all test. */
beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI);
    app.use("/api", routes);
    let studentRes = await request(app)
        .post(`/api/user/auth/login`)
        .send({
            email: "user1@gmail.com",
            password: "user1"
        });
    studentToken = studentRes.body.token;

    let teacherRes = await request(app)
        .post(`/api/user/auth/login`)
        .send({
            email: "irene@gmail.com",
            password: "irene"
        });
    teacherToken = teacherRes.body.token;
});

/* Closing connection after each test. */
afterAll(async () => {
    await mongoose.connection.close();
});

/* Create a lesson. */
describe(`POST ${base_url}`, () => {
    it("students can book a lesson", async () => {
        const res = await request(app)
            .post(`${base_url}`)
            .send({
                teacherId: teacherId,
                timeslotStart: "Sun Dec 03 2023 15:00:00 GMT-0600"
            })
            .set('Authorization', `Bearer ${studentToken}`);
        
        expect(res.body.data.status).toBe(0);
        expect(res.statusCode).toBe(200);
    });

    it("Non-students cannot book a lesson", async () => {
        const res = await request(app)
            .post(`${base_url}`)
            .send({
                teacherId: teacherId,
                timeslotStart: "Sun Dec 03 2023 15:00:00 GMT-0600"
            })
            .set('Authorization', `Bearer ${teacherToken}`);
        
        expect(res.statusCode).toBe(401);
    });
});

/* get lessons. */
describe(`GET ${base_url}/pending`, () => {
    let courseId = '';
    it("teachers can view pending lesson", async () => {
        const res = await request(app)
            .get(`${base_url}/pending`)
            .set('Authorization', `Bearer ${teacherToken}`);
        
        expect(res.statusCode).toBe(200);
        expect(res.body.data.length).toBeGreaterThanOrEqual(0);

        if (res.body.data.length > 0) {
            courseId = res.body.data[0].lesson._id;
        }
    });

    it("teachers can accept their own pending lesson", async () => {
        if (courseId === '') return;
        const res = await request(app)
            .patch(`${base_url}/${courseId}/confirm`)
            .set('Authorization', `Bearer ${teacherToken}`);

        expect(res.body.data.status).toBe(2);
        expect(res.statusCode).toBe(200);
    });

    it("teachers cannot accept other teacher's pending lesson", async () => {
        if (courseId === '') return;
        const res = await request(app)
            .patch(`${base_url}/656257b2743b5875897cb832/confirm`)
            .set('Authorization', `Bearer ${teacherToken}`);

        expect(res.statusCode).toBe(401);
    });
});