import apiService from "api";
import { useMutation } from "react-query";

const updateAccount = async (params = {}) => {
  const accounts = await apiService.account.updateAccount({
    ...params?.Data,
  });

  return accounts;
};

const useUpdateAccount = () => {
  return useMutation(updateAccount, {
    onSuccess: (_, { onSuccess, status }) => {
      onSuccess(_);
    },
    onError: (error, { onError, context }) => {
      onError(error?.response?.data);
    },
  });
};

export default useUpdateAccount;
