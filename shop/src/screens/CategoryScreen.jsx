import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import Product from '../components/Product';
import { listProducts } from "../actions/productActions";
import Loader from "../components/loader";
import Message from "../components/message";

function CategoryScreen({ category }) {
  const productList = useSelector(state => state.productList);
  const { error, loading, products } = productList;
  const dispatch = useDispatch();
  
  useEffect(()=> {
      

  }, [])
  

  useEffect(() => {
    const savedCategory = localStorage.getItem('savedCategory');
    if (savedCategory) {
      dispatch(listProducts());
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('savedCategory', category);
  }, [category]);

  return (
    <div className="container-fluid p-0">
      {loading ? (
        <Loader />
      ) : error ? (
        <Message error={error} color="alert alert-danger" />
      ) : (
        <div className="row">
          {products.map((product) =>
            product.category === category ? (
              <div key={product._id} className="col-sm-12 col-md-6 col-lg-4 col-xl-3">
                <Product product={product} />
              </div>
            ) : null
          )}
        </div>
      )}
    </div>
  );
}

export default CategoryScreen;
