const mongoose = require("mongoose");
const async = require("async");
const bcrypt = require("bcrypt");
global.Promise = require("bluebird");

Promise.promisifyAll(bcrypt);

const BCRYPT_SALT_LEN = 16;

mongoose.connect(
  "mongodb://wallet:wallet1234@ds249545.mlab.com:49545/wallet-app"
);
const db = mongoose.connection;

const ProfileSchema = mongoose.Schema({
  email: {
    type: String,
    index: {
      unique: true
    }
  },
  auth: {
    encrypted_owner_key: {
      type: String,
      required: true
    }
  },
  image_url: String,
  display_name: String,
  about: String,
  location: String,
  website: String,
  phone: {
    type: String,
    index: {
      unique: true
    }
  }
});

ProfileSchema.pre("save", async function(next) {
  if (!this.isModified("auth.encrypted_owner_key")) {
    return next();
  }

  try {
    const hash = await bcrypt.hashAsync(
      this.auth.encrypted_owner_key,
      BCRYPT_SALT_LEN
    );
    this.auth.encrypted_owner_key = hash;
    next();
  } catch (err) {
    next(err);
  }
});

ProfileSchema.methods.isOwnerKeyValid = async function(owner_key) {
  try {
    return bcrypt.compareAsync(owner_key, this.auth.encrypted_owner_key);
  } catch (err) {
    throw err;
  }
};

const Profile = mongoose.model("Profile", ProfileSchema);

module.exports = { Profile };
