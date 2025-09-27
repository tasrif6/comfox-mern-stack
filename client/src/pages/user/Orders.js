// import React, { useState, useEffect } from "react";
// import UserMenu from "../../components/Layout/UserMenu";
// import Layout from "./../../components/Layout/Layout";
// import axios from "axios";
// import { useAuth } from "../../context/auth";
// import moment from "moment";

// const Orders = () => {
//   const [orders, setOrders] = useState([]);
//   const [auth, setAuth] = useAuth();
//   const getOrders = async () => {
//     try {
//       const { data } = await axios.get("/api/v1/auth/orders");
//       setOrders(data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     if (auth?.token) getOrders();
//   }, [auth?.token]);
//   return (
//     <Layout title={"Your Orders"}>
//       <div className="container-flui p-3 m-3 dashboard">
//         <div className="row">
//           <div className="col-md-3">
//             <UserMenu />
//           </div>
//           <div className="col-md-9">
//             <h1 className="text-center">All Orders</h1>
//             {orders?.map((o, i) => {
//               return (
//                 <div className="border shadow">
//                   <table className="table">
//                     <thead>
//                       <tr>
//                         <th scope="col">#</th>
//                         <th scope="col">Status</th>
//                         <th scope="col">Buyer</th>
//                         <th scope="col"> date</th>
//                         <th scope="col">Payment</th>
//                         <th scope="col">Quantity</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       <tr>
//                         <td>{i + 1}</td>
//                         {/* <td>{o?.status}</td>
//                         <td>{o?.buyer?.name}</td>
//                         <td>{moment(o?.createAt).fromNow()}</td>
//                         <td>{o?.payment.success ? "Success" : "Failed"}</td>
//                         <td>{o?.products?.length}</td> */}
//                       </tr>
//                     </tbody>
//                   </table>
//                   {/* <div className="container">
//                     {o?.products?.map((p, i) => (
//                       <div className="row mb-2 p-3 card flex-row" key={p._id}>
//                         <div className="col-md-4">
//                           <img
//                             src={`/api/v1/product/product-photo/${p._id}`}
//                             className="card-img-top"
//                             alt={p.name}
//                             width="100px"
//                             height={"100px"}
//                           />
//                         </div>
//                         <div className="col-md-8">
//                           <p>{p.name}</p>
//                           <p>{p.description.substring(0, 30)}</p>
//                           <p>Price : {p.price}</p>
//                         </div>
//                       </div>
//                     ))} 
//                   </div>*/}
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default Orders;

import React, { useState, useEffect } from "react";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <Layout title={"Your Orders"}>
      <div className="container-fluid p-3 m-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center mb-4">Your Orders</h1>
            {orders.length === 0 ? (
              <p className="text-center">No orders found.</p>
            ) : (
              orders.map((o, i) => (
                <div
                  className="card mb-4 shadow-sm border-0"
                  key={o._id}
                  style={{ borderRadius: "12px" }}
                >
                  <div className="card-header d-flex justify-content-between align-items-center bg-primary text-white">
                    <h5 className="mb-0">Order #{i + 1}</h5>
                    <span
                      className={`badge ${
                        o?.status === "Delivered"
                          ? "bg-success"
                          : o?.status === "Processing"
                          ? "bg-warning"
                          : "bg-secondary"
                      }`}
                    >
                      {o?.status}
                    </span>
                  </div>
                  <div className="card-body">
                    <p>
                      <strong>Buyer:</strong> {o?.buyer?.name || "N/A"}
                    </p>
                    <p>
                      <strong>Date:</strong>{" "}
                      {moment(o?.createdAt).format("MMMM Do YYYY, h:mm a")}
                    </p>
                    <p>
                      <strong>Payment:</strong>{" "}
                      {o?.payment?.success ? (
                        <span className="text-success">Success</span>
                      ) : (
                        <span className="text-danger">Failed</span>
                      )}
                    </p>
                    <p>
                      <strong>Total Products:</strong> {o?.products?.length}
                    </p>

                    <div className="row g-3 mt-3">
                      {o?.products?.map((p) => (
                        <div
                          className="col-md-4 col-sm-6"
                          key={p._id}
                        >
                          <div className="card h-100 shadow-sm border-0">
                            <img
                              src={`/api/v1/product/product-photo/${p._id}`}
                              className="card-img-top"
                              alt={p.name}
                              style={{ height: "150px", objectFit: "cover" }}
                            />
                            <div className="card-body d-flex flex-column">
                              <h6 className="card-title">{p.name}</h6>
                              <p className="card-text text-muted">
                                {p.description.substring(0, 40)}...
                              </p>
                              <p className="fw-bold mt-auto">BDT. {p.price}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
