/**
 * use this command to run the tests
 * # mocha test/traveller.test.js -R spec
 */

var test = require("unit.js");
const axios = require("axios");
const assert = require('assert');

describe("Traveller test", () => {
  it("should add a new traveller", async () => {
    const data = {
      user: "SLIIT",
      username: "CSSE",
      pw: "sliit123",
      mobile: "0112224448",
      balance: 5000,
    };

    let response = await axios.post(
      "http://localhost:3001/api/addnewtravller",
      data
    );

    test.assert.equal("SLIIT", response.data.user);
    test.assert.notEqual("SPM", response.data.username);
    test.assert.equal("sliit123", response.data.pw);
    test.assert.strictEqual("0112224448", response.data.mobile);
    test.assert.notStrictEqual("5000", response.data.balance);
  });

  it("should update balance of user", async () => {
    let username = "CSSE";
    let newbalance = 3500;

    await axios.put(
      `http://localhost:3001/api/deductFair/${username}/${newbalance}`
    );

    let response = await axios.get(
      `http://localhost:3001/api/getTravellerInfo/${username}`
    );

    test.assert.equal(newbalance, response.data[0].balance);
    test.assert.notEqual(5000, response.data[0].balance);
    test.assert.strictEqual(newbalance, response.data[0].balance);
  });

  it("should delete a traveller", async () => {
    let username = "CSSE";

    await axios.delete(`http://localhost:3001/api/deleteTraveller/${username}`);

    let response = await axios.get(
      `http://localhost:3001/api/getTravellerInfo/${username}`
    );

    test.assert.equal(undefined, response.data[0]);
  });
});

it("should fail but it's not", async () => {
  // api should be "get"
  await assert.rejects(axios.post("http://localhost:3001/api/getalltravellers"));
});
