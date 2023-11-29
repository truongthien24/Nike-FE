import apiServices from "api";
import { useQuery } from "react-query";

const getApiData = async (data) => {
  const params = data;

  const products = await apiServices.product.findProduct({
    ...params,
  });

  return products;
};

const useFindDataProduct = (data = {}) => {
  const query = useQuery(
    ["find-data-product", data],

    () => getApiData(data),

    {
      keepPreviousData: true,
      retry: false,
    }
  );
  const {
    data: { data: { data: productData = [] } = {} } = {},
    isLoading: isDataLoading,
    refetch: fetchData,
    isFetching,
  } = query;

  return { productData, isDataLoading, fetchData, isFetching };
};

export default useFindDataProduct;
