import {  DataTypes } from "sequelize";
import sequelize from "../config/db.js";


const Book = sequelize.define("books", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  release_date: {
    type: DataTypes.DATEONLY,
  },
  subject: {
    type: DataTypes.INTEGER,
  },
});

// sequelize
//   .sync()
//   .then(() => {
//     console.log("Book table created successfully!");
//   })
//   .catch((error) => {
//     console.error("Unable to create table : ", error);
//   });


export default Book;
