import { useMutation } from "react-query";
import apiService from "../../../../../api";

const registerAccount = async (params = {}) => {
  const accounts = await apiService.account.registerAccount({
    ...params?.Data,
  });

  return accounts;
};

const useRegister = () => {
  return useMutation(registerAccount, {
    onSuccess: (_, { onSuccess, status }) => {
      onSuccess(_);
    },
    onError: (error, { onError, context }) => {
      onError(error?.response?.data);
    },
  });
};

export default useRegister;
