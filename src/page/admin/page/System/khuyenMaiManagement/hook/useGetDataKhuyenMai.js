import apiServices from "api";
import { useQuery } from "react-query";

const getApiData = async (pageIndex = 0, pageSize = 0) => {
  const params = {
    skip: pageIndex * pageSize,
    take: pageSize,
  };

  const khuyenMais = await apiServices.khuyenMai.getAllKhuyenMai({
    ...params,
  });

  return khuyenMais;
};

const useGetDataKhuyenMai = (pageIndex = 0, pageSize = 0) => {
  const query = useQuery(
    ["get-data-KhuyenMai", pageIndex, pageSize],

    () => getApiData(pageIndex, pageSize),

    {
      keepPreviousData: true,
      retry: false,
    }
  );
  const {
    data: { data: { data: khuyenMaiData = [] } = {} } = {},
    isLoading: isDataLoading,
    refetch: fetchData,
    isFetching,
  } = query;

  return { khuyenMaiData, isDataLoading, fetchData, isFetching };
};

export default useGetDataKhuyenMai;
