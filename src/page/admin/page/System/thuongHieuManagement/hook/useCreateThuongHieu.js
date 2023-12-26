import apiService from "api";
import { useMutation } from "react-query";

const createThuongHieu = async (params = {}) => {
  const thuongHieu = await apiService.thuongHieu.createThuongHieu({
    ...params?.Data,
  });

  return thuongHieu;
};

const useCreateThuongHieu = () => {
  return useMutation(createThuongHieu, {
    onSuccess: (_, { onSuccess, status }) => {
      onSuccess(_);
    },
    onError: (error, { onError, context }) => {
      onError(error?.response?.data);
    },
  });
};

export default useCreateThuongHieu;
