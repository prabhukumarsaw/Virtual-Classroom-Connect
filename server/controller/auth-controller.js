const { User } = require("../model/user-model.js");
const bcrypt = require("bcryptjs");

const home = async (req, res) => {
  try {
    res.status(200).send("Welcome to Home Page");
  } catch (error) {
    console.log(error);
  }
};

const register = async (req, res) => {
  try {
    //get all data from body
    const { username, email, password } = req.body;

    //validate
    if (!(username && email && password)) {
      res.status(400).send("All fields are required!");
    }
    //check if user already exists - email
    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({ message: "User Already Exist" });
    }

    //hash the password

    // const saltRound = 10;
    // const hash_password = await bcrypt.hash(password, saltRound);

    //save data user in db
    const userCreated = await User.create({ username, email, password });

    //generate token and send it on user-model

    res.status(201).json({
      msg: "Registration Successful",
      //   userCreated,  not sent to database
      token: await userCreated.generateToken(),
      userId: userCreated._id.toString(),
    });
  } catch (error) {
    res.status(501).send({ msg: "Internal server error" });
  }
};

const login = async (req, res) => {
  try {
    //get all data from body
    const { email, password } = req.body;

    //validation

    if (!(email && password)) {
      res.status(400).send("All fields are required!");
    }

    //find user data in db

    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    //compare the password

    const user = await bcrypt.compare(password, userExist.password);

    //send token

    if (user) {
      res.status(201).json({
        msg: "Login Successful",
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
      });
    } else {
      res.status(401).json({ message: "Invalid email or Password" });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { home, register, login };
