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


describe("DELETE /products/:id", () => {
    test("a. Berhasil mengahpus data Entitas Utama berdasarkan params id yang diberikan", async () => {
        const response = await request(app).delete(`/products/${+productId}`).set("Authorization", `Bearer ${accessToken}`)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty("message", `${productName} success to delete`)
    })

    test("b Gagal menjalankan fitur karena belum login", async () => {
        const response = await request(app).delete(`/products/${+productId}`)

        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('message', "Error authentication")
    })

    test("d. Gagal karena id entity yang dikirimkan tidak terdapat di database", async () => {
        const response = await request(app).delete(`/products/${10000}`).set("Authorization", `Bearer ${accessToken}`)
        
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('message', "Data not found")
    })

    test("e. Gagal menjalakan fitur ketika Staff mengolah data entity yang bukan miliknya", async () => {
        const response = await request(app).delete(`/products/${+productId2}`).set("Authorization", `Bearer ${accessToken2}`)
        // console.log(response.status, response.body);

        expect(response.status).toBe(403);
        expect(response.body).toHaveProperty('message', "Forbidden")
    })

    test("c. Gagal menjalankan fitur karena token yang diberikan tidak valid", async () => {
        accessToken = "(random string)"
        const response = await request(app).delete(`/products/${+productId}`).set("Authorization", `Bearer ${accessToken}`)
        
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('message', "Error authentication")
    })
})