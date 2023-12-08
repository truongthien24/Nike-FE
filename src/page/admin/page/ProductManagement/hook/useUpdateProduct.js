import apiService from "api";
import { useMutation } from "react-query";

const updateProduct = async (params = {}) => {
  const products = await apiService.product.updateProduct({
    ...params?.Data,
  });

  return products;
};

const useUpdateProduct = () => {
  return useMutation(updateProduct, {
    onSuccess: (_, { onSuccess, status }) => {
      onSuccess(_);
    },
    onError: (error, { onError, context }) => {
      onError(error?.response?.data);
    },
  });
};

export default useUpdateProduct;
