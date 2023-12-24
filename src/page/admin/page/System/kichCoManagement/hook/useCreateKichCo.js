import apiService from "api";
import { useMutation } from "react-query";

const createKichCo = async (params = {}) => {
  const kichCo = await apiService.kichCo.createKichCo({
    ...params?.Data,
  });

  return kichCo;
};

const useCreateKichCo = () => {
  return useMutation(createKichCo, {
    onSuccess: (_, { onSuccess, status }) => {
      onSuccess(_);
    },
    onError: (error, { onError, context }) => {
      onError(error?.response?.data);
    },
  });
};

export default useCreateKichCo;
