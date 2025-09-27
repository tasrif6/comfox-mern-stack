import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout.js";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices.js";
import { useAuth } from "../context/auth";
import {useNavigate} from "react-router-dom";
import { useCart } from "../context/cart.js";
import { toast } from "react-hot-toast";

const HomePage = () => {
  const navigate= useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  //get Total Count
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total)
    } catch(error){
      console.log(error)
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);
  //load more
  const loadMore = async () => {
    try {
      const {data} = await axios.get(`/api/v1/product/product-list/${page}`);
      setProducts([...products, ...data?.products]);
    } catch (error){
      console.log(error)
      setLoading(false)
    }
  }

  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);
  //get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //filter by category
const handleFilter = (value, id ) => {
  let all = [...checked];
  if (value){
    all.push(id);
  } else {
    all = all.filter((c) => c !== id);
  }
  setChecked(all);
  };

  useEffect(() => {
    if(!checked.length || !radio.length ) 
      getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if(checked.length || radio.length ) 
      filterProduct();
  }, [checked, radio]);

//get products by filter
const filterProduct =async() => {
  try {
    const {data} = await axios.post('/api/v1/product/product-filters',{checked, radio})
    setProducts(data?.products)
  } catch (error){
    console.log(error)
  }
}

return (
  <Layout title={"ComFox"}>
    <div className="container-fluid mt-4">
      <div className="row">
        {/* Sidebar Filters */}
        <div className="col-md-3 mb-4">
          <div className="p-3 shadow-sm rounded bg-light">
            <h4 className="text-center mb-3 fw-bold">Filter By Category</h4>
            <div className="d-flex flex-column gap-2">
              {categories?.map((c) => (
                <Checkbox
                  key={c._id}
                  onChange={(e) => handleFilter(e.target.checked, c._id)}
                >
                  {c.name}
                </Checkbox>
              ))}
            </div>

            {/* Price Filter */}
            <h4 className="text-center mt-4 mb-3 fw-bold">Filter By Price</h4>
            <div className="d-flex flex-column gap-2">
              <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                {Prices?.map((p) => (
                  <div key={p._id} className="mb-2">
                    <Radio value={p.array}>{p.name}</Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>

            <div className="d-grid mt-4">
              <button
                className="btn btn-outline-danger"
                onClick={() => window.location.reload()}
              >
                RESET FILTERS
              </button>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="col-md-9">
          <h2 className="text-center mb-4 fw-bold">Our Exclusive Collection</h2>        
          <div className="row g-4">
            {products?.map((p) => (
              <div key={p._id} className="col-md-4">
                <div className="card h-100 shadow-sm border-0 rounded">
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title fw-semibold">{p.name}</h5>
                    <p className="card-text text-muted">
                      {p.description.substring(0, 50)}...
                    </p>
                    <p className="card-text fw-bold text-success">
                      BDT. {p.price}
                    </p>
                    <div className="mt-auto d-flex gap-2">
                      <button
                        className="btn btn-primary flex-grow-1"
                        onClick={() => {
                          setCart([...cart, p]);
                          localStorage.setItem(
                            "cart",
                            JSON.stringify([...cart, p])
                          );
                          toast.success("Item Added to Cart");
                        }}
                      >
                        Add to Cart
                      </button>
                      <button
                        className="btn btn-outline-secondary flex-grow-1"
                        onClick={() => navigate(`/product/${p.slug}`)}
                      >
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-4">
            {products && products.length < total && (
              <button
                className="btn btn-warning px-4 py-2 fw-semibold"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                  setLoading(true);
                }}
              >
                {loading ? "Loading..." : "Load More"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  </Layout>
);
};

export default HomePage;