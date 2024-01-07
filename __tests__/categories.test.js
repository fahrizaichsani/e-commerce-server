const request = require("supertest")
const app = require('../app')
const { User, Product, Category } = require('../models')
const { signToken } = require('../helper/jwt')

let accessToken
beforeAll(async () => {
    const user = await User.create({
        email: "admin@mail.com",
        password: "admin",
        role: "Admin",
    })
    accessToken = signToken({ id: user.id, email: user.email })
    const category = await Category.create({
        name: "Glove"
    })
    const product = await Product.create({
        name: "Black glove",
        description: "glove",
        price: 100000,
        stock: 100,
        imgUrl: "image_url",
        categoryId: 1,
        authorId: 1
    })
})

afterAll(async () => {
    await User.destroy({
        truncate: true,
        cascade: true,
        restartIdentity: true,
    })

    await Category.destroy({
        truncate: true,
        cascade: true,
        restartIdentity: true,
    })

    await Product.destroy({
        truncate: true,
        cascade: true,
        restartIdentity: true,
    })
})

describe("GET /categories", () => {
    test("a. Berhasil mendapatkan data Entitas Kedua", async () => {
        const response = await request(app).get('/categories').set("Authorization", `Bearer ${accessToken}`)

        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Array)
        expect(response.body.length).toBeGreaterThan(0)
    })

    test("b. Gagal menjalankan fitur karena belum login", async () => {
        const response = await request(app).get('/categories')

        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty("message", "Error authentication")
    });

    test("c. Gagal menjalankan fitur karena token yang diberikan tidak valid", async () => {
        accessToken = "(random string)";

        const response = await request(app).get('/categories').set("Authorization", `Bearer ${accessToken}`)

        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty("message", "Error authentication")
    })
})