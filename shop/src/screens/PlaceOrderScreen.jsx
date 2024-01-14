import React, { useEffect } from "react";
import { Button, Row, Col, ListGroup, Image } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Message from '../components/message'
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../components/CheckoutSteps";
import { createOrder } from "../actions/orderActions";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";


function PlaceOrderScreen() {

    const orderCreate = useSelector(state => state.orderCreate)
    const {order, error, success} = orderCreate

    const nav = useNavigate()

    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    cart.itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
    cart.shippingPrice = (cart.itemsPrice > 100 ? 0 : 10).toFixed(2)
    cart.taxPrice = (Number(0.01) * cart.itemsPrice).toFixed(2)
    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2)

    
    const placeOrder = () => {
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice,
        }))
    }

    useEffect(()=> {
        if(!cart.paymentMethod){
            nav('/payment')
        } 
    }, [cart.paymentMethod])
    useEffect(()=> {
        if(success){
            nav(`/order/${order._id}`)
            dispatch({type: ORDER_CREATE_RESET})
        }
    }, [success, nav])
    return ( 
        <div>
            <CheckoutSteps step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>SHIPPING</h2>
                            <p>
                                <strong>Shipping: </strong>
                                {cart.shippingAddress.address}, {cart.shippingAddress.city},
                                {' '}
                                {cart.shippingAddress.postalCode},
                                {' '}
                                {cart.shippingAddress.country}
                                
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>PAYMENT METHOD</h2>
                            <p>
                                <strong>Method: </strong>
                                {cart.paymentMethod}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>ORDER ITEMS</h2>
                                {cart.cartItems.length === 0 ? <Message variant='info'>
                                    Your cart is empty
                                </Message> :
                                (
                                    <ListGroup variant="flush">
                                         {cart.cartItems.map((item, index)=> (
                                            <ListGroup.Item key={index}>
                                                <Row>
                                                    <Col md={1}>
                                                        <Image src={item.image} alt={item.name} fluid rounded/>
                                                    </Col>
                                                    <Col>
                                                        <Link to={`/product_/${item.name}/${item.product}`}>{item.name}</Link>
                                                    </Col>
                                                    <Col md={4}>
                                                        {item.qty} X ${item.price} = {(item.qty * item.price).toLocaleString()}
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                         ))}
                                    </ListGroup>
                                )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Row>
                        <ListGroup variant="flush">
                             <ListGroup.Item>
                                <h2>Order Summary</h2>
                             </ListGroup.Item>

                             <ListGroup.Item>
                                <Row>
                                    <Col>Items: </Col>
                                    <Col>₦ {cart.itemsPrice}</Col>
                                </Row>
                             </ListGroup.Item>

                             <ListGroup.Item>
                                <Row>
                                    <Col>Shipping fees: </Col>
                                    <Col>₦ {cart.shippingPrice}</Col>
                                </Row>
                             </ListGroup.Item>

                             <ListGroup.Item>
                                <Row>
                                    <Col>Customs fee: </Col>
                                    <Col>₦ {cart.taxPrice}</Col>
                                </Row>
                             </ListGroup.Item>

                             <ListGroup.Item>
                                <Row>
                                    <Col>Total: </Col>
                                    <Col>₦ {cart.totalPrice}</Col>
                                </Row>
                             </ListGroup.Item>

                             <ListGroup.Item>
                                {error && <Message variant='danger'>{error}</Message>}
                             </ListGroup.Item>
                            
                             <ListGroup.Item>
                                <Button
                                    type='button'
                                    className="btn-block md-block bg-primary "
                                    disabled={cart.cartItems === 0}
                                    onClick = {placeOrder}
                                >
                                    Place Order
                                </Button>
                             </ListGroup.Item>

                        </ListGroup>
                    </Row>
                </Col>
            </Row>
        </div>
     );
}

export default PlaceOrderScreen;