import User from "../models/User";
import bcrypt from "bcryptjs";

export const getAllUser = async (req, res, next) => {
  let users;

  try {
    users = await User.find();

    if (!users) {
      return res.status(404).json({ message: "No users Found" });
    }

    return res.status(200).json({ users });
  } catch (error) {
    console.log(error);
  }
};

export const signup = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    if (!email || !name || !password) {
      return res.status(400).json({ message: "Ban nhap thieu thong tin" });
    }

    let existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists! login Instead" });
    }

    const hashedPassword = bcrypt.hashSync(password);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    return res.status(201).json({ user });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Ban nhap thieu thong tin" });
    }

    let existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res
        .status(400)
        .json({ message: "Couldn't find user by this email" });
    }

    const isPasswordCorrect = bcrypt.compareSync(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Incorrect Password" });
    }

    return res.status(200).json({ message: "login success" });
  } catch (error) {
    console.log(error);
  }
};
