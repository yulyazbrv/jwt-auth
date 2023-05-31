const jwt = require("jsonwebtoken");
const tokeModel = require("../models/tocken-model");
const tockenModel = require("../models/tocken-model");
require("dotenv").config();

class TockenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: "60m",
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "60d",
    });
    return {
      accessToken,
      refreshToken,
    };
  }

  async saveToken(userId, refreshTocken) {
    const tokenData = await tokeModel.findOne({ user: userId });
    if (tokenData) {
      tokenData.refreshTocken = refreshTocken;
      return tokenData.save();
    }
    const token = await tockenModel.create({ user: userId, refreshTocken });
    return token;
  }

  async removeToken(refreshToken) {
    const tokenData = await tokeModel.deleteOne({ refreshToken });
    return tokenData;
  }

  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      return userData;
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      return userData;
    } catch (e) {
      return null;
    }
  }
}

module.exports = new TockenService();
