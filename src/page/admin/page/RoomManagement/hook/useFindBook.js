import apiServices from "api";
import { useQuery } from "react-query";

const getApiData = async (
  data,
) => {

  const params = data;

  const sachs = await apiServices.book.findSach({
    ...params,
  });

  return sachs;
};

const useFindDataBook = (
  data = {}
) => {
  const query = useQuery(
    [
      "find-data-book",
      data
    ],

    () =>
      getApiData(
        data
      ),

    {
      keepPreviousData: true,
      retry: false,
    }
  );
  const {
    data: { data: { data: sachData = [] } = {} } = {},
    isLoading: isDataLoading,
    refetch: fetchData,
    isFetching,
  } = query;

  return { sachData, isDataLoading, fetchData, isFetching };
};

export default useFindDataBook;
