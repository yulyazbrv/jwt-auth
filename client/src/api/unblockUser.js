import { putHelper } from "../helpers/apiHelper";

export const unblockUser = async ( email) => {
  const response = await putHelper("/unblock", { email });
  return response;
};