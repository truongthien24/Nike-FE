import apiServices from "api";
import { useQuery } from "react-query";

const getApiData = async (pageIndex = 0, pageSize = 0, data) => {
  const params = {
    skip: pageIndex * pageSize,
    take: pageSize,
    data,
  };

  const kichCo = await apiServices.ngonNgu.getNgonNguByID({
    ...params,
  });

  return kichCo;
};

const useGetDetailKichCo = (pageIndex = 0, pageSize = 0, data) => {
  const query = useQuery(
    ["get-data-kichCo", pageIndex, pageSize, data],

    () => getApiData(pageIndex, pageSize, data),

    {
      keepPreviousData: true,
      retry: false,
    }
  );
  const {
    data: { data: { data: kichCoDataDetail = [] } = {} } = {},
    isLoading: isDataDetailLoading,
    refetch: fetchData,
    isFetching,
  } = query;

  return { kichCoDataDetail, isDataDetailLoading, fetchData, isFetching };
};

export default useGetDetailKichCo;
