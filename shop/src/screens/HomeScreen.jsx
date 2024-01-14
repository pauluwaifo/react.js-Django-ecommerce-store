import React, { useEffect} from "react";
import Product from '../components/Product'
import LimitedProduct from '../components/LimitedProduct'
import {useDispatch, useSelector} from 'react-redux'
import { listProducts } from "../actions/productActions";
import Loader from "../components/loader";
import Message from "../components/message";
import Recommendation from "../components/Recommendation";
import { Link } from "react-router-dom";
// import  slide_image  from '../assests/slide_images/slide_image.png'
import  slide_1  from '../assests/slide_images/slide_1.jpg'
import  slide_2  from '../assests/slide_images/slide_2.jpg'
import  slide_3  from '../assests/slide_images/slide_3.jpg'
import  slide_4  from '../assests/slide_images/slide_4.jpg'
import  banner1  from '../assests/slide_images/banner1.jpg'
import Category from "../components/category";
import useFunc from "../sample";
import '../Styles.css'


function HomeScreen() {
    useFunc()

    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const {error, loading, products} = productList
    console.log(products)
    const sortedProducts = products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));


    useEffect(()=> {
        dispatch(listProducts())
    }, [dispatch])

    
    return ( 
        <div className="container-fluid p-0 styles.body">
            {loading ? <Loader />
                :   error ? <Message error={error} color="alert alert-danger"/>
                :   <div className="row gx-3">
                        
                        <div className="col-lg-12 col-sm-12">
                            <div className="row g-3">
                                <div className="col-lg-10 col-sm-10">
                                    <div
                                        id="carouselExampleIndicators"
                                        className="carousel slide b-shadow"
                                        data-bs-ride="carousel"
                                    >
                                        <div className="carousel-indicators">
                                        <button
                                            type="button"
                                            data-bs-target="#carouselExampleIndicators"
                                            data-bs-slide-to="0"
                                            className="active"
                                            aria-current="true"
                                            aria-label="Slide 1"
                                        ></button>
                                        <button
                                            type="button"
                                            data-bs-target="#carouselExampleIndicators"
                                            data-bs-slide-to="1"
                                            aria-label="Slide 2"
                                        ></button>
                                        <button
                                            type="button"
                                            data-bs-target="#carouselExampleIndicators"
                                            data-bs-slide-to="2"
                                            aria-label="Slide 3"
                                        ></button>
                                        <button
                                            type="button"
                                            data-bs-target="#carouselExampleIndicators"
                                            data-bs-slide-to="3"
                                            aria-label="Slide 4"
                                        ></button>
                                        </div>
                                        {/* CAROUSEL INNER */}
                                        <div className="carousel-inner br-1 rounded-1 shadow">
                                            <div className="carousel-item active" data-bs-interval="6000">
                                                <Link to="#">
                                                <img
                                                    src={slide_1}
                                                    className="d-block w-100"
                                                    alt="."
                                                />
                                                </Link>
                                            </div>
                                            <div className="carousel-item" data-bs-interval="6000">
                                                <Link to="#">
                                                <img
                                                    src={slide_2}
                                                    className="d-block w-100"
                                                    alt="."
                                                />
                                                </Link>
                                            </div>
                                            <div className="carousel-item" data-bs-interval="6000">
                                                <Link to="#">
                                                <img
                                                    src={slide_3}
                                                    className="d-block w-100"
                                                    alt="."
                                                />
                                                </Link>
                                            </div>
                                            <div className="carousel-item" data-bs-interval="6000">
                                                <Link to="">
                                                <img
                                                    src={slide_4}
                                                    className="d-block w-100"
                                                    alt="."
                                                />
                                                </Link>
                                            </div>
                                        </div>

                                        <button
                                        className="carousel-control-prev"
                                        type="button"
                                        data-bs-target="#carouselExampleIndicators"
                                        data-bs-slide="prev"
                                        >
                                        <span
                                            className="carousel-control-prev-icon"
                                            aria-hidden="true"
                                        ></span>
                                        <span className="visually-hidden">Previous</span>
                                        </button>
                                        <button
                                        className="carousel-control-next"
                                        type="button"
                                        data-bs-target="#carouselExampleIndicators"
                                        data-bs-slide="next"
                                        >
                                        <span
                                            className="carousel-control-next-icon"
                                            aria-hidden="true"
                                        ></span>
                                        <span className="visually-hidden">Next</span>
                                        </button>
                                    </div>
                                </div>
                                <div className="col-lg-2 col-sm-2 banner">
                                    <img src={banner1} alt="card" width={"100%"} className="rounded-1"/>
                                </div>
                            </div>
                        </div>
                        {/* 20% OFF RECOMMENDATION*/}
                        <Recommendation />
                        <Category />
                        {/* Latest Products */}
                        <div className="col-lg-12 mt-3">
                            <div className="row">
                                <div className="col-lg-12 mmt-5">
                                    <div className="rounded-2 ov_hidden">
                                        <div className="col-lg-12 d-flex ">
                                            <div className="nav-tp bg-lightpurple">
                                                <ul>
                                                <li><h5 className="d-inline-block -fs20 fw-normal">Latest Products</h5></li>
                                                <li className="fl-r">
                                                    <Link to="#">
                                                        <h6 className="d-inline-block fw-normal">SEE ALL</h6>
                                                        <i className="fa-solid fa-arrow-right"></i>
                                                    </Link>
                                                </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="carousel-prod-container">
                                            <div  className="carousel-prod-wrapper crl_p">
                                                {sortedProducts.filter((prod, index) => index <= 13).map((product) => (
                                                    <div key={product._id}>
                                                        <Product product={product}/>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="carousel-prod-controls">
                                                <button className="prev-prod-btn p_prev">
                                                    <span className="arrow left"></span>
                                                </button>
                                                <button className="next-prod-btn p_next">
                                                    <span className="arrow right"></span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Limited Deals */}
                        <div className="col-lg-12 mt-3">
                            <div className="row">
                                <div className="col-lg-12 mmt-5">
                                    <div className="rounded-2 ov_hidden">
                                        <div className="col-lg-12 d-flex">
                                            <div className="nav-tp bg-w_red text-white">
                                                <ul>
                                                <li><h5 className="d-inline-block -fs20 fw-normal">Limited Deals</h5></li>
                                                <li className="fl-r">
                                                    <Link to="#">
                                                        <h6 className="d-inline-block fw-normal text-white">SEE ALL</h6>
                                                        <i className="fa-solid fa-arrow-right text-white"></i>
                                                    </Link>
                                                </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="carousel-prod-container ">
                                            <div  className="carousel-prod-wrapper crl_l">
                                                {products.filter((products, i) => i <= 20).map((Limitedproduct) => (
                                                    <div key={Limitedproduct._id}>
                                                        {Limitedproduct.countInStock <= 10 &&
                                                            <div key={Limitedproduct._id}>
                                                                <LimitedProduct product={Limitedproduct} key={Limitedproduct._id}/>
                                                            </div>
                                                        }
                                                    </div>
                                                    
                                                ))}
                                            </div>
                                            <div className="carousel-prod-controls">
                                                <button className="prev-prod-btn l_prev">
                                                    <span className="arrow left"></span>
                                                </button>
                                                <button className="next-prod-btn l_next">
                                                    <span className="arrow right"></span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            }
            
        </div> 
    );
}

export default HomeScreen;