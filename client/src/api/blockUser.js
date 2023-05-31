import { putHelper } from "../helpers/apiHelper";

export const blockUser = async ( email) => {
  const response = await putHelper("/block", { email });
  return response;
};