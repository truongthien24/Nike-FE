import _ from "lodash";
import { useState } from "react";

const useFilters = (defaultValues) => {
  const [filters, setFilters] = useState(_.pickBy(defaultValues));
  const [count, setCount] = useState(0);

  const onFilter = (values) => {
    const params = _.pickBy({
      ...values,
      count,
    });
    setFilters(params);
  };
  return {
    filters,
    onFilter,
    setCount,
    count,
  };
};

export default useFilters;
