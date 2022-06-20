import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import readline from "readline";
import connectToMongo from "../config/mongo.js";
import User from "../models/User.js";

const readLine = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const createUser = () => {
  dotenv.config();
  (async () => {
    let mongoose = null;

    mongoose = await connectToMongo();

    const username = process.env.USER_USERNAME;
    let password;

    if (process.env.USER_PASSWORD && username)
      password = await bcrypt.hash(process.env.USER_PASSWORD, 12);

    const validUsername = String(username).match(/[a-z]/);

    if (validUsername && password.length >= 3 && username.length >= 3) {
      const newUser = await new User({
        username,
        password,
      });

      try {
        await newUser.save();
        console.log("user created successfully");
      } catch (error) {
        console.log(error.message);
      }
    } else console.log("Enter valid email");

    await mongoose.connection.close();
  })();
};

readLine.question(`email: `, (email) => {
  process.env.USER_USERNAME = email;
  readLine.question(`password: `, (password) => {
    process.env.USER_PASSWORD = password;
    readLine.close();
    createUser();
  });
});
