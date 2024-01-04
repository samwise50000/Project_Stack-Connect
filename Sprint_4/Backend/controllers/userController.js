const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

function createToken(_id) {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "1h" });
}

const capitalize = (str) =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

const registerUser = async (req, res) => {
  let { firstName, lastName, email, password } = req.body;

  firstName = capitalize(firstName);
  lastName = capitalize(lastName);
  email = email.toLowerCase();

  try {
    const user = await User.signup(firstName, lastName, email, password);
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);

    res.status(200).json({
      email: user.email,
      token: createToken(user._id),
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};

const getUser = async (req, res) => {
  const user = await User.findById(req.user);
  res.json(user);
};

const getUsers = async (req, res) => {
  const users = await User.find({});
  res.json(users);
};

const updateUser = async (req, res) => {
  const userId = req.user;

  const { firstName, lastName, password } = req.body;

  const updatedFirstName = capitalize(firstName);
  const updatedLastName = capitalize(lastName);

  try {
    const user = await User.updateUser(
      userId,
      updatedFirstName,
      updatedLastName,
      password
    );

    res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  const userId = req.user;

  try {
    const user = await User.deleteUser(userId);

    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUser,
  getUsers,
  updateUser,
  deleteUser,
};
