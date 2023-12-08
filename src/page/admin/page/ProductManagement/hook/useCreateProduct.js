import apiService from "api";
import { useMutation } from "react-query";

const createProduct = async (params = {}) => {
  const accounts = await apiService.product.createProduct({
    ...params?.Data,
  });

  return accounts;
};

const useCreateProduct = () => {
  return useMutation(createProduct, {
    onSuccess: (_, { onSuccess, status }) => {
      onSuccess(_);
    },
    onError: (error, { onError, context }) => {
      onError(error?.response?.data);
    },
  });
};

export default useCreateProduct;
