import { useEffect, useState } from "react";
import { Product } from "./utils";

type PaginationProps = {
  generator: () => Promise<any[]>;
};

function usePagination<T>({ generator }: PaginationProps) {
  const [isFetching, setIsFetching] = useState(false);
  const [products, setProducts] = useState([] as T[]);
  const [isSuccess, setIsSuccess] = useState<undefined | boolean>(undefined);
  const [hasMore, setHasMore] = useState(true);
  const [loadMore, setLoadMore] = useState(true);
  useEffect(() => {
    setIsFetching(true);
    setIsSuccess(undefined);
    generator()
      .then((data) => {
        if (data.length == 0) {
          setHasMore(false);
        } else {
          setProducts([...products, ...data] as T[]);
        }
        setIsSuccess(true);
      })
      .catch((err) => {
        console.log(err);

        setIsSuccess(false);
      })
      .finally(() => {
        setIsFetching(false);
      });
  }, [loadMore]);

  return {
    products,
    isFetching,
    isSuccess,
    hasMore,
    loadMore: () => {
      setLoadMore((prev) => !prev);
    },
  };
}

export default usePagination;
