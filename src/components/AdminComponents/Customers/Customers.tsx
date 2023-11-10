import React, { useEffect, useState } from "react";
import styles from "./customer.module.css";
import { GET_ALL_USER } from "../../../env";

export type Customer = {
  id: number;
  userName: string;
  fullName: string;
  password: string;
  email: string;
  phone: string;
  userType: number;
  totalPrice: number;
  rank: number;
};

function Customers() {
  const [customers, setCustomers] = useState<Customer[]>();
  const fetchCustomers = async () => {
    fetch(GET_ALL_USER)
      .then(async (response) => {
        setCustomers(await response.json());
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <>
      <div
        className={`container ${styles["container-customer"]} d-flex flex-column flex-grow-1`}
      >
        <div className={`mt-3 ${styles["customer-table"]} flex-1`}>
          <table className="table">
            <thead className="table-dark">
              <tr>
                <th>Username</th>
                <th>Fullname</th>
                <th>Phone Number</th>
                <th>Total spent</th>
                <th>User type</th>
                <th>Rank</th>
              </tr>
            </thead>
            <tbody>
              {customers ? (
                customers.map((customer, index) => (
                  <tr key={index}>
                    <td
                      className={`${styles["username"]} ${styles["max-5-characters"]}`}
                    >
                      {customer.userName}
                    </td>
                    <td>{customer.fullName}</td>
                    <td>{customer.phone || "Chưa thiết lập"}</td>
                    <td>{customer.totalPrice}</td>
                    <td>{customer.userType == 0 ? "Admin" : "User"}</td>
                    {getRank(customer.rank)}
                  </tr>
                ))
              ) : (
                <>
                  <tr>
                    <h3>No users available</h3>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

enum UserRank {
  MEMBER = 1,
  GOLDEN = 2,
  DIAMOND = 3,
}

function getRank(rank: number) {
  switch (rank) {
    case UserRank.MEMBER:
      return (
        <td
          style={{
            color: "green",
          }}
        >
          MEMBER
        </td>
      );
    case UserRank.GOLDEN:
      return (
        <td
          style={{
            color: "yellowgreen",
          }}
        >
          GOLDEN
        </td>
      );
    default:
      return (
        <td
          style={{
            color: "royalblue",
          }}
        >
          DIAMOND
        </td>
      );
  }
}

export default Customers;
