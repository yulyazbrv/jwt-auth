import { deleteHelper } from "../helpers/apiHelper";

export const deleteUser = async (email) => {
  const response = await deleteHelper("/deleteUser", { email });
  return response;
};
