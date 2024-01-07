const request = require("supertest");
const app = require("../app");
const { User } = require("../models");



// before dan after all karena kita membutuhkan data user
beforeAll(async () => {
    const user = await User.create({
        email: "admin@mail.com",
        password: "admin",
        role: "Admin"
    });
    // console.log(user, '<<<<<<<<<<');
});

afterAll(async () => {
    await User.destroy({
        truncate: true,
        cascade: true,
        restartIdentity: true,
    });
});

describe("POST /login", () => {
    test("a. Berhasil login dan mengirimkan access_token", async () => {
        const dataLoginUser = {
            email: "admin@mail.com",
            password: "admin",
        };

        const response = await request(app).post("/login").send(dataLoginUser);
        // console.log(response);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("accessToken", expect.any(String));
    });

    test("b. Email tidak diberikan/ tidak diinput", async () => {
        const dataLoginUser = {
            email: "",
            password: "admin",
        };

        const response = await request(app).post("/login").send(dataLoginUser);

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("message", "Email cannot empty");
    });

    test("c. Password tidak diberikan/ tidak diinput", async () => {
        const dataLoginUser = {
            email: "admin@mail.com",
            password: ""
        }

        const response = await request(app).post("/login").send(dataLoginUser)

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("message", "Password cannot empty")
    })

    test("d. Email diberikan invalid / tidak terdaftar", async () => {
        const dataLoginUser = {
            email: "admin1000@mail.com",
            password: "admin"
        }

        const response = await request(app).post('/login').send(dataLoginUser)
        
        expect(response.status).toBe(401)
        // console.log(response.body, '<<<<<||||||||');
        expect(response.body).toHaveProperty("message", "user not found")
    })

    test("e. Password diberikan salah/ tidak match", async () => {
        const dataLoginUser = ({
            email: "admin@gmail.com",
            password: "admin100"
        })

        const response = await request(app).post('/login').send(dataLoginUser)

        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty("message", "user not found")
    })
});