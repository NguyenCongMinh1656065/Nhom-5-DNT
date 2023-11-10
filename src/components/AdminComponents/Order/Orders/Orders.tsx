import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, parseISO, addDays, parse, subDays, subHours } from "date-fns";
import styles from "./order.module.css";
import OrderDetail from "../OrderDetail/OrderDetail";
import { CustomerOrder, mapStateToStatus } from "../../../../utilities/utils";
import { GET_ALL_ORDER } from "../../../../env";

type AllOrders = {
  id: string;
  state: string;
  quantity: number;
  totalamount: number;
  datecreated: string;
  deadline: string;
  username: string;
  receiveaddress: string;
  receivephonenumber: string;
  receivename: string;
};

function Orders() {
  const [orders, setOrders] = useState<CustomerOrder[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<CustomerOrder>(null!);
  useEffect(() => {
    fetch(GET_ALL_ORDER)
      .then(async (response) => {
        setOrders(await response.json());
      })
      .catch((err) => {
        console.log(err);
      });
  });
  return (
    <>
      <div
        className={`container ${styles["container-order"]} d-flex flex-column flex-grow-1`}
        style={{ overflowY: "auto" }}
      >
        <div className={`mt-3 ${styles["order-table"]}`}>
          <table className="table">
            <thead className="table-dark">
              <tr>
                <th>STT</th>
                <th>Code orders</th>
                <th>State</th>
                <th>Phone</th>
                <th>Ship fee</th>
                <th>Total amount</th>
                <th>#</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={order.id}>
                  <td>{index + 1}</td>
                  <td>{order.id}</td>
                  <td>{order.status}</td>
                  <td>{order.phoneNumber}</td>
                  <td>{order.finalPrice}</td>
                  <td>{order.deliveryPrice}</td>
                  <td>
                    <a
                      className="link-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdrop"
                      onClick={() => {
                        setSelectedOrder(order);
                      }}
                    >
                      Xem chi tiết
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div
          className="modal fade"
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex={-1}
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-scrollable modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">
                  Order Detail
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <OrderDetail order={selectedOrder} />
              </div>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </>
  );
}

export default Orders;
