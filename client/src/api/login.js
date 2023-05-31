import { postHelper } from "../helpers/apiHelper";

export const loginUser = async (email, password) => {
  return await postHelper("/login", { email, password });
};
