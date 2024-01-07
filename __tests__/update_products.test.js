const request = require("supertest")
const app = require('../app')
const { User, Product, Category } = require('../models')
const { signToken } = require('../helper/jwt')

let accessToken;
let accessToken2;
let productId;
let productId2;

beforeAll(async () => {
    const user = await User.create({
        email: "admin@mail.com",
        password: "admin",
        role: "Admin",
    })
    accessToken = signToken({ id: user.id, email: user.email })
    const user2 = await User.create({
        email: "staff@mail.com",
        password: "staff",
        role: "Staff",
    })
    accessToken2 = signToken({ id: user2.id, email: user2.email })
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
    productId = product.id
    const product2 = await Product.create({
        name: "White glove",
        description: "glove",
        price: 100000,
        stock: 100,
        imgUrl: "image_url",
        categoryId: 1,
        authorId: 1
    })
    productId2 = product2.id
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

});

describe("PUT /products/:id", () => {
    test("a. Berhasil mengupdate data Entitas Utama berdasarkan params id yang diberikan", async () => {
        const updateCategories = {
            name: "Black glove",
            description: "glove",
            price: 100000,
            stock: 100,
            imgUrl: "image_url",
            categoryId: 1,
        }

        const response = await request(app).put(`/products/${+productId}`).set("Authorization", `Bearer ${accessToken}`).send(updateCategories)

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('name', expect.any(String))
        expect(response.body).toHaveProperty('description', expect.any(String))
        expect(response.body).toHaveProperty('price', expect.any(Number))
        expect(response.body).toHaveProperty('stock', expect.any(Number))
        expect(response.body).toHaveProperty('imgUrl', expect.any(String))
        expect(response.body).toHaveProperty('categoryId', expect.any(Number))
    });

    test("b Gagal menjalankan fitur karena belum login", async () => {
        const updateCategories = {
            name: "Black glove",
            description: "glove",
            price: 100000,
            stock: 100,
            imgUrl: "image_url",
            categoryId: 1,
        }

        const response = await request(app).put(`/products/${+productId}`).send(updateCategories)

        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('message', "Error authentication")
    })

    test("d. Gagal karena id entity yang dikirimkan tidak terdapat di database", async () => {
        const updateCategories = {
            name: "Black glove",
            description: "glove",
            price: 100000,
            stock: 100,
            imgUrl: "image_url",
            categoryId: 1,
        }

        const response = await request(app).put(`/products/${10000}`).set("Authorization", `Bearer ${accessToken}`).send(updateCategories)

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('message', "Data not found")
    })

    test("e. Gagal menjalakan fitur ketika Staff mengolah data entity yang bukan miliknya", async () => {
        const updateCategories = {
            name: "Black glove",
            description: "glove",
            price: 100000,
            stock: 100,
            imgUrl: "image_url",
            categoryId: 1,
        }

        const response = await request(app).put(`/products/${+productId}`).set("Authorization", `Bearer ${accessToken2}`).send(updateCategories)

        expect(response.status).toBe(403);
        expect(response.body).toHaveProperty('message', "Forbidden")
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

        const response = await request(app).put(`/products/${+productId}`).set("Authorization", `Bearer ${accessToken}`).send(createProduct)

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

        const response = await request(app).put(`/products/${+productId}`).set("Authorization", `Bearer ${accessToken}`).send(createProduct)

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

        const response = await request(app).put(`/products/${+productId}`).set("Authorization", `Bearer ${accessToken}`).send(createProduct)

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

        const response = await request(app).put(`/products/${+productId}`).set("Authorization", `Bearer ${accessToken}`).send(createProduct)

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

        const response = await request(app).put(`/products/${+productId}`).set("Authorization", `Bearer ${accessToken}`).send(createProduct)

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("message", "Price must be above 1000");
    })

    test("c. Gagal menjalankan fitur karena token yang diberikan tidak valid", async () => {
        const updateCategories = {
            name: "Black glove",
            description: "glove",
            price: 100000,
            stock: 100,
            imgUrl: "image_url",
            categoryId: 1,
        }

        accessToken = "(random string)"
        const response = await request(app).put(`/products/${+productId}`).set("Authorization", `Bearer ${accessToken}`).send(updateCategories)

        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('message', "Error authentication")
    })
})



