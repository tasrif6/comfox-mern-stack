import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout.js";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices.js";
import { useAuth } from "../context/auth";
import {useNavigate} from "react-router-dom";
import { useCart } from "../context/cart.js";
import { toast } from "react-hot-toast";

// Set the base URL for all API calls
const API_BASE_URL = "http://localhost:8080";

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
      console.log("Fetching total count...");
      const { data } = await axios.get(`${API_BASE_URL}/api/v1/product/product-count`);
      console.log("Total count response:", data);
      setTotal(data?.total)
    } catch(error){
      console.log("Error fetching total count:", error)
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);
  
  //load more
  const loadMore = async () => {
    try {
      console.log(`Loading more products for page ${page}...`);
      const {data} = await axios.get(`${API_BASE_URL}/api/v1/product/product-list/${page}`);
      console.log("Load more response:", data);
      setProducts([...products, ...data?.products]);
    } catch (error){
      console.log("Error loading more products:", error)
      setLoading(false)
    }
  }

  //get all category
  const getAllCategory = async () => {
    try {
      console.log("Fetching categories...");
      const { data } = await axios.get(`${API_BASE_URL}/api/v1/category/get-category`);
      console.log("Categories response:", data);
      if (data?.success) {
        setCategories(data?.category);
        console.log("Categories set:", data?.category);
      }
    } catch (error) {
      console.log("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    console.log("Component mounted, fetching initial data...");
    getAllCategory();
    getTotal();
  }, []);
  
  //get products
  const getAllProducts = async () => {
    try {
      console.log("Fetching all products...");
      setLoading(true);
      const { data } = await axios.get(`${API_BASE_URL}/api/v1/product/product-list/${page}`);
      console.log("Products response:", data);
      setLoading(false);
      setProducts(data.products);
      console.log("Products set:", data.products);
    } catch (error) {
      setLoading(false);
      console.log("Error fetching products:", error);
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
  console.log("Filter changed - checked categories:", all);
  };

  useEffect(() => {
    console.log("Filter effect - checked.length:", checked.length, "radio.length:", radio.length);
    if(!checked.length || !radio.length ) 
      getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if(checked.length || radio.length ) 
      filterProduct();
  }, [checked, radio]);

//get products by filter
const filterProduct = async() => {
  try {
    console.log("Filtering products with:", {checked, radio});
    const {data} = await axios.post(`${API_BASE_URL}/api/v1/product/product-filters`,{checked, radio})
    console.log("Filtered products response:", data);
    setProducts(data?.products)
  } catch (error){
    console.log("Error filtering products:", error)
  }
}

// Add debug info to render
console.log("Render - Products count:", products?.length, "Categories count:", categories?.length);
return (
  <Layout title={"ComFox"}>
    <div className="container-fluid mt-4">
      
      
      <div className="row">
        {/* Sidebar Filters */}
        <div className="col-md-3 mb-4">
          <div className="p-3 shadow-sm rounded bg-light">
            <h4 className="text-center mb-3 fw-bold">Filter By Category</h4>
            <div className="d-flex flex-column gap-2">
              {categories?.length > 0 ? (
                categories.map((c) => (
                  <Checkbox
                    key={c._id}
                    onChange={(e) => handleFilter(e.target.checked, c._id)}
                  >
                    {c.name}
                  </Checkbox>
                ))
              ) : (
                <p className="text-muted">No categories found</p>
              )}
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
          
          {loading && <p className="text-center">Loading products...</p>}
          
          {!loading && products?.length === 0 && (
            <div className="alert alert-warning text-center">
              <h4>No products found</h4>
              <p>Check your backend server is running on port 8080</p>
              <p>Try visiting: <a href="http://localhost:8080/api/v1/product/product-list/1" target="_blank" rel="noopener noreferrer">http://localhost:8080/api/v1/product/product-list/1</a></p>
            </div>
          )}
          
          <div className="row g-4">
            {products?.map((p) => (
              <div key={p._id} className="col-md-4">
                <div className="card h-100 shadow-sm border-0 rounded">
                  <img
                    src={`${API_BASE_URL}/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
                    }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title fw-semibold">{p.name}</h5>
                    <p className="card-text text-muted">
                      {p.description?.substring(0, 50)}...
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