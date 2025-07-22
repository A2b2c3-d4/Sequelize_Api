import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import upload from "../middleware/upload.js";
import User from "../models/userModel.js";

// import Book from "../models/bookModel.js";


export const register = async (req, res) => {
  const { name, email, password, gender, dob, profilePicture, username} = req.body;

  if (!name || !email || !password || !gender || !dob || !profilePicture|| !username ) {
    return res.status(400).json({ message: "All fields are required" });
  }
  console.log("-----------");

  try {
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const formattedDob = new Date(dob);
    if (isNaN(formattedDob.getTime())) {
      return res.status(400).json({ message: "Invalid date of birth" });
    }

    const profilePicture = req.file?.path || req.body.profilePicture || null;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
  username,
  name,
  email,
  password: hashedPassword,
  gender,
  dob: formattedDob,
  profilePicture
});

return res.status(201).json({message: "user registerd successfully", newUser});

    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await User.findOne({ where: { email } });
    console.log(user);
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({token});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllProfile = async(req, res)=>{
  try{
      const user = await User.findAll();

      if(user){
        return res.status(201).json({message: "All users fetched successfully", user})
      }
  }
  catch(err){
    console.log(err);
    return res.status(500).json({message: "Internal server error"});

  }
}

export const getProfile = async (req, res) => {
  try {
    // const userId = req.user.id;

    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ profile: user });
  } catch (error) {
    console.error("Get profile error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const editProfile = async (req, res) => {
  try {
    const [updated] = await User.update(req.body, {
      where: { id: req.params.id },
    });

    if (!updated)
      return res
        .status(404)
        .json({ message: "User not found for their updation" });

    const updatedUser = await User.findByPk(req.params.id);
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.destroy({
      where: { id: req.params.id }
    });

    if (!deletedUser){
        return res.status(404).json({ message: 'User not found'});
    } 

    res.status(201).json({ message: 'User deleted successfully', deletedUser });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error"});
  }
};
