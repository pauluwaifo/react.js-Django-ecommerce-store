import React from "react";
import { useNavigate } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/loader";
import Message from "../components/message";
import FormContainer from "../components/FormContainer";
import {listProductDetails, updateProduct} from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";
import { useState, useEffect } from "react";
import axios from "axios";

function ProductEditScreen() {
    const {id}= useParams()

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [image2, setImage2] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [subCategory, setSubCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)
    const [uploading2, setUploading2] = useState(false)

    const nav = useNavigate()
    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const {error, loading, product} = productDetails

    const productUpdate = useSelector(state => state.productUpdate)
    const {error: errorUpdate, loading: loadingUpdate, success: successUpdate} = productUpdate


    useEffect(() => {

        if(successUpdate) {
            dispatch({type: PRODUCT_UPDATE_RESET})
            nav('/admin/productlist')
        }else {
            if(!product.name || Number(product._id) !== Number(id)){
                dispatch(listProductDetails(id))
            }else{
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setImage2(product.image2)
                setBrand(product.brand)
                setCountInStock(product.countInStock)
                setCategory(product.category)
                setSubCategory(product.subCategory)
                setDescription(product.description)
            }
        }


    }, [dispatch, product, id, nav, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProduct({
            _id:id,
            name,
            price,
            image,
            image2,
            brand,
            category,
            subCategory,
            countInStock,
            description
        }))
    } 
    
    const uploadFileHandler = async (e)=> {
        const file = e.target.files[0]
        const formData = new FormData()

        formData.append('image', file)
        formData.append('product_id', id)

        setUploading(true)

        try{
            const config = {
                headers: {
                    'Content-Type':'multipart/form-data'
                }
            }

            const {data} = await axios.post('/api/products/upload/', formData, config)

            setImage(data)
            setUploading(false)

        }catch(error) {
            setUploading(false)
        }
    }

    const uploadFileHandler2 = async (e)=> {
        const file = e.target.files[0]
        const formData = new FormData()

        formData.append('image2', file)
        formData.append('product_id', id)

        setUploading2(true)

        try{
            const config = {
                headers: {
                    'Content-Type':'multipart/form-data'
                }
            }

            const {data} = await axios.post('/api/products/upload2/', formData, config)

            setImage2(data)
            setUploading2(false)

        }catch(error) {
            setUploading2(false)
        }
    }
    
    return ( 
        <div>
            <Link to='/admin/productlist'>
                Go Back
            </Link>
            <FormContainer>
                <h1>Edit Product</h1>
                {loadingUpdate && <Loader/>}
                {errorUpdate && <Message color='alert alert-danger' error={errorUpdate} />}

                {loading ? <Loader/> : error? <Message color='alert alert-danger' error={error}/> 
                    : (
                        <form onSubmit={submitHandler}>
                            <div className="form-group" id="name">
                                <label htmlFor="Name">Name</label>
                                <input 
                                type="name" 
                                className="form-control" 
                                placeholder="Enter name" 
                                value={name}
                                onChange={(e)=> setName(e.target.value)}
                                />
                            </div>

                            <div className="form-group" id="price">
                                <label htmlFor="Price">Price</label>
                                <input 
                                type="number" 
                                className="form-control" 
                                placeholder="Enter price" 
                                value={price}
                                onChange={(e)=> setPrice(e.target.value)}
                                />
                            </div>

                            <div className="form-group" id="image">
                                <label htmlFor="Image">Image</label>
                                <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Place Image" 
                                value={image}
                                onChange={(e)=> setImage(e.target.value)}
                                />
                            </div>

                            <div className="form-group" id="image-file">
                                <label htmlFor="Image">Choose File</label>
                                <input 
                                type="file" 
                                className="form-control" 
                                placeholder="Place Image" 
                                onChange={uploadFileHandler}
                                />
                            </div>
                            {uploading && <Loader />}

                            <div className="form-group" id="image2">
                                <label htmlFor="Image2">Image2</label>
                                <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Place Image" 
                                value={image2}
                                onChange={(e)=> setImage2(e.target.value)}
                                />
                            </div>

                            <div className="form-group" id="image-file">
                                <label htmlFor="Image">Choose File</label>
                                <input 
                                type="file" 
                                className="form-control" 
                                placeholder="Place Image" 
                                onChange={uploadFileHandler2}
                                />
                            </div>
                            {uploading2 && <Loader />}

                            <div className="form-group" id="brand">
                                <label htmlFor="Brand">Brand</label>
                                <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Enter brand" 
                                value={brand}
                                onChange={(e)=> setBrand(e.target.value)}
                                />
                            </div>

                            <div className="form-group" id="brand">
                                <label htmlFor="CountInStock">CountInStock</label>
                                <input 
                                type="number" 
                                className="form-control" 
                                placeholder="Count In Stock" 
                                value={countInStock}
                                onChange={(e)=> setCountInStock(e.target.value)}
                                />
                            </div>

                            {/* CATEGORY */}
                            <div className="input-group mb-3">
                            <label className="input-group-text" htmlFor="inputGroupSelect01">Category</label>
                            <select
                                className="form-select"
                                id="inputGroupSelect01"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option></option> {/* The selected attribute is removed */}
                                <option value="mensfashion, manfashion">
                                    Men's Fashion
                                </option>
                                <option value="womensfashion, womenfashion, woman, fashion">
                                    Women's Fashion
                                </option>
                                <option value="rain">Rain</option> {/* Removed extra spaces in option values */}
                                <option value="cloud">Cloud</option>
                                <option value="Sunny">Sunny</option>
                                <option value="Computing">Computing</option>
                            </select>
                                <div className="text-center bg-white ms-1 p-3 rounded-1">
                                    <p className="m-auto"> <strong>Current:</strong> {category}</p>
                                </div>
                            </div>

                            {/* SUB CATEGORY */}
                            <div className="input-group mb-3">
                                <label className="input-group-text" for="inputGroupSelect01">Category</label>
                                {category.includes('women') ? 
                                    <>
                                        <select 
                                        className="form-select" id="inputGroupSelect01"
                                        value={subCategory}
                                        onChange={(e)=> setSubCategory(e.target.value)}
                                        placeholder="Select category..." 
                                        type="text"
                                        >
                                            <option selected></option>
                                            <option value="Womens Clothing">Womens Clothing</option>
                                            <option value="Womens Shoes">Womens Shoes</option>
                                            <option value="Womens handbag">Womens handbag</option>
                                        </select>
                                        <div className="text-center bg-white ms-1 p-3 rounded-1">
                                            <p className="m-auto"> <strong>Current:</strong> {subCategory}</p>
                                        </div>
                                    </>
                                : category.includes('men') ? 
                                    <>
                                        <select 
                                        className="form-select" id="inputGroupSelect01"
                                        value={subCategory}
                                        onChange={(e)=> setSubCategory(e.target.value)}
                                        placeholder="Select category..." 
                                        type="text"
                                        >
                                            <option selected></option>
                                            <option value="Mens Clothing">Mens Clothing</option>
                                            <option value="Mens Shoes">Mens Shoes</option>
                                            <option value="Mens handbag">Mens handbag</option>
                                            <option value="Mens wristwatch">Mens wristwatch</option>
                                        </select>
                                        <div className="text-center bg-white ms-1 p-3 rounded-1">
                                            <p className="m-auto"> <strong>Current:</strong> {subCategory}</p>
                                        </div>
                                    </>
                                : 
                                    <>
                                        <select 
                                        className="form-select" id="inputGroupSelect01"
                                        value={subCategory}
                                        onChange={(e)=> setSubCategory(e.target.value)}
                                        placeholder="Select category..." 
                                        type="text"
                                        >
                                            <option selected></option>
                                            <option value="rain wears">Rain wears</option>
                                            <option value="cloud wears">Cloud wears</option>
                                            <option value="sunny wears">Sunny wears</option>
                                            <option value="laptops">Laptops</option>
                                        </select>
                                        <div className="text-center bg-white ms-1 p-3 rounded-1">
                                            <p className="m-auto"> <strong>Current:</strong> {subCategory}</p>
                                        </div>
                                    </> 
                                }
                            </div>


                            <div className="form-group" id="description">
                                <label htmlFor="description">Description</label>
                                <textarea 
                                    className="form-control" 
                                    placeholder="Enter Description" 
                                    value={description}
                                    onChange={(e)=> setDescription(e.target.value)}
                                    rows='4'
                                    cols = '50'
                                />
                            </div>

                            <button type="submit" className="btn btn-primary">Update</button>
                        </form>
                    )}

            </FormContainer>
        </div>
     );
}

export default ProductEditScreen;