import React from "react";
// import { Link } from "react-router-dom";
import {Button, Table} from 'react-bootstrap'
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/loader";
import Message from "../components/message";
import {getUserDetails, updateUserProfile} from '../actions/userActions'
import { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";
import { listMyOrders } from '../actions/orderActions'

function ProfileScreen() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const nav = useNavigate()
    // const location = useLocation()
    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const {error, loading, user} = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const {success} = userUpdateProfile

    const orderListMy = useSelector(state => state.orderListMy)
    const {loading: loadingOrders, error: errorOrders, orders } = orderListMy

    useEffect(() => {
        if (!userInfo){
            nav('/login')
        } else {
            if(!user || !user.name || success || userInfo._id !== user._id){
                dispatch({type: USER_UPDATE_PROFILE_RESET})
                dispatch(getUserDetails('profile'))
                dispatch(listMyOrders())
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [nav, userInfo, user, dispatch, success])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage('Password do not match')
        } else {
           dispatch(updateUserProfile({
            'id':user._id,
            'name': name,
            'email': email,
            'password': password,
        }))
        }
    }   

    return ( 
        <div className="row">
            <div className="col-md-3">
                <h1>USER PROFILE</h1>

                {message && <Message error={message} color="alert alert-danger"/> }
                {error && <Message error={error} color="alert alert-danger"/>}
                {loading && <Loader />}
                <form onSubmit={submitHandler}>
                    <div className="form-group" id="name">
                        <label htmlFor="Name">Name</label>
                        <input 
                        required
                        type="name" 
                        className="form-control" 
                        // id="exampleInputEmail1" 
                        // aria-describedby="emailHelp" 
                        placeholder="Enter name" 
                        value={name}
                        onChange={(e)=> setName(e.target.value)}
                        />
                    </div>

                    <div className="form-group" id="email">
                        <label htmlFor="Email">Email address</label>
                        <input 
                        required
                        type="email" 
                        className="form-control" 
                        placeholder="Enter email" 
                        value={email}
                        onChange={(e)=> setEmail(e.target.value)}
                        />
                    </div>

                    <div className="form-group" id='password'>
                        <label htmlFor="Password">Password</label>
                        <input 
                        type="password" 
                        className="form-control" 
                        placeholder="Enter Password" 
                        value={password}
                        onChange={(e)=> setPassword(e.target.value)}
                        />
                    </div>

                    <div className="form-group" id='passwordConfirm'>
                        <label htmlFor="Password">Confirm Password</label>
                        <input 
                        type="password" 
                        className="form-control" 
                        placeholder="Confirm Password" 
                        value={ confirmPassword }
                        onChange={(e)=> setConfirmPassword(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">Update</button>
                </form>
            </div>

            <div className="col-md-9">
                <h1>MY ORDERS</h1>
                {loadingOrders ? (
                    <Loader />
                ): errorOrders ? (
                    <Message variant = 'danger'>{errorOrders}</Message>
                ): (
                    <Table striped responsive className="table-sm">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Date</th>
                                <th>Total</th>
                                <th>Paid</th>
                                <th>Delivered</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            {orders.map(order => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.createdAt.substring(0, 10)}</td>
                                    <td>₦ {order.totalPrice}</td>
                                    <td>{order.isPaid ? order.paidAt.substring(0, 10) : (
                                        <i className="fas fa-times" style={{color: 'red'}}></i>
                                    )}</td>
                                    <td>
                                        <LinkContainer to={`/order/${order._id}`}>
                                            <Button className='btn-sm'>Details</Button>
                                        </LinkContainer>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </div>
        </div>
     );
}

export default ProfileScreen;