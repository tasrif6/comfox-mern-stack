import React from "react";
import Layout from "../components/Layout/Layout";
import { useCart } from "../context/cart.js";
import { useAuth } from "../context/auth.js";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  //total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-BD", {
        style: "currency",
        currency: "BDT",
      });
    } catch (error) {
      console.log(error);
    }
  };

  //delete item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container py-4">
        {/* Greeting */}
        <div className="row mb-4">
          <div className="col-md-12 text-center">
            <h1 className="fw-bold text-center">
              {`Hello ${auth?.token && auth?.user?.name}`}
            </h1>
            <p className="lead text-muted">
              {cart?.length > 0
                ? `You have ${cart.length} items in your cart ${
                    auth?.token ? "" : " - Please login to checkout"
                  }`
                : "🛒 Your cart is empty"}
            </p>
          </div>
        </div>

        <div className="row">
          {/* Cart Items */}
          <div className="col-md-8">
            {cart?.map((p, i) => (
              <div
                key={p._id}
                className="card mb-3 shadow-sm border-0 rounded-3"
              >
                <div className="row g-0">
                  <div className="col-md-4 d-flex align-items-center">
                    <img
                      src={`/api/v1/product/product-photo/${p._id}`}
                      className="img-fluid rounded-start"
                      alt={p.name}
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title text-primary">{p.name}</h5>
                      <p className="card-text text-muted">
                        {p.description.substring(0, 60)}...
                      </p>
                      <h6 className="fw-bold">BDT. {p.price}</h6>
                      <button
                        className="btn btn-sm btn-outline-danger mt-2"
                        onClick={() => removeCartItem(p._id)}
                      >
                        <i className="bi bi-trash"></i> Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="col-md-4">
            <div className="card shadow-lg border-0 rounded-3">
              <div className="card-body">
                <h3 className="fw-bold text-secondary mb-3">Cart Summary</h3>
                <p className="text-muted">Total | Checkout | Payment</p>
                <hr />
                <h4 className="text-dark mb-4">Total : {totalPrice()}</h4>

                {auth?.user?.address ? (
                  <div className="mb-3">
                    <h6 className="text-muted">
                      <strong>Address:</strong> {auth?.user?.address}
                    </h6>
                    <button
                      className="btn btn-outline-warning w-100 mt-2"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      <i className="bi bi-geo-alt"></i> Update Address
                    </button>
                  </div>
                ) : (
                  <div className="mb-3">
                    {auth?.token ? (
                      <button
                        className="btn btn-outline-warning w-100"
                        onClick={() => navigate("/dashboard/user/profile")}
                      >
                        <i className="bi bi-geo-alt"></i> Update Address
                      </button>
                    ) : (
                      <button
                        className="btn btn-outline-primary w-100"
                        onClick={() => navigate("/login", { state: "/cart" })}
                      >
                        <i className="bi bi-box-arrow-in-right"></i> Please
                        Login to Checkout
                      </button>
                    )}
                  </div>
                )}

                {cart?.length > 0 && (
                  <button className="btn btn-success w-100">
                    <i className="bi bi-credit-card"></i> Proceed to Payment
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
