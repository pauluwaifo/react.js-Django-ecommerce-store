import React, { useEffect, useState } from 'react';
import { Row, Col, ListGroup, Image, Button } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import Message from '../components/message';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/loader';
import { getOrderDetails, payOrder, deliverOrder } from '../actions/orderActions';
import { PaystackButton } from 'react-paystack'
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from '../constants/orderConstants';
import { useNavigate } from 'react-router-dom';
import { removeFromCart } from '../actions/cartActions';
import { resetOrder } from '../actions/orderActions';
// import { PAYSTACK_PUBLIC_KEY } from '../config';


function OrderScreen() {
    const nav = useNavigate();
    const { id } = useParams();
    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart);
    const orderDetails = useSelector((state) => state.orderDetails);
    const { order, error, loading } = orderDetails;

    const [sdkReady, setSdkReady] = useState(false);

    const orderPay = useSelector((state) => state.orderPay);
    const { loading: loadingPay, success: successPay } = orderPay;

    const orderDeliver = useSelector((state) => state.orderDeliver);
    const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    
    if (!loading && !error) {
        order.itemsPrice = order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
    }
    useEffect(()=> {
        if(!userInfo) {
            nav('/login')
        }
        if(!order || successPay || order._id !== Number(id) || successDeliver){
            dispatch({type: ORDER_PAY_RESET})
            dispatch({type: ORDER_DELIVER_RESET})
            dispatch(getOrderDetails(id))

        } else if (!order.isPaid) {
            setSdkReady(true);
        } 
    }, [dispatch, order, id, successPay, successDeliver, userInfo, nav])
    
    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(id, paymentResult));
        dispatch(removeFromCart(id));
        dispatch(
            resetOrder({
                orderItems: cart.cartItems,
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod,
                itemsPrice: cart.itemsPrice,
                shippingPrice: cart.shippingPrice,
                taxPrice: cart.taxPrice,
                totalPrice: cart.totalPrice,
            })
        );
        alert('Order successfully paid.');
    };

    const deliverHandler = () => {
        dispatch(deliverOrder(id));
    };

    const publicKey = 'pk_test_69d724d5bb5414f98ce05c6399f6e5ee9ed5d92b';
    const componentProps = {
        publicKey,
        text: 'Pay Now',
    };
    

    return loading ? (
        <Loader />
    ) : error ? (
        <Message error={error} color="alert alert-danger" />
    ) : (
        <div>
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>SHIPPING</h2>
                            <p><strong>Name: </strong>{order.user.name}</p>
                            <p><strong>Email: </strong><a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                            <p>
                                <strong>Shipping: </strong>
                                {order.shippingAddress.address}, {order.shippingAddress.city},
                                {' '}
                                {order.shippingAddress.postalCode},
                                {' '}
                                {order.shippingAddress.country}
                            </p>
                            {order.isDelivered ? (
                                <Message color="alert alert-success" message={`Delivered on ${order.deliveredAt}`} />
                            ) : (
                                <Message color="alert alert-warning" error="Not delivered" />
                            )}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>PAYMENT METHOD</h2>
                            <p>
                                <strong>Method: </strong>
                                {order.paymentMethod}
                            </p>
                            {order.isPaid ? (
                                <Message color="alert alert-success" message={`Paid on ${order.paidAt.substring(0, 10)}`} />
                            ) : (
                                <Message color="alert alert-warning" error="Not paid" />
                            )}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>ORDER ITEMS</h2>
                            {order.orderItems.length === 0 ? (
                                <Message variant="info">Order is empty</Message>
                            ) : (
                                <ListGroup variant="flush">
                                    {order.orderItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.image} alt={item.name} fluid rounded />
                                                </Col>
                                                <Col>
                                                    <Link to={`/product_/${item.name}/${item.product}`}>{item.name}</Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty} X ₦ {item.price} = {(item.qty * item.price).toFixed(2)}
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
                                    <Col>₦ {order.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping fees: </Col>
                                    <Col>₦ {order.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Customs fee: </Col>
                                    <Col>₦ {order.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Total: </Col>
                                    <Col>₦ {order.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            {!order.isPaid && (
                                <ListGroup.Item id="payment">
                                    {loadingPay ? (
                                        <Loader />
                                    ) : !sdkReady ? (
                                        <Loader />
                                    ) : (
                                        <PaystackButton
                                            className="paystack-button"
                                            {...componentProps}
                                            onSuccess={successPaymentHandler}
                                            name={order.user.name}
                                            email={order.user.email}
                                            amount={order.totalPrice * 100} // Amount should be in kobo
                                            onClose={() => {
                                                console.log('Order:', order);
                                                alert('You are about to exit the payment screen');
                                            }}
                                        />
                                    )}
                                </ListGroup.Item>
                            )}
                        </ListGroup>
                        {loadingDeliver && <Loader />}
                        {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                            <ListGroup.Item>
                                <Button
                                    type="button"
                                    className="btn btn-block"
                                    onClick={deliverHandler}
                                >
                                    Mark As Delivered
                                </Button>
                            </ListGroup.Item>
                        )}
                    </Row>
                </Col>
            </Row>
        </div>
    );
}

export default OrderScreen;