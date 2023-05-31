import { postHelper } from "../helpers/apiHelper";

export const registrateUser = async (name, email, password) => {
  return await postHelper("/registration", { name, email, password });
};
