const userService = require("../service/user-service");

class UserController {
  async registration(req, res, next) {
    try {
      const { name, email, password } = req.body;
      const userData = await userService.registration(name, email, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await userService.login(email, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await userService.logout(refreshToken);
      res.clearCookie("refreshToken");
      return res.json(refreshToken);
    } catch (e) {
      next(e);
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await userService.refresh(refreshToken);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async getUsers(req, res, next) {
    try {
      const users = await userService.getAllUsers();
      return res.json(users);
    } catch (e) {
      next(e);
    }
  }

  async removeUser(req, res, next) {
    try {
      const { email } = req.body;
      const user = await userService.removeUser(email);
      return res.json(user);
    } catch (e) {
      next(e);
    }
  }

  async blockUser(req, res, next) {
    try {
      const { email } = req.body;
      const user = await userService.blockUser(email);
      return res.json(user);
    } catch (e) {
      next(e);
    }
  }

  async unblockUser(req, res, next) {
    try {
      const { email } = req.body;
      const user = await userService.unblockUser(email);
      return res.json(user);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new UserController();
