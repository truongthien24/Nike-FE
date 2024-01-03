import apiService from "api";
import { useMutation, useQuery } from "react-query";

const getAccount = async (params = {}) => {
  const accounts = await apiService.account.changePassword({
    ...params?.Data,
  });

  return accounts;
};

const useChangePassword = () => {
  return useMutation(getAccount, {
    onSuccess: (_, { onSuccess, status }) => {
      onSuccess(_);
    },
    onError: (error, { onError, context }) => {
      onError(error?.response?.data);
    },
  });
};

export default useChangePassword;
