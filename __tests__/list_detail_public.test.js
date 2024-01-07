const request = require("supertest")
const app = require('../app')
// const { User, Product, Category } = require('../models')
const { sequelize } = require('../models')
const { signToken } = require('../helper/jwt')
const { queryInterface } = sequelize

const category = require("../data/categories.json").map((el) => {
    el.createdAt = new Date();
    el.updatedAt = new Date();
    return el;
});
const user = require("../data/user.json").map((el) => {
    el.createdAt = new Date();
    el.updatedAt = new Date();

    return el;
});
console.log(user, "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
const product = require("../data/products.json").map((el) => {
    el.createdAt = new Date();
    el.updatedAt = new Date();
    return el;
});
beforeAll(async () => {
    await queryInterface.bulkInsert("Users", user, {});
    await queryInterface.bulkInsert("Categories", category, {});
    await queryInterface.bulkInsert("Products", product, {});
})

afterAll(async () => {
    await queryInterface.bulkDelete("Users", null, {
		truncate: true,
		cascade: true,
		restartIdentity: true,
	});
	await queryInterface.bulkDelete("Categories", null, {
		truncate: true,
		cascade: true,
		restartIdentity: true,
	});
	await queryInterface.bulkDelete("Products", null, {
		truncate: true,
		cascade: true,
		restartIdentity: true,
	});
})

describe("GET /publics/pub/:id", () => {
    test("a. Berhasil mendapatkan 1 Entitas Utama sesuai dengan params id yang diberikan", async () => {
        const response = await request(app).get(`/publics/pub/${3}`)
        console.log(response.body);

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty("id", 3)
    })

    test("b. Gagal mendapatkan Entitas Utama karena params id yang diberikan tidak ada di database / invalid", async () => {
        const response = await request(app).get(`/publics/pub/${1000}`)

        expect(response.status).toBe(404)
		expect(response.body.message).toEqual("Data not found")
    });
})