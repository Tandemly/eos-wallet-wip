const mongoose = require("mongoose");
const Profile = require("./profiles");
global.Promise = require("bluebird");

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
    const loaded = await Profile.insertMany(profiles);
    log(`-> Loaded ${loaded.length} wallet profiles`);
    return loaded;
  } catch (err) {
    console.log("[API Profiles] error:", err);
  }
};

try {
  // open mongoose connection
  mongoose.connect();

  console.log("[test db] Loading ...");
  loadProfiles().then(profiles => {
    console.log("[test db] Done.");
    process.exit(0);
  });
} catch (err) {
  console.log("unhandled error:", err);
  process.exit(1);
}
