import apiService from "api";
import { useMutation } from "react-query";

const deleteThuongHieu = async (params = {}) => {
  const thuongHieu = await apiService.thuongHieu.deleteThuongHieu({
    ...params?.Data,
  });

  return thuongHieu;
};

const useDeleteThuongHieu = () => {
  return useMutation(deleteThuongHieu, {
    onSuccess: (_, { onSuccess, status }) => {
      onSuccess(_);
    },
    onError: (error, { onError, context }) => {
      onError(error?.response?.data?.error);
    },
  });
};

export default useDeleteThuongHieu;
