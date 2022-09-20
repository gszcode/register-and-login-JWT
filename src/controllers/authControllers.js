import User from "../models/User.js";

// register user
export const register = async (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  console.log(req.body);

  try {
    let user = await User.findOne({ email });
    console.log("USERRRR", user);

    if (user) {
      return res.status(404).json({ message: "Email ya existente" });
    }

    user = new User({ first_name, last_name, email, password });
    await user.save();

    return res.json(user);
  } catch (error) {
    console.log(error);
  }
};
