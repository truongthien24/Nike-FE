import apiServices from "api";
import { useQuery } from "react-query";

const getApiData = async (pageIndex = 0, pageSize = 0) => {
  const params = {
    skip: pageIndex * pageSize,
    take: pageSize,
  };

  const kichCos = await apiServices.kichCo.getAllKichCo({
    ...params,
  });

  return kichCos;
};

const useGetDataKichCo = (pageIndex = 0, pageSize = 0) => {
  const query = useQuery(
    ["get-data-kichCo", pageIndex, pageSize],

    () => getApiData(pageIndex, pageSize),

    {
      keepPreviousData: true,
      retry: false,
    }
  );
  const {
    data: { data: { data: kichCoData = [] } = {} } = {},
    isLoading: isDataLoading,
    refetch: fetchData,
    isFetching,
  } = query;

  return { kichCoData, isDataLoading, fetchData, isFetching };
};

export default useGetDataKichCo;
