import apiServices from "api";
import { useQuery } from "react-query";

const getApiData = async (pageIndex = 0, pageSize = 0, data) => {
  const params = {
    skip: pageIndex * pageSize,
    take: pageSize,
    data,
  };

  const thuongHieu = await apiServices.thuongHieu.getThuongHieuByID({
    ...params,
  });

  return thuongHieu;
};

const useGetDetailThuongHieu = (pageIndex = 0, pageSize = 0, data) => {
  const query = useQuery(
    ["get-data-ThuongHieu", pageIndex, pageSize, data],

    () => getApiData(pageIndex, pageSize, data),

    {
      keepPreviousData: true,
      retry: false,
    }
  );
  const {
    data: { data: { data: thuongHieuDataDetail = [] } = {} } = {},
    isLoading: isDataDetailLoading,
    refetch: fetchData,
    isFetching,
  } = query;

  return { thuongHieuDataDetail, isDataDetailLoading, fetchData, isFetching };
};

export default useGetDetailThuongHieu;
