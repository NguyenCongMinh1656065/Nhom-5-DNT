import { useEffect, useState, useDeferredValue } from "react";
import { Product, toMoney } from "../../../../utilities/utils";
import style from "./product.module.css";
import LoadingView from "../../../LoadingView/LoadingView";
import { useLocation, useNavigate } from "react-router";
import usePagination from "../../../../utilities/pagination";
import React from "react";
import { BACKEND_URL, GET_ALL_PRODUCT } from "../../../../env";
import AddProduct from "../AddProduct/AddProduct";
function Products() {
  const [novalueFound, setNovalueFound] = useState(false);
  const redirect = useNavigate();
  const [currPage, setCurrPage] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  useEffect(() => {
    setIsFetching(true);
    fetch(GET_ALL_PRODUCT)
      .then(async (response) => {
        const data = await response.json();
        console.log(data);

        setProducts(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsFetching(false);
      });

    document.title = "Products";
  }, []);

  return !isAdd ? (
    <div className={`container ${style.container} d-flex flex-column`}>
      <div className="container row mt-3 mb-3 gap-3 text-white d-flex align-items-center justify-content-between"></div>
      <>
        <div className="flex-grow-1">
          <div className={`flex-grow-1 flex-column `}>
            {products.map((product, index) => {
              return (
                <div
                  key={index}
                  className={`${style.card} d-flex flex-row mt-3`}
                  onClick={() => {
                    redirect("/products/" + product.id);
                  }}
                >
                  <div>
                    <img
                      src={product.productImage}
                      alt=""
                      className={`${style.img}`}
                    />
                  </div>
                  <div className="flex-1 p-3">
                    <p className={`${style.title}`}>{product.productName}</p>
                    <p>Price : {product.price}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="d-flex justify-content-between w-100">
            <button
              className="btn btn-success mt-3"
              onClick={(e) => {
                setIsAdd(true);
              }}
            >
              Add +
            </button>
          </div>
          <div className="m-5">{isFetching && <LoadingView />}</div>
        </div>
      </>
    </div>
  ) : (
    <AddProduct
      back={() => {
        setIsAdd(false);
      }}
    />
  );
}

export default React.memo(Products);
