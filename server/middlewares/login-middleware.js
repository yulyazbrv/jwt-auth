const UserModel = require("../models/user-model");

module.exports = async function (req, res, next) {
  try {
    const {email} = req.body;
    const candidate = await UserModel.findOne({ email });
    if (!candidate) {
      throw new Error(`Пользователь с ${email} не существует`);
    }
    const userStatus = candidate.status;
    if (userStatus === "blocked") {
      throw new Error("Unauthorization Error. You are blocked");
    }

    next()
  } catch (e) {
    return next(e);
  }
};
