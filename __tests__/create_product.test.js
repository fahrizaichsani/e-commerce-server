const request = require("supertest")
const app = require('../app')
const { User, Product, Category } = require('../models')
const { signToken } = require('../helper/jwt')

let accessToken
beforeAll(async () => {
    const user = await User.create({
        email: "admin@mail.com",
        password: "admin",
        role: "Admin"
    })
    accessToken = signToken({ id: user.id, email: user.email })

    const category = await Category.create({
        name: "Glove"
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
})

describe('POST /products', () => {
    test("a. berhasil membuat entitas utama", async () => {
        const createProduct = ({
            name: "Black glove",
            description: "glove",
            price: 100000,
            stock: 100,
            imgUrl: "image_url",
            categoryId: 1,
        })

        const response = await request(app).post('/products').set("Authorization", `Bearer ${accessToken}`).send(createProduct)
        // console.log(response.status, response.body);

        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty("id", expect.any(Number))
        expect(response.body).toHaveProperty("name", expect.any(String))
        expect(response.body).toHaveProperty("description", expect.any(String))
        expect(response.body).toHaveProperty("price", expect.any(Number))
        expect(response.body).toHaveProperty("stock", expect.any(Number))
        expect(response.body).toHaveProperty("imgUrl", expect.any(String))
        expect(response.body).toHaveProperty("categoryId", expect.any(Number))
    })

    test("d. Error validasi ketika name tidak ada", async () => {
        const createProduct = {
            description: "glove",
            price: 100000,
            stock: 100,
            imgUrl: "image_url",
            categoryId: 1
        }

        const response = await request(app).post('/products').set("Authorization", `Bearer ${accessToken}`).send(createProduct)
        // console.log(response.status, response.body);
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("message", "Name cannot empty")
    })

    test("Error validasi ketika description tidak ada", async () => {
        const createProduct = {
            name: "Black glove",
            price: 100000,
            stock: 100,
            imgUrl: "image_url",
            categoryId: 1
        }

        const response = await request(app).post('/products').set("Authorization", `Bearer ${accessToken}`).send(createProduct)

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("message", "Description cannot empty")
    })

    test("Error validasi ketika price tidak ada", async () => {
        const createProduct = ({
            name: "Black glove",
            description: "glove",
            stock: 100,
            imgUrl: "image_url",
            categoryId: 1
        })

        const response = await request(app).post('/products').set("Authorization", `Bearer ${accessToken}`).send(createProduct)

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("message", "Price cannot empty")
    })

    test("Error validasi ketika categoryId tidak ada", async () => {
        const createProduct = ({
            name: "Black glove",
            description: "glove",
            price: 100000,
            stock: 100,
            imgUrl: "image_url"
        })

        const response = await request(app).post('/products').set("Authorization", `Bearer ${accessToken}`).send(createProduct)

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("message", "Category Id cannot empty")
    })

    test("Error validasi ketika name kosong", async () => {
        const createProduct = ({
            name: "",
            description: "glove",
            price: 100000,
            stock: 100,
            imgUrl: "image_url",
            categoryId: 1
        })

        const response = await request(app).post('/products').set("Authorization", `Bearer ${accessToken}`).send(createProduct)

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("message", "Name cannot empty")
    })

    test("Error validasi ketika description kosong", async () => {
        const createProduct = ({
            name: "Black glove",
            description: "",
            price: 100000,
            stock: 100,
            imgUrl: "image_url",
            categoryId: 1
        })

        const response = await request(app).post('/products').set("Authorization", `Bearer ${accessToken}`).send(createProduct)

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("message", "Description cannot empty")
    })

    test("Error validasi ketika price kosong", async () => {
        const createProduct = ({
            name: "Black glove",
            description: "glove",
            price: null,
            stock: 100,
            imgUrl: "image_url",
            categoryId: 1
        })

        const response = await request(app).post('/products').set("Authorization", `Bearer ${accessToken}`).send(createProduct)

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("message", "Price cannot empty")
    })

    test("Error validasi ketika categoryId kosong", async () => {
        const createProduct = ({
            name: "Black glove",
            description: "glove",
            price: 100000,
            stock: 100,
            imgUrl: "image_url",
            categoryId: null
        })

        const response = await request(app).post('/products').set("Authorization", `Bearer ${accessToken}`).send(createProduct)

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("message", "Category Id cannot empty")
    })

    test("Error validasi ketika price dibawah minimum (1000)", async () => {
        const createProduct = ({
            name: "Black glove",
            description: "glove",
            price: 10,
            stock: 100,
            imgUrl: "image_url",
            categoryId: 1
        })

        const response = await request(app).post('/products').set("Authorization", `Bearer ${accessToken}`).send(createProduct)

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("message", "Price must be above 1000");
    })

    test("b Gagal menjalankan fitur karena belum login", async () => {
        const createProduct = {
            name: "Black glove",
            description: "glove",
            price: 100000,
            stock: 100,
            imgUrl: "image_url",
            categoryId: 1
        }

        const response = await request(app).post('/products').send(createProduct)
        // console.log(response.status, response.body);

        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty("message", "Error authentication");
    })

    test("c. Gagal menjalankan fitur karena token yang diberikan tidak valid", async () => {
        const createProduct = {
            name: "Black glove",
            description: "glove",
            price: 100000,
            stock: 100,
            imgUrl: "image_url",
            categoryId: 1
        }

        accessToken = "(random string)";

        const response = await request(app).post('/products').set("Authorization", `Bearer ${accessToken}`).send(createProduct)

        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty("message", "Error authentication");
    })
})