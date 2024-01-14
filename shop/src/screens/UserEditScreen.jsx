import React from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/loader";
import Message from "../components/message";
import FormContainer from "../components/FormContainer";
import {getUserDetails, updateUser} from '../actions/userActions'
import { useState, useEffect } from "react";
import { USER_UPDATE_RESET } from "../constants/userConstants";

function UserEditScreen() {
    const {id}= useParams()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)
    

    const nav = useNavigate()
    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const {error, loading, user} = userDetails

    const userUpdate = useSelector(state => state.userUpdate)
    const {error: errorUpdate, loading: loadingUpdate, success: successUpdate} = userUpdate

    useEffect(() => {

        if(successUpdate){
            dispatch({type: USER_UPDATE_RESET})
            nav('/admin/userlist')
        }else {

            if(!user.name || Number(user._id) !== Number(id)){
                dispatch(getUserDetails(id))
            }else{
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }

    }, [user, id, successUpdate, nav])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUser({_id:user._id, name, email, isAdmin}))
    }   
    
    return ( 
        <div>
            <Link to='/admin/userlist'>
                Go Back
            </Link>
            <FormContainer>
                <h1>Edit User</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message color='alert alert-danger' error={error} />}

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

                            <div className="form-group" id="email">
                                <label htmlFor="Email">Email address</label>
                                <input 
                                type="email" 
                                className="form-control" 
                                placeholder="Enter email" 
                                value={email}
                                onChange={(e)=> setEmail(e.target.value)}
                                />
                            </div>

                            <div className="form-group" id='isadmin'>
                                <input 
                                type="checkbox" 
                                label="Is Admin" 
                                checked={isAdmin}
                                onChange={(e)=> setIsAdmin(e.target.checked)}
                                />
                                <label htmlFor="Password">Is Admin</label>
                            </div>

                            <button type="submit" className="btn btn-primary">Update</button>
                        </form>
                    )}

            </FormContainer>
        </div>
     );
}

export default UserEditScreen;