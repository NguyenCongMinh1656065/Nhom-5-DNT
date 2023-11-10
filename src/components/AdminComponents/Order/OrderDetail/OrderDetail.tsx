import React, { useEffect, useState } from "react";
import styles from "./OrderDetail.module.css";
import { CustomerOrder } from "../../../../utilities/utils";
import { ADMIN_CONFIRM, CANCEL_ORDER } from "../../../../env";
import { useNavigate } from "react-router";

type OrderDetailProps = {
  order: CustomerOrder | null;
};

type ProductInBill = {
  id: string;
  name: string;
  idproduct: string;
  quantity: number;
  price: number;
  imageurl: string;
  colorname: string;
  receiveaddress: string;
  receivephonenumber: string;
  receivename: string;
  fullname: string;
};

function OrderDetail({ order }: OrderDetailProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useNavigate();
  const [isUpdated, setIsUpdated] = useState<undefined | boolean>(undefined);
  return (
    <>
      <div className={`container ${styles["container"]} w-100`}>
        <div className={`gx-5 ${styles["info-receive"]}`}>
          <div className="">
            <div className="mt-3">
              <div className="d-flex flex-wrap">
                <h5 style={{ whiteSpace: "nowrap" }}>
                  #{order?.id}&nbsp;&nbsp;&nbsp;&nbsp;
                </h5>
                {order?.status}
              </div>
            </div>
            <div className="info-customer">
              <span>
                <h6>Người đặt: {order?.customerName}</h6>
                <h6>Người nhận: {order?.customerName}</h6>
                <h6>Địa chỉ: {order?.address}</h6>
                <h6>Số điện thoại: {order?.phoneNumber}</h6>
              </span>
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <div className="mt-3">
              <h5 className="text-center">Product in bill</h5>
              <div className={`${styles["cart-product"]}`}>
                {order?.products.map((product) => (
                  <div className={`${styles["cart"]}`} key={product.id}>
                    <img
                      src={product.productImage}
                      className="card-img-top"
                      alt={product.productName}
                    />
                    <div className={`${styles["information"]}`}>
                      <h5>{product.productName}</h5>
                      <p>Quantity: {product.quantity}</p>
                      <p>Price: {product.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <hr />
          {isUpdated == true && (
            <div className={`${styles["text-group"]}`}>
              <div className="alert alert-success">Updated</div>
            </div>
          )}{" "}
          {isUpdated == false && (
            <div className={`${styles["text-group"]}`}>
              <div className="alert alert-danger">Error</div>
            </div>
          )}
          {isUpdating ? (
            <div
              className="spinner-border text-danger spinnner-sm"
              role="status"
            ></div>
          ) : (
            <div className="d-flex justify-content-center gap-3">
              {order?.status == "Chờ xác nhận" && (
                <>
                  <button
                    onClick={() => {
                      if (order) {
                        remove(order)
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
                      }
                    }}
                    className="btn btn-danger"
                  >
                    Remove
                  </button>
                  <button
                    onClick={(e) => {
                      if (order) {
                        accept(order)
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
                      }
                    }}
                    className="btn btn-primary"
                  >
                    Accept
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function remove(order: CustomerOrder) {
  return fetch(CANCEL_ORDER + order.id, {
    method: "POST",
  });
}

function accept(order: CustomerOrder) {
  return fetch(ADMIN_CONFIRM + order.id, {
    method: "POST",
  });
}

//comment
export default OrderDetail;
