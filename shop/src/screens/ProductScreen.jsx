import { useParams } from 'react-router-dom';
import {Form, Button} from 'react-bootstrap'
import { Link } from 'react-router-dom';
import RelatedProduct from '../components/RelatedProduct'
import Rating from '../components/Rating';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from "../actions/productActions";
import Loader from '../components/loader';
import Message from '../components/message';
import { listProductDetails, createProductReview } from '../actions/productActions';
import {addToCart} from '../actions/cartActions'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants';
// import Zoom from '../ImageZoom'
import GoToTop from '../components/GoToTop';


function ProductScreen() {
    // Zoom()

    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    const {id} = useParams()
    // const [related_Product, setRelated_Product] = useState('');
    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const {loading, error, product} = productDetails
    // console.log(product)

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const productReviewCreate = useSelector(state => state.productReviewCreate)
    const {loading: loadingProductReview, 
        error: errorProductReview , 
        success: successProductReview
    } = productReviewCreate


    const productList = useSelector(state => state.productList)
    const {products} = productList

    const findRelatedProducts = (products, product) => {
       return (
            products.map((prod) => {
                if(product.category === prod.category && product.name !== prod.name) {
                    return (
                        <div key={prod._id}>
                            <RelatedProduct product={prod} />
                        </div>
                    )
                }

            })
       );
    };
    
    const relatedProduct = findRelatedProducts(products, product);

    useEffect(() => {
        dispatch(listProducts());
        setQty(1);
    }, [dispatch, product ]);
    
    useEffect(() => {
        if(successProductReview){
            setRating(0)
            setComment('')
            dispatch({type: PRODUCT_CREATE_REVIEW_RESET})
        }

        dispatch(listProductDetails(id));

    }, [dispatch, id, successProductReview]);


    const addToCartHandler = () => {
        if(id) {
            dispatch(addToCart(id, qty))
        }
        alert('product added'); 
        if(qty) {
            dispatch(addToCart(id, qty))
        }
    };
      
    const submitHandler = (e) => {
    e.preventDefault()
    dispatch(createProductReview(
        id,{
            rating,
            comment
        }
    ))
    }
    return ( 
        <div className='container'>
            {loading ? (<Loader />)
            :   error ? (<Message error={error}/>)
                :   (
                        <div className='row'>
                            <div className="row">
                                <div className="col-sm-12 col-md-12 col-xl-6 col-lg-6">
                                    <div id="img-container" style={{width: '300px'}}>
                                        <img src={product.image} alt={product.name} width="100%"/>
                                    </div>
                                    <div className="border border-1 mtb-1"></div>
                                    <p className='m-0'>SHARE THIS PRODUCT</p>
                                    <div className='mtb-1 fs-4'>
                                        <span className='fas fa-camera'></span>
                                        <span className='far fa-thumbs-up mlr-1'></span>
                                    </div>
                                    <h4>REVIEWS</h4>
                                    {product.reviews.length === 0 && <Message color='alert alert-info' message='No reviews' /> }
                                    <div className="col">
                                        {product.reviews.map((review) => (
                                            <div className="col" key={review._id}>
                                                <span>{review.name}</span>
                                                <Rating value={review.rating} color='#f8e825'/>
                                                <p>{review.createdAt.substring(0, 10)}</p>
                                                <p>{review.comment}</p>
                                            </div>
                                        ))}
                                        <div className="border border-1 mtb-1"></div>
                                        <div className="col">
                                            <p className='fs-4'>WRITE A REVIEW</p>

                                            {loadingProductReview &&  <Loader />}
                                            {successProductReview && 
                                            <Message color='alert alert-success' message='Review submitted' />
                                            }
                                            {errorProductReview && 
                                                <Message color='alert alert-danger' error={errorProductReview} />
                                            }

                                            {userInfo ? (
                                                <Form onSubmit={submitHandler}>
                                                    <Form.Group controlId='rating'>
                                                        <Form.Label>Rating</Form.Label>
                                                        <Form.Control
                                                        as = 'select'
                                                        value={rating}
                                                        onChange={(e) => setRating(e.target.value)}>
                                                            <option value=''>Select...</option>
                                                            <option value='1'>1 - Poor</option>
                                                            <option value='2'>2 - Fair</option>
                                                            <option value='3'>3 - Good</option>
                                                            <option value='4'>4 - Very Good</option>
                                                            <option value='5'>5 - Excellent</option>
                                                        </Form.Control>
                                                    </Form.Group>

                                                    <Form.Group controlId='comment'>
                                                    <Form.Label>Review</Form.Label>
                                                    <Form.Control
                                                        as='textarea'
                                                        row='5'
                                                        value={comment}
                                                        onChange={(e) => setComment(e.target.value)}
                                                    ></Form.Control>
                                                    </Form.Group>
                                                    <Button
                                                        disabled={loadingProductReview}
                                                        type='submit'
                                                        variant = 'primary'
                                                    >
                                                        Submit
                                                    </Button>
                                                </Form>
                                            ): (
                                                <Message color='alert alert-info' 
                                                message=
                                                {
                                                    <>
                                                        Please <Link to='/login'>Login</Link> to write a review
                                                    </>
                                                }
                                                />
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-6 col-xl-6 col-lg-6">
                                    <h4>{product.name}</h4>
                                    <p className='m-0 pd-0'>Brand: {product.brand}</p>
                                    <Rating value={product.rating} 
                                            text={`${product.numReviews} reviews`} 
                                            color={'#f8e825'} fontSize={'1rem'}
                                    />
                                    <div className="border border-1 mtb-1"></div>
                                    <h3 className='m-0'>₦ {Number(product.price).toLocaleString()}</h3>
                                    <span className='lt-small text-danger fw-normal'> 
                                    <i className='fas fa-exclamation-circle mlr-p5'></i>
                                    {product.countInStock > 0 
                                    ? 
                                        `${product.countInStock} units left` 
                                    : 
                                        'Out of stock'}
                                    </span>


                                    {/* ADD TO CART HANDLER */}
                                    {product.countInStock > 0 && (
                                        <div className="col-xs my-1">
                                            <p>Qty</p>
                                            <form >
                                                <select className='my_form-style' value={qty} onChange={(e) => setQty(Number(e.target.value))}>
                                                    {
                                                        [...Array(product.countInStock).keys()].map((x) =>(
                                                            <option key={Number(x + 1)} value={Number(x + 1)}>
                                                                {Number(x + 1)}
                                                            </option>
                                                        ))
                                                    }
                                                </select>
                                            </form>
                                        </div>
                                    )}

                                    <button 
                                        onClick={addToCartHandler}
                                        className='btn-block d-block my-btn' 
                                        disabled = {product.countInStock <= 0} 
                                        type='button'> 
                                    ADD TO CART
                                    </button>
                                    
                                    <div className="border border-1 mtb-1"></div>
                                    <p>Description: {product.description}</p>
                                </div>
                                {/* <div className="col-sm-12 col-md-6 col-xl-4 col-lg-4">
                                </div> */}
                            </div>
                            <div className="border border-1 mtb-1"></div>
                            <div className="row">
                                <div className="col-12">
                                    <div className="d-flex flex-row flex-wrap">
                                        {relatedProduct}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
            }
            <GoToTop />
        </div>
     );
}

export default ProductScreen;