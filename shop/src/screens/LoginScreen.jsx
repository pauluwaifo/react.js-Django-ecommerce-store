import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/loader";
import Message from "../components/message";
import FormContainer from "../components/FormContainer";
import {login} from '../actions/userActions'
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import logo from '../assests/sho_logo/logo.png'

function LoginScreen() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const nav = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()

    const redirect = location.search ? location.search.split('=')[1] : '/'
    const userLogin = useSelector(state => state.userLogin)
    const {error, loading, userInfo} = userLogin

    useEffect(() => {
        if (userInfo){
            nav(redirect)
        }
    }, [nav, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }

    return ( 
        <FormContainer>
            {/* <h1 className="text-center">Shop</h1> */}
            <div className="d-flex justify-content-center mt-5">
                <img src={logo} alt="logo" className="imgLogo"/>
            </div>
            <h5 className='text-center mt-4'>Welcome to Shop</h5>
            <p className='text-center mt-1 f-16px'>
                Type your e-mail or phone number to login to your account
            </p>
            {error && <Message error={error} color="alert alert-danger"/>}
            {loading && <Loader />}
            <form onSubmit={submitHandler}>
                <div className="form-group login-form" id="email">
                    <label htmlFor="exampleInputEmail1" className="fs-4">Email</label>
                    <input type="email" 
                    className="form-control login" 
                    id="exampleInputEmail1" 
                    aria-describedby="emailHelp" 
                    placeholder="Enter email" 
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                    />
                </div>

                <div className="form-group login-form" id='password'>
                    <label htmlFor="exampleInputPassword1" className="fs-4">Password</label>
                    <input type="password" 
                    className="form-control login" 
                    id="exampleInputPassword1" 
                    placeholder="Password" 
                    value={password}
                    onChange={(e)=> setPassword(e.target.value)}
                    />
                </div>
                <div className="col mt-2">
                    <button type="submit" 
                    className="btn btn-primary bg-primary text-decoration-none md-block">
                        Sign In
                    </button>
                </div>
            </form>
            {/* <div className="row py-3">
                <div className="col mt-2">
                    <span>New Customer</span>  
                    <Link className="btn btn-primary ms-2 rounded-1 bg-primary text-decoration-none"
                    to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                    Register
                    </Link>
                </div>
            </div> */}
            <Link className="text-decoration-none p-1"
                    to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                   Don't have an account. <span className="fw-5">Register</span>
            </Link> 
        </FormContainer>

     );
}

export default LoginScreen;