import { ReactNode, useEffect, useRef, useState } from "react";
import style from "./addproduct.module.css";
import { useNavigate, useParams } from "react-router";
import { Product } from "../../../../utilities/utils";
import Editable from "../../../Editable/Editable";
import { CREATE_PRODUCT } from "../../../../env";
import Carousel from "../../../Carousel/Carousel";
import LabeledInput from "../../../ValidInput/LabeledInput";

function AddProduct({ back }: { back: () => void }) {
  const params = useParams();
  const [product, setProduct] = useState<Product>({
    brand: "",
    category: -1,
    id: -1,
    price: 0,
    productDescription: "",
    productImage: "",
    productName: "",
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useNavigate();
  const [isUpdated, setIsUpdated] = useState<undefined | boolean>(undefined);
  return (
    <>
      <div className={`${style.container}`}>
        <div
          className={`d-flex justify-content-between align-items-center gap-3 ${style.card}`}
        >
          <div className="d-flex justify-content-center align-items-center">
            <div className={`${style.carousel}`}>
              <Carousel
                imgUrls={[
                  product?.productImage ||
                    "https://th.bing.com/th/id/OIP.qeJOG5X6Q6P5OqOqgxWpiAHaEq?pid=ImgDet&rs=1",
                ]}
              />
            </div>
          </div>
          <div className="flex-grow-1 w-100">
            <div>
              <div className={`${style["text-group"]}`}>
                <LabeledInput
                  type="text"
                  initialValue={product.productName}
                  callBack={(e) => {
                    setProduct({
                      ...product,
                      productName: e,
                    });
                  }}
                  placeholder="Product Name"
                  identifier="pname"
                />
              </div>
              <div className={`${style["text-group"]}`}>
                <LabeledInput
                  type="text"
                  initialValue={product.productImage}
                  callBack={(e) => {
                    setProduct({
                      ...product,
                      productImage: e,
                    });
                  }}
                  placeholder="Product Image"
                  identifier="pimg"
                />
              </div>
              <div className={`${style["text-group"]}`}>
                <LabeledInput
                  type="text"
                  initialValue={product.price + ""}
                  callBack={(e) => {
                    if (Number.isInteger(e)) {
                      setProduct({
                        ...product,
                        price: Number(e),
                      });
                    }
                  }}
                  placeholder="Price"
                  identifier="pprice"
                />
              </div>
              <div className={`${style["text-group"]}`}>
                <LabeledInput
                  type="text"
                  initialValue={product.productDescription + ""}
                  callBack={(e) => {
                    setProduct({
                      ...product,
                      productDescription: e,
                    });
                  }}
                  placeholder="Description"
                  identifier="pdescription"
                />
              </div>
              <div className={`${style["text-group"]}`}>
                <LabeledInput
                  type="number"
                  initialValue={product.category + ""}
                  callBack={(e) => {
                    setProduct({
                      ...product,
                      category: Number(e),
                    });
                  }}
                  placeholder="Category"
                  identifier="pcategories"
                />
              </div>
              <div className={`${style["text-group"]}`}>
                <LabeledInput
                  type="text"
                  initialValue={product.brand + ""}
                  callBack={(e) => {
                    setProduct({
                      ...product,
                      brand: e,
                    });
                  }}
                  placeholder="Brand"
                  identifier="pbrand"
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
                  <button
                    onClick={(e) => {
                      setIsUpdating(true);
                      addNew(product)
                        .then((res) => {
                          console.log("ok");
                          if (res.ok) {
                            setIsUpdated(true);
                            back();
                            window.location.reload();
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
                    className="btn btn-sm btn-danger"
                  >
                    Save changes
                  </button>
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
                back();
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

function addNew(product: Product) {
  const data = new FormData();
  for (const key in product) {
    const x = key as keyof Product;
    data.append(key, product[x] + "");
  }
  return fetch(CREATE_PRODUCT, {
    method: "POST",
    body: data,
  });
}

export default AddProduct;
