import { getHelper } from "../helpers/apiHelper";

export const refresh = async (refreshTocken) => {
  const response = await getHelper("/refresh", { refreshTocken });
  return response;
};
