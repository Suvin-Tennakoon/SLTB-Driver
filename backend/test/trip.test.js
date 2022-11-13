/**
 * use this command to run the tests
 * # mocha test/trip.test.js -R spec
 */

var test = require("unit.js");
const axios = require("axios");

describe("Trip test", () => {
  it("should create & add a new trip", async () => {
    const data = {
      start: "Colombo",
      end: "Kandy",
      fair: 500,
    };

    let username = "CSSE";

    await axios.post(`http://localhost:3001/api/addnewtrip/${username}`, data);

    let response = await axios.get(
      `http://localhost:3001/api/getAllUserTrips/${username}`
    );

    test.assert.equal(username, response.data.username);
    test.assert.equal(1, response.data.usertrips.length);
    test.assert.notStrictEqual("500", response.data.usertrips[0].fair);
  });

  it("should add 2nd new trip to user", async () => {
    const data = {
      start: "Galle",
      end: "Jaffna",
      fair: 900,
    };

    let username = "CSSE";

    await axios.post(`http://localhost:3001/api/addnewtrip/${username}`, data);

    let response = await axios.get(
      `http://localhost:3001/api/getAllUserTrips/${username}`
    );

    test.assert.equal(username, response.data.username);
    test.assert.equal(2, response.data.usertrips.length);
    test.assert.notEqual(500, response.data.usertrips[1].fair);
    test.assert.equal("Galle", response.data.usertrips[1].start);
    test.assert.equal("Colombo", response.data.usertrips[0].start);
  });

  it("should delete trips of traveller", async () => {
    let username = "CSSE";

    await axios.delete(`http://localhost:3001/api/deleteUserTrips/${username}`);

    let response = await axios.get(
      `http://localhost:3001/api/getAllUserTrips/${username}`
    );

    test.assert.equal(null, response.data);
  });
});
