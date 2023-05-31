import { postHelper } from "../helpers/apiHelper";

export const logoutUser = async () => {
  return await postHelper("/logout");
};
