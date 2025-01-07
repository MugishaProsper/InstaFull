import { Speciality, User } from "../models/user.models.js";

export const addSpeciality = async (req, res) => {
  const { speciality } = req.body;
  const userId = req.user._id;
  try {
    const user = await User.findById(userId);
    if(!user){
      return res.status(404).json({ message : "user not found" });
    };
    const newSpeciality = new Speciality({ user: user._id, speciality : speciality });
    await newSpeciality.save();
    return res.status(200).json({ message : "Speciality added" });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message : "server error" });
  }
};
