import { useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/message";
import {addToCart, removeFromCart} from '../actions/cartActions'
import Cart from "../components/Cart";


function CartScreen() {
    const {id} = useParams()
    const location = useLocation()
    const nav = useNavigate()
    const qty = location.search ? Number(location.search.split('=')[1]) : 1
    console.log(qty)

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const { cartItems } = cart

    console.log('cartItems', cartItems) 
    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }
    const checkoutHandler = (id) => {
        if(userInfo) {
            nav('/shipping')
        } else {
            nav('/login')
        }
    }

    useEffect(()=> {
        if(id) {
            dispatch(addToCart(id, qty))
        }
    }, [dispatch, qty, id])
    return ( 
        <div className="container-fluid">
            <div className="row">
                <h1>Shopping Cart</h1>
                <div className="col-md-8">
                    {cartItems.length === 0 ? 
                    (
                        <Message message={
                            <p>
                                Your Cart is Empty <Link className='d-inline-block _back' to='/'>Go Back</Link>
                            </p>
                            } 
                        color='alert alert-info'/> 
                    ) : 
                    (
                        <>
                            {cartItems.map((prod, i) => 
                                <div className="row cart_card my-3 d-flex p-2 bg-white" key={i} >
                                        <div className="col-md-2">
                                            <img className="rounded fluid" src={prod.image} alt={prod.name} width='100%'/>
                                        </div>
                                        <div className="col-md-3">
                                            <Link className='txt-black' to={`/product_/${prod.name}/${prod.product}`}> {prod.name} </Link>
                                        </div>
                                        <div className="col-md-2 m-a">
                                            <form >
                                                    <select className='my_form-style' value={prod.qty} onChange={(e) => dispatch(addToCart(prod.product, Number(e.target.value)))}>
                                                        {
                                                            [...Array(prod.countInStock).keys()].map((x) =>(
                                                                <option key={x + 1} value={x + 1}>
                                                                    {x + 1}
                                                                </option>
                                                            ))
                                                        }
                                                    </select>
                                            </form>
                                        </div>
                                        <div className="col-md-2 m-a txt-grey">
                                            <h5>₦ {Number(prod.price).toLocaleString()}</h5> 
                                        </div>
                                        <div className="col-md-1 m-a">
                                            <button type="button" 
                                                variant='light'
                                                onClick={()=> removeFromCartHandler(prod.product)}
                                                className=" _rmv">
                                                <i className="fas fa-trash" title="remove from cart"></i>
                                            </button>
                                        </div>
                                </div>
                            )}
                        </>
                    )
                    
                    }
                </div>
                <div className="col-md-4 my-3 px-5">
                    <div className="row bg-white p-2">
                        <div className="col-6">
                            <p className="fs-5"> Subtotal: </p>
                        </div>
                        <div className="col-6">
                        <p className="fs-5">
                            ₦ {(cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2))}
                        </p> 
                        </div>
                        <div className="col-6">
                            <p className="fs-5"> Items: </p>
                        </div>
                        <div className="col-6">
                            <p className="fs-5">
                                {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                            </p>
                        </div>
                        <div className="col-12">
                            <button 
                                onClick={checkoutHandler}
                                className='btn-block d-block my-btn mfs-p9 px-5 py-3' 
                                disabled = {cartItems.length === 0} 
                                type='button'> 
                                PROCEED TO CHECK OUT
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}

export default CartScreen;

