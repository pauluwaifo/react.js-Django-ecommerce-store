import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/loader";
import Message from "../components/message";
import FormContainer from "../components/FormContainer";
import {register} from '../actions/userActions'
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function RegisterScreen() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const nav = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()

    const redirect = location.search ? location.search.split('=')[1] : '/'
    const userRegister = useSelector(state => state.userRegister)
    const {error, loading, userInfo} = userRegister

    useEffect(() => {
        if (userInfo){
            nav(redirect)
        }
    }, [nav, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage('Password do not match')
        } else {
            dispatch(register(name, email, password))
        }
    }   
    
    return ( 
        <FormContainer>
            <h1>Register</h1>
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
                    // id="exampleInputEmail1" 
                    // aria-describedby="emailHelp" 
                    placeholder="Enter email" 
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                    />
                </div>

                <div className="form-group" id='password'>
                    <label htmlFor="Password">Password</label>
                    <input 
                    required
                    type="password" 
                    className="form-control" 
                    // id="exampleInputPassword1" 
                    placeholder="Enter Password" 
                    value={password}
                    onChange={(e)=> setPassword(e.target.value)}
                    />
                </div>

                <div className="form-group" id='passwordConfirm'>
                    <label htmlFor="Password">Confirm Password</label>
                    <input 
                    required
                    type="password" 
                    className="form-control" 
                    // id="exampleInputPassword1" 
                    placeholder="Confirm Password" 
                    value={ confirmPassword }
                    onChange={(e)=> setConfirmPassword(e.target.value)}
                    />
                </div>

                <button type="submit" className="btn btn-primary">Register</button>
            </form>

            <div className="row py-3">
                <div className="col">
                    Have and Account ? 
                    <Link 
                    to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                        Sign In
                    </Link>
                </div>
            </div>
        </FormContainer>
     );
}

export default RegisterScreen;