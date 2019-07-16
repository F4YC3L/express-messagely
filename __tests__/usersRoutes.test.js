const request = require("supertest");
const jwt = require("jsonwebtoken");

const app = require("../app");
const db = require("../db");
const User = require("../models/user");


describe("get all users Test", async function () {

    beforeEach(async function () {
      await db.query("DELETE FROM messages");
      await db.query("DELETE FROM users");
  
      let u1 = await User.register({
        username: "test1",
        password: "password",
        first_name: "Test1",
        last_name: "Testy1",
        phone: "+14155550000",
      });
    });

describe("GET all of the users if logged in", function () {
    test("can get all the users"), async function () {
        let response = await request(app);
        .get('/users')
    }
});