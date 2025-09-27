import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout.js";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  //initial details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  //get product
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data.product);
      getSimilarProducts(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  //get similar products
  const getSimilarProducts = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container py-4">
        {/* Product Details Section */}
        <div className="row shadow-lg rounded bg-white p-4 mb-4">
          <div className="col-md-6 text-center">
            <img
              src={`/api/v1/product/product-photo/${product._id}`}
              className="img-fluid rounded border"
              alt={product.name}
              style={{ maxHeight: "350px", objectFit: "cover" }}
            />
          </div>
          <div className="col-md-6">
            <h2 className="fw-bold mb-3 text-primary text-uppercase">
              {product.name}
            </h2>
            <p className="lead">{product.description}</p>
            <ul className="list-group list-group-flush mb-3">
              <li className="list-group-item">
                <strong>Price:</strong> BDT. {product.price}
              </li>
              <li className="list-group-item">
                <strong>Category:</strong> {product.category?.name}
              </li>
              <li className="list-group-item">
                <strong>Quantity:</strong> {product.quantity}
              </li>
              <li className="list-group-item">
                <strong>Shipping:</strong> {product.shipping ? "Yes" : "No"}
              </li>
            </ul>
            <button className="btn btn-lg btn-success shadow-sm">
              <i className="bi bi-cart-plus"></i> Add to Cart
            </button>
          </div>
        </div>

        {/* Related Products Section */}
        <div className="related-products">
          <h3 className="mb-4 text-secondary border-bottom pb-2">
            Similar Products
          </h3>
          {relatedProducts.length < 1 && (
            <p className="text-muted">No Similar Products Found</p>
          )}
          <div className="d-flex flex-wrap justify-content-start">
            {relatedProducts?.map((p) => (
              <div
                key={p._id}
                className="card shadow-sm m-2"
                style={{ width: "18rem" }}
              >
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title text-primary">{p.name}</h5>
                  <p className="card-text text-muted">
                    {p.description.substring(0, 30)}...
                  </p>
                  <button className="btn btn-outline-primary w-100">
                    <i className="bi bi-cart-plus"></i> Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
