import apiServices from "api";
import { useQuery } from "react-query";

const getApiData = async (pageIndex = 0, pageSize = 0) => {
  const params = {
    skip: pageIndex * pageSize,
    take: pageSize,
  };

  const products = await apiServices.product.getAllProduct({
    ...params,
  });

  return products;
};

const useGetDataProduct = (pageIndex = 0, pageSize = 0) => {
  const query = useQuery(
    ["get-data-product", pageIndex, pageSize],

    () => getApiData(pageIndex, pageSize),

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

export default useGetDataProduct;
