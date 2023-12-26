import apiService from "api";
import { useMutation } from "react-query";

const createBanner = async (params = {}) => {
  const banner = await apiService.banner.createBanner({
    ...params?.Data,
  });

  return banner;
};

const useCreateBanner = () => {
  return useMutation(createBanner, {
    onSuccess: (_, { onSuccess, status }) => {
      onSuccess(_);
    },
    onError: (error, { onError, context }) => {
      onError(error?.response?.data);
    },
  });
};

export default useCreateBanner;
