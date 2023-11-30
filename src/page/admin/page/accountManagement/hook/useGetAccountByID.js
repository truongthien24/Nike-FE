import apiService from "api";
import { useQuery } from "react-query";

const getAccount = async (params = {}) => {
  const accounts = await apiService.account.getAccountByID(
    params?.id,
  );

  return accounts;
};

const useGetAccountByID = (params = {}) => {
  const query = useQuery(
    ["find-data-product", params],

    () => getAccount(params),

    {
      keepPreviousData: true,
      retry: false,
    }
  );
  const {
    data: { data: { data: accountData = [] } = {} } = {},
    isLoading: isDataLoading,
    refetch: fetchData,
    isFetching,
  } = query;

  return { accountData, isDataLoading, fetchData, isFetching };
};

export default useGetAccountByID;
