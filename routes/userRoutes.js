import express from "express";
import jwt from "../middleware/auth.js"
import upload from '../middleware/upload.js';
import {register, login, getAllProfile, getProfile, editProfile, deleteUser} from "../controller/userController.js"

// const router = express.Router();
import { Router } from 'express'; // This works too, but use this if you prefer:
const router = Router();
// router.get('/books', books); 
router.post("/register", upload.single("profilePicture"), register); 
router.post('/login', login);
router.get('/getAllProfile', jwt, getAllProfile);
router.get('/profile/:id', jwt, getProfile);
router.put('/editProfile/:id', jwt, editProfile);
router.delete('/deleteUserByid/:id', jwt, deleteUser);



export default router;