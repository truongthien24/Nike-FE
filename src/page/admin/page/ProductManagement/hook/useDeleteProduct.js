import apiService from "api";
import { useMutation } from "react-query";

const deleteProduct = async (params = {}) => {
  const accounts = await apiService.product.deleteProduct({
    ...params?.Data,
  });

  return accounts;
};

const useDeleteProduct = () => {
  return useMutation(deleteProduct, {
    onSuccess: (_, { onSuccess, status }) => {
      onSuccess(_);
    },
    onError: (error, { onError, context }) => {
      onError(error?.response?.data);
    },
  });
};

export default useDeleteProduct;
