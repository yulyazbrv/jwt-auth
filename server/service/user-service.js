const UserModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const tokenService = require("./tocken-service");
const tockenService = require("./tocken-service");
const UserDto = require("../dtos/user-dto");
const tokenModel = require("../models/tocken-model");
class UserService {
  async registration(name, email, password) {
    const candidate = await UserModel.findOne({ email });
    if (candidate) {
      throw new Error(`Пользователь с ${email} уже есть в базе`);
    }
    const hashPassword = await bcrypt.hash(password, 3);
    const registrationDate = new Date();
    const user = await UserModel.create({
      name,
      email,
      password: hashPassword,
      registrationDate: registrationDate.toLocaleString(),
      status: "unblocked",
    });
    const userDto = new UserDto(user); //lдля генерации пэйлоэд(откинули ненужные поля чтобы защифровать 2 блок jwt)
    const tokens = tockenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async login(email, password) {
    const candidate = await UserModel.findOne({ email });
    if (!candidate) {
      throw new Error(`Пользователь с ${email} не зарегистрирован`);
    }
    const isPasswordEquals = await bcrypt.compare(password, candidate.password);
    if (!isPasswordEquals) {
      throw new Error(`Неверный пароль`);
    }
    const loginTime = new Date();
    const filter = { email: candidate.email };
    const updateDoc = {
      $set: {
        lastLogin: loginTime.toLocaleString(),
      },
    };
    const options = { upsert: true };
    const result = await UserModel.updateOne(filter, updateDoc, options);
    const userDto = new UserDto(candidate);
    const tokens = tockenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, candidate: userDto };
  }

  async logout(refreshToken) {
    const token = await tockenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw new Error("Token Error");
    }

    const tokenFromDb = tokenModel.findOne({ refreshToken });
    const userData = tokenService.validateRefreshToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw new Error("Token Error");
    } else {
      const user = await UserModel.findById(userData.id);
      const userDto = new UserDto(user);
      const tokens = tokenService.generateTokens({ ...userDto });
      await tokenService.saveToken(userDto.id, tokens.refreshToken);
      return { ...tokens, user: userDto };
    }
  }

  async getAllUsers() {
    const users = await UserModel.find();
    return users;
  }

  async removeUser(email) {
    const candidate = await UserModel.findOne({ email });
    if (!candidate) {
      throw new Error(`Пользователь с ${email} не существует`);
    }

    const deletedUser = await UserModel.deleteOne({ email: candidate.email })
      .then(() => {
        console.log("Пользователь успешно удален");
        return deletedUser;
      })
      .catch((err) => {
        console.error(err);
      });
  }

  async blockUser(email) {
    const candidate = await UserModel.findOne({ email });
    if (!candidate) {
      throw new Error(`Пользователь с ${email} не существует`);
    }

    const filter = { email: candidate.email };
    const updateDoc = {
      $set: {
        status: "blocked",
      },
    };
    const options = { upsert: true };
    const blockedUser = await UserModel.updateOne(filter, updateDoc, options);
    const token = await tokenModel.deleteOne({ user: candidate._id });
    return { token, blockedUser };
  }

  async unblockUser(email) {
    const candidate = await UserModel.findOne({ email });
    if (!candidate) {
      throw new Error(`Пользователь с ${email} не существует`);
    }

    const filter = { email: candidate.email };
    const updateDoc = {
      $set: {
        status: "unblocked",
      },
    };
    const options = { upsert: true };
    const unblockedUser = await UserModel.updateOne(filter, updateDoc, options);
    return unblockedUser;
  }
}

module.exports = new UserService();
