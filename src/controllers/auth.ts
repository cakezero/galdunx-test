import { Request, Response } from "express";
import bcrypt from "bcrypt";
import JWT from "../utils/jwt";
import User from "../models/user";
import { userValidation, loginValidation } from '../validation/authValidation'

// Sign up Logic
const register = async (req: Request, res: Response) => {
  try {
    const { error } = userValidation.validate(req.body);

    if (error) {
      console.log(
        `Registration validation error: ${error.details[0].message}`
      );
      return res.status(400).json({ error: error });
    }

    const { email, password } = req.body;

    const ExistingUser = await User.findOne({ email });

    if (ExistingUser) {
        return res
          .status(400)
          .json({ error: "Email already registered. Login instead" });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = new User({
      password: hashedPassword,
      email
    });
    
    await newUser.save();
    const token = await JWT.sign({ newUser }, { expiresIn: "1d" });;

    return res.status(200).json({
      message: "Registration successful",
      authToken: token,
    });
  } catch (error) {
    console.log(`An error Occured ${error}`);
    return res
      .status(500)
      .json({ error: `An error occured` });
  }
};


// Login
const login = async (req: Request, res: Response) => {
  try {
    const { error } = loginValidation.validate(req.body);
    if (error) {
      console.log(
        `Login Validation error: ${error.details[0].message}`
      );
      return res.status(400).json({ error: error });
    }
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ error: "Incorrect credentials. Try again!" });
    }

    const passwordCheck = await bcrypt.compare(password, user.password.toString());

    if (!passwordCheck) {
      return res
        .status(400)
        .json({ error: "Incorrect credentials. Try again!" });
    }

    const token = await JWT.sign({ user }, { expiresIn: "10d" });

    return res
      .status(200)
      .json({ authToken: token, message: "Login successful" });
  } catch (error) {
    console.log(`Error during login ${error}`);
    return res
      .status(500)
      .json({ error: "User login failed. Try again!" });
  }
};

const protect = (req: Request, res: Response) => {

}

export { register, login, protect };
