import { toast } from "react-toastify";

export const handleErrors = (response: any) => {
  if (!response.ok) {
    toast(`An error with ${response.status} status occured`);
    return Promise.reject(response);
  }
  return response;
};
