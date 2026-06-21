import mongoose from "mongoose"
import User from "../models/User.js"

export const getUser = async (req, res)=>{
 try {
   const user = await User.findById(req.params.id)
   if(!user) res.json({message: "user not found"});
   res.status(200).json(user);
 } catch (error) {
  res.status(500).json({message : "Internal server error"})
  console.log("Error at getUser controller", error)
 }
}
export const getAllUser = async (req, res)=>{
 try {
   const users = await User.find()
   if(!users) res.json({message: "users not found"});
   res.status(200).json(users);
 } catch (error) {
  res.status(500).json({message : "Internal server error"})
  console.log("Error at getAllUser controller", error)
 }
}
export const createUser = async (req, res)=>{
 try {
   const {name, alias, email} = req.body
   const user = new User({name, alias, email})
   const savedUser = await user.save();
   res.status(201).json(savedUser);
   console.log("User created successfully !")
 } catch (error) {
  res.status(500).json({message : "Internal server error"})
  console.log("Error at createUser controller", error)
 }
}
export const updateUser = async (req, res)=>{
 try {
   const {name, alias, email} = req.body
   const id = req.params.id;
   const updatedUser = await User.findByIdAndUpdate(id, {name, alias, email});

   if(!updatedUser) return res.json({message: "user not found"});
   res.status(200).json({message: "User updated successfully !"});
 } catch (error) {
  res.status(500).json({message : "Internal server error"})
  console.log("Error at update controller", error);
 }
}

export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deleteUser) return res.json({ message: "user not found" });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error at deleteUser controllers ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};