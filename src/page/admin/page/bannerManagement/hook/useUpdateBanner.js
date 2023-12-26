import apiService from "api";
import { useMutation } from "react-query";

const updateBanner = async (params = {}) => {
  const banner = await apiService.banner.updateBanner({
    ...params?.Data,
  });

  return banner;
};

const useUpdateBanner = () => {
  return useMutation(updateBanner, {
    onSuccess: (_, { onSuccess, status }) => {
      onSuccess(_);
    },
    onError: (error, { onError, context }) => {
      onError(error?.response?.data);
    },
  });
};

export default useUpdateBanner;
