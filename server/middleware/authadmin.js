const Users = require("../models/userModels");
const authadmin = async (req, res, next) => {
  try {
    const user = await Users.findById({ _id: req.user.id });
    if (user.role == 0) {
      return res.status(400).json({ msg: "admin resoure acess denied" });
    }
    next();
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
module.exports = authadmin;
