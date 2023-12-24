import apiService from "api";
import { useMutation } from "react-query";

const createChiTietGioHang = async (params = {}) => {
  const gioHang = await apiService.gioHang.createChiTietGioHang({
    ...params?.Data,
  });

  return gioHang;
};

const useCreateChiTietGioHang = () => {
  return useMutation(createChiTietGioHang, {
    onSuccess: (_, { onSuccess, status }) => {
      onSuccess(_);
    },
    onError: (error, { onError, context }) => {
      onError(error?.response?.data);
    },
  });
};

export default useCreateChiTietGioHang;
