import React from "react";

import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/loader";
import Message from "../components/message";
import { useEffect } from "react";
import {Table, Button} from 'react-bootstrap'
import { listUsers, deleteUser } from "../actions/userActions";
import { useNavigate } from "react-router-dom";

function UserListScreen() {

    const nav = useNavigate()
    const dispatch = useDispatch()
    
    const userList = useSelector(state => state.userList)
    const { loading, error, users } = userList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userDelete = useSelector(state => state.userDelete)
    const { success: successDelete } = userDelete

    useEffect(() => {
        if (userInfo && userInfo.isAdmin){
            dispatch(listUsers())
        } else {
            nav('/login')
        }
        dispatch(listUsers())
    }, [dispatch, nav, successDelete, userInfo])

    const deleteHandler = (id) => {
        if(window.confirm('Are you sure you want to delete this user?')) {
            dispatch(deleteUser(id))
        }
    }
    return ( 
        <div>
            <h1>Users</h1>
            {loading 
                ? (<Loader />)
                : error
                    ? (<Message color='alert alert-danger' error={error}/>)
                    : (
                        <Table striped bordered hover responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>NAME</th>
                                    <th>EMAIL</th>
                                    <th>ADMIN</th>
                                    <th></th>
                                </tr>
                            </thead>

                            <tbody>
                                {users.map(user => (
                                    <tr key={user._id}>
                                        <td>{user._id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.isAdmin ? (
                                            <i className="fas fa-check" style={{color:'green'}}></i>)
                                        : (
                                            <i className="fas fa-check" style={{color:'red'}}></i>
                                        )}
                                        </td>
                                        <td>
                                            <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                                <Button variant='light' className='btn-sm'>
                                                    <i className="fas fa-edit"></i>
                                                    Edit
                                                </Button>
                                            </LinkContainer>

                                            <Button 
                                            variant='danger' 
                                            className='btn-sm'
                                            onClick={() => deleteHandler(user._id)}>
                                                <i className="fas fa-trash"></i>
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
        </div>
     );
}

export default UserListScreen;