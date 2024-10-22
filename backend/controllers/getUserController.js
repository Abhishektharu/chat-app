// to handle list the users for side bar
import User from "../models/model.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    //get current logged in user
    const loggedInUserId = req.user._id;

    //to filter out all the users except logged in user
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error in getUsersForSidebar: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
