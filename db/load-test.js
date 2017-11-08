const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const { connect } = require("../server/db");
const { env } = require("../server/vars");
const Profile = require("../server/models/profiles.model");
const bcrypt = require("bcryptjs");

global.Promise = require("bluebird");

const log = msg => console.log(`[test db] ${msg}`);

const loadJSON = rel =>
  JSON.parse(
    fs.readFileSync(path.join(__dirname, rel), {
      encoding: "utf-8"
    })
  );

const loadProfiles = async () => {
  try {
    const profiles = loadJSON("./initial.json");
    await Profile.remove({});
    const hashed = profiles.map(profile => {
      const rounds = env === "test" ? 1 : 10;
      const hash = bcrypt.hashSync(profile.password, rounds);
      profile.password = hash;
      return profile;
    });
    const loaded = await Profile.insertMany(hashed);
    log(`-> Loaded ${loaded.length} wallet profiles`);
    return loaded;
  } catch (err) {
    console.log("[API Profiles] error:", err);
  }
};

try {
  // open mongoose connection
  connect();

  console.log("[test db] Loading ...");
  loadProfiles().then(profiles => {
    console.log("[test db] Done.");
    process.exit(0);
  });
} catch (err) {
  console.log("unhandled error:", err);
  process.exit(1);
}
