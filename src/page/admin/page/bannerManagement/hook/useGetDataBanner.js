import apiServices from "api";
import { useQuery } from "react-query";

const getApiData = async (pageIndex = 0, pageSize = 0) => {
  const params = {
    skip: pageIndex * pageSize,
    take: pageSize,
  };

  const banners = await apiServices.banner.getAllBanner({
    ...params,
  });

  return banners;
};

const useGetDataBanner = (pageIndex = 0, pageSize = 0) => {
  const query = useQuery(
    ["get-data-banner", pageIndex, pageSize],

    () => getApiData(pageIndex, pageSize),

    {
      keepPreviousData: true,
      retry: false,
    }
  );
  const {
    data: { data: { data: bannerData = [] } = {} } = {},
    isLoading: isDataLoading,
    refetch: fetchData,
    isFetching,
  } = query;

  return { bannerData, isDataLoading, fetchData, isFetching };
};

export default useGetDataBanner;
