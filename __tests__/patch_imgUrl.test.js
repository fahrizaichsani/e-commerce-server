const request = require("supertest")
const app = require('../app')
const { User, Product, Category } = require('../models')
const { signToken } = require('../helper/jwt')

let accessToken;
let accessToken2;
let productId;
let productId2;
let productName;

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
    productName = product.name
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

describe("PATCH /products/:id", () => {
    test("a. Berhasil mengupdate imageUrl Entitas Utama berdasarkan params id yang diberikan", async () => {
        const response = await request(app).patch(`/products/${+productId}`).set("Authorization", `Bearer ${accessToken}`).attach("imgUrl", "./data/kambing.jpeg");

        expect(response.status).toBe(200);
        expect(response.body.message).toEqual("Image image_url success to update")
    })

    test("b. Gagal menjalankan fitur karena belum login", async () => {
        const response = await request(app).patch(`/products/${+productId}`).attach("imgUrl", "./data/kambing.jpeg");

        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('message', "Error authentication")
    })

    test("d. Gagal karena id entity yang dikirimkan tidak terdapat di database", async () => {
        const response = await request(app).patch(`/products/${1000}`).set("Authorization", `Bearer ${accessToken}`).attach("imgUrl", "./data/kambing.jpeg");

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('message', "Data not found")
    })

    test("e. Gagal menjalakan fitur ketika Staff mengolah data entity yang bukan miliknya", async () => {
        const response = await request(app).patch(`/products/${+productId}`).set("Authorization", `Bearer ${accessToken2}`).attach("imgUrl", "./data/kambing.jpeg");

        expect(response.status).toBe(403);
        expect(response.body).toHaveProperty('message', "Forbidden")
    })

    test("c. Gagal ketika request body yang diberikan tidak sesuai", async () => {
        const response = await request(app).patch(`/products/${+productId}`).set("Authorization", `Bearer ${accessToken}`).send({ imgUrl: "./data/kambing.jpeg" });

        expect(response.status).toBe(400);
        expect(response.body.message).toEqual("Please upload an image")
    });

    test("c. Gagal menjalankan fitur karena token yang diberikan tidak valid", async () => {
        accessToken = "(random string)"
        const response = await request(app).patch(`/products/${+productId}`).set("Authorization", `Bearer ${accessToken}`).attach("imgUrl", "./data/kambing.jpeg");

        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('message', "Error authentication")
    })
})