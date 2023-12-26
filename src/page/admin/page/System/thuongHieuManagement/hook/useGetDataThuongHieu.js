import apiServices from "api";
import { useQuery } from "react-query";

const getApiData = async (pageIndex = 0, pageSize = 0) => {
  const params = {
    skip: pageIndex * pageSize,
    take: pageSize,
  };

  const thuongHieus = await apiServices.thuongHieu.getAllThuongHieu({
    ...params,
  });

  return thuongHieus;
};

const useGetDataThuongHieu = (pageIndex = 0, pageSize = 0) => {
  const query = useQuery(
    ["get-data-thuongHieu", pageIndex, pageSize],

    () => getApiData(pageIndex, pageSize),

    {
      keepPreviousData: true,
      retry: false,
    }
  );
  const {
    data: { data: { data: thuongHieuData = [] } = {} } = {},
    isLoading: isDataLoading,
    refetch: fetchData,
    isFetching,
  } = query;

  return { thuongHieuData, isDataLoading, fetchData, isFetching };
};

export default useGetDataThuongHieu;
