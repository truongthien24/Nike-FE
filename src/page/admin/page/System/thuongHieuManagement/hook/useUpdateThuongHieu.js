import apiService from "api";
import { useMutation } from "react-query";

const updateThuongHieu = async (params = {}) => {
  const thuongHieu = await apiService.thuongHieu.updateThuongHieu({
    ...params?.Data,
  });

  return thuongHieu;
};

const useUpdateThuongHieu = () => {
  return useMutation(updateThuongHieu, {
    onSuccess: (_, { onSuccess, status }) => {
      onSuccess(_);
    },
    onError: (error, { onError, context }) => {
      onError(error?.response?.data);
    },
  });
};

export default useUpdateThuongHieu;
