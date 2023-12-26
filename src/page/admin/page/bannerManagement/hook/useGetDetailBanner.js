import apiServices from "api";
import { useQuery } from "react-query";

const getApiData = async (pageIndex = 0, pageSize = 0, data) => {
  const params = {
    skip: pageIndex * pageSize,
    take: pageSize,
    data,
  };

  const banner = await apiServices.banner.getBannerByID({
    ...params,
  });

  return banner;
};

const useGetDetailBanner = (pageIndex = 0, pageSize = 0, data) => {
  const query = useQuery(
    ["get-data-banner", pageIndex, pageSize, data],

    () => getApiData(pageIndex, pageSize, data),

    {
      keepPreviousData: true,
      retry: false,
    }
  );
  const {
    data: { data: { data: bannerDataDetail = [] } = {} } = {},
    isLoading: isDataDetailLoading,
    refetch: fetchData,
    isFetching,
  } = query;

  return { bannerDataDetail, isDataDetailLoading, fetchData, isFetching };
};

export default useGetDetailBanner;
