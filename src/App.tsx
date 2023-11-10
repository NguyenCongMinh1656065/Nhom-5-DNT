import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Error from "./pages/Error/Error";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Unauthenticated from "./pages/Error/Unauthenticated";
import Profile from "./components/Profile/Profile";
import ServerError from "./pages/Error/ServerError";
import AdminPage from "./pages/Admin/Admin";

import UserContext from "./contexts/UserContext/UserContext";
import Products from "./components/AdminComponents/Product/Products/Products";
import Orders from "./components/AdminComponents/Order/Orders/Orders";
import ProductDetail from "./components/AdminComponents/Product/ProductDetail/ProductDetail";
import Customers from "./components/AdminComponents/Customers/Customers";
function App() {
  return (
    <UserContext>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/unauth" element={<Unauthenticated />} />

            <Route path="/servererror" element={<ServerError />} />
            {/* Admin */}
            <Route path="/">
              <Route index path="" element={<Navigate to={"/products"} />} />
              <Route path="products">
                <Route
                  index
                  path=""
                  element={<AdminPage children={<Products />} />}
                />
                <Route
                  element={<AdminPage children={<ProductDetail />} />}
                  path=":id"
                />
              </Route>
              <Route path="orders">
                <Route path="" element={<AdminPage children={<Orders />} />} />
              </Route>
              <Route path="customers">
                <Route
                  path=""
                  element={<AdminPage children={<Customers />} />}
                />
              </Route>
              <Route
                path="profile"
                element={<AdminPage children={<Profile />} />}
              />
            </Route>
            <Route path="/*" element={<Error />} />
          </Routes>
        </BrowserRouter>
      </div>
    </UserContext>
  );
}

export default App;
