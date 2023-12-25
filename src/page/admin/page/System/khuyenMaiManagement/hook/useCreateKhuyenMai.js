import apiService from "api";
import { useMutation } from "react-query";

const createKhuyenMai = async (params = {}) => {
  const khuyenMai = await apiService.khuyenMai.createKhuyenMai({
    ...params?.Data,
  });

  return khuyenMai;
};

const useCreateKhuyenMai = () => {
  return useMutation(createKhuyenMai, {
    onSuccess: (_, { onSuccess, status }) => {
      onSuccess(_);
    },
    onError: (error, { onError, context }) => {
      onError(error?.response?.data);
    },
  });
};

export default useCreateKhuyenMai;
