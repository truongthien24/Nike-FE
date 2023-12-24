import apiService from "api";
import { useMutation } from "react-query";

const updateKichCo = async (params = {}) => {
  const kichCo = await apiService.kichCo.updateKichCo({
    ...params?.Data,
  });

  return kichCo;
};

const useUpdateKichCo = () => {
  return useMutation(updateKichCo, {
    onSuccess: (_, { onSuccess, status }) => {
      onSuccess(_);
    },
    onError: (error, { onError, context }) => {
      onError(error?.response?.data);
    },
  });
};

export default useUpdateKichCo;
