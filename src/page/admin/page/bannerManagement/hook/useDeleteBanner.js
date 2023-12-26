import apiService from "api";
import { useMutation } from "react-query";

const deleteBanner = async (params = {}) => {
  const banner = await apiService.banner.deleteBanner({
    ...params?.Data,
  });

  return banner;
};

const useDeleteBanner = () => {
  return useMutation(deleteBanner, {
    onSuccess: (_, { onSuccess, status }) => {
      onSuccess(_);
    },
    onError: (error, { onError, context }) => {
      onError(error?.response?.data?.error);
    },
  });
};

export default useDeleteBanner;
