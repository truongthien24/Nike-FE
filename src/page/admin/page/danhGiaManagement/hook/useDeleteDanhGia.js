import apiService from "api";
import { useMutation } from "react-query";

const deleteKichCo = async (params = {}) => {
  const kichCo = await apiService.kichCo.deleteKichCo({
    ...params?.Data,
  });

  return kichCo;
};

const useDeleteKichCo = () => {
  return useMutation(deleteKichCo, {
    onSuccess: (_, { onSuccess, status }) => {
      onSuccess(_);
    },
    onError: (error, { onError, context }) => {
      onError(error?.response?.data?.error);
    },
  });
};

export default useDeleteKichCo;
