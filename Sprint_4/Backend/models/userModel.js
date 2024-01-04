const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      maxlength: 30,
    },
    lastName: {
      type: String,
      required: true,
      maxlength: 30,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// static signup method
userSchema.statics.signup = async function (
  firstName,
  lastName,
  email,
  password
) {
  // validation
  if (!firstName || !lastName || !email || !password) {
    throw Error("All fields must be filled");
  }
  if (!validator.isAlpha(firstName)) {
    throw Error("First name must only contain letters");
  }
  if (!validator.isAlpha(lastName)) {
    throw Error("Last name must only contain letters");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({
    firstName,
    lastName,
    email,
    password: hash,
  });

  return user;
};

// static login method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Incorrect email");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect password");
  }

  return user;
};

// static update method
userSchema.statics.updateUser = async function (
  userId,
  firstName,
  lastName,
  password
) {
  // validation
  if (!firstName || !lastName || !password) {
    throw Error("All fields must be filled");
  }
  if (!validator.isAlpha(firstName)) {
    throw Error("First name must only contain letters");
  }
  if (!validator.isAlpha(lastName)) {
    throw Error("Last name must only contain letters");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  }

  const user = await this.findById(userId);

  if (!user) {
    throw Error("User not found");
  }

  user.firstName = firstName;
  user.lastName = lastName;

  if (password) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    user.password = hash;
  }

  await user.save();

  return user;
};

// static delete method
userSchema.statics.deleteUser = async function (UserId) {
  const user = await this.findOneAndDelete({ _id: UserId });

  if (!user) {
    throw Error("User not found");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
