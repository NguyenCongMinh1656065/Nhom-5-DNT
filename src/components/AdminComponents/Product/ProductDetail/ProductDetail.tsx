import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Product } from "../../../../utilities/utils";
import style from "./productdetail.module.css";
import Carousel from "../../../Carousel/Carousel";
import LoadingView from "../../../LoadingView/LoadingView";
import ValidInput from "../../../ValidInput/ValidInput";
import Editable from "../../../Editable/Editable";
import AddProduct from "../AddProduct/AddProduct";
import {
  DELETE_ITEM,
  DELETE_PRODUCT,
  GET_PRODUCT_BY_ID,
  UPDATE_PRODUCT,
} from "../../../../env";

function ProductDetail() {
  const params = useParams();
  const [product, setProduct] = useState<Product>(null!);
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useNavigate();
  const [isUpdated, setIsUpdated] = useState<undefined | boolean>(undefined);
  /// state:
  useEffect(() => {
    fetch(GET_PRODUCT_BY_ID + params.id)
      .then(async (response) => {
        setProduct(await response.json());
      })
      .catch((err) => {
        console.log(err);
      });
  }, [params.id]);

  return !product ? (
    <LoadingView />
  ) : (
    <>
      <div className={`${style.container}`}>
        <div
          className={`d-flex justify-content-between align-items-center gap-3 ${style.card}`}
        >
          <div className="d-flex justify-content-center align-items-center">
            <div className={`${style.carousel}`}>
              <Carousel imgUrls={[product?.productImage || ""]} />
            </div>
          </div>
          <div className="flex-grow-1 w-100">
            <div>
              <div className={`${style["text-group"]}`}>
                <label htmlFor="">ID</label>
                <Editable canEdit={false} type="text" value={product.id + ""} />
              </div>
              <div className={`${style["text-group"]}`}>
                <label htmlFor="">Name</label>
                <Editable
                  canEdit={true}
                  type="text"
                  value={product.productName}
                  onChange={(e) => {
                    setProduct({
                      ...product,
                      productName: e,
                    });
                  }}
                />
              </div>
              <div className={`${style["text-group"]}`}>
                <label htmlFor="">Image</label>
                <Editable
                  canEdit={true}
                  type="text"
                  value={product.productImage}
                  onChange={(e) => {
                    setProduct({
                      ...product,
                      productImage: e,
                    });
                  }}
                />
              </div>
              <div className={`${style["text-group"]}`}>
                <label htmlFor="">Price</label>
                <Editable
                  canEdit={true}
                  type="number"
                  value={product.price + ""}
                  onChange={(e) => {
                    setProduct({
                      ...product,
                      price: Number(e),
                    });
                  }}
                />
              </div>
              <div className={`${style["text-group"]}`}>
                <label htmlFor="">Category</label>
                <Editable
                  canEdit={true}
                  type="text"
                  value={product.category + ""}
                  onChange={(e) => {
                    setProduct({
                      ...product,
                      category: Number(e),
                    });
                  }}
                />
              </div>
              <div className={`${style["text-group"]}`}>
                <label htmlFor="">Description</label>
                <Editable
                  canEdit={true}
                  type="text"
                  value={product.productDescription + ""}
                  onChange={(e) => {
                    setProduct({
                      ...product,
                      productDescription: e,
                    });
                  }}
                />
              </div>
              <div className={`${style["text-group"]}`}>
                <label htmlFor="">Brand</label>
                <Editable
                  canEdit={true}
                  type="text"
                  value={product.brand + ""}
                  onChange={(e) => {
                    setProduct({
                      ...product,
                      brand: e,
                    });
                  }}
                />
              </div>
              {isUpdated == true && (
                <div className={`${style["text-group"]}`}>
                  <div className="alert alert-success">Updated</div>
                </div>
              )}{" "}
              {isUpdated == false && (
                <div className={`${style["text-group"]}`}>
                  <div className="alert alert-danger">Error</div>
                </div>
              )}
              <div className={`${style["text-group"]} text-end`}>
                {isUpdating ? (
                  <div
                    className="spinner-border text-danger spinnner-sm"
                    role="status"
                  ></div>
                ) : (
                  <>
                    <button
                      className="btn btn-danger btn-sm"
                      style={{ marginRight: "5px" }}
                      onClick={(e) => {
                        setIsUpdating(true);
                        deleteProduct(product)
                          .then((res) => {
                            console.log("ok");
                            if (res.ok) {
                              setIsUpdated(true);
                              router("/products");
                            } else {
                              setIsUpdated(false);
                            }
                          })
                          .catch((err) => {
                            console.log(err);
                            setIsUpdated(false);
                          })
                          .finally(() => {
                            setIsUpdating(false);
                            setTimeout(() => {
                              setIsUpdated(undefined);
                            }, 2000);
                          });
                      }}
                    >
                      Delete
                    </button>
                    <button
                      onClick={(e) => {
                        setIsUpdating(true);
                        saveChanges(product)
                          .then((res) => {
                            console.log("ok");
                            if (res.ok) {
                              setIsUpdated(true);
                            } else {
                              setIsUpdated(false);
                            }
                          })
                          .catch((err) => {
                            console.log(err);
                            setIsUpdated(false);
                          })
                          .finally(() => {
                            setIsUpdating(false);
                            setTimeout(() => {
                              setIsUpdated(undefined);
                            }, 2000);
                          });
                      }}
                      className="btn btn-sm btn-primary"
                    >
                      Save changes
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <div>
          <hr />
          <div>
            <button
              className="btn btn-primary"
              onClick={() => {
                router("/products");
              }}
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function saveChanges(product: Product) {
  const data = new FormData();
  for (const key in product) {
    const x = key as keyof Product;
    data.append(key, product[x] + "");
  }
  return fetch(UPDATE_PRODUCT, {
    method: "PUT",
    body: data,
  });
}

function deleteProduct(product: Product) {
  return fetch(DELETE_PRODUCT + product.id, { method: "DELETE" });
}

export default ProductDetail;
