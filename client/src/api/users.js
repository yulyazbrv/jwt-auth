import { getHelper } from "../helpers/apiHelper";

export const getUsers = async () => {
  const response = await getHelper("/users");
  return response;
};
