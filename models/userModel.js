import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const User = sequelize.define("userTable", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  gender: DataTypes.STRING,
  dob: DataTypes.DATE,
  profilePicture: DataTypes.STRING,
}, {timestamps: false});


export default User;

