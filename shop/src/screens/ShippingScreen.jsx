import React from "react";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {saveShippingAddress} from '../actions/cartActions'
import CheckoutSteps from "../components/CheckoutSteps";

function ShippingScreen() {

    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart

    const dispatch = useDispatch()

    const nav = useNavigate()
    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCOde)
    const [country, setCountry] = useState(shippingAddress.country)

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({address, city, postalCode, country}))
        nav('/payment')
    }

    return ( 
        <FormContainer>
            <CheckoutSteps step1 step2/>
            <h1>Shipping</h1>
            <form onSubmit={submitHandler}>
                <div className="form-group login-form" id="address">
                    <label htmlFor="address">Address</label>
                    <input 
                    required
                    type="text" 
                    className="form-control login" 
                    placeholder="Enter address" 
                    value={address ? address : ''}
                    onChange={(e)=> setAddress(e.target.value)}
                    />
                </div>
                <div className="form-group login-form" id="city">
                    <label htmlFor="city">City</label>
                    <input 
                    required
                    type="text" 
                    className="form-control login" 
                    placeholder="Enter city" 
                    value={city ? city : ''}
                    onChange={(e)=> setCity(e.target.value)}
                    />
                </div>
                <div className="form-group login-form" id="postalCode">
                    <label htmlFor="postalCode">Postal Code</label>
                    <input 
                    required
                    type="text" 
                    className="form-control login" 
                    placeholder="Enter postal code" 
                    value={postalCode ? postalCode : ''}
                    onChange={(e)=> setPostalCode(e.target.value)}
                    />
                </div>
                <div className="form-group login-form" id="country">
                    <label htmlFor="country">Country</label>
                    <input 
                    required
                    type="text" 
                    className="form-control login" 
                    placeholder="Enter country" 
                    value={country ? country : ''}
                    onChange={(e)=> setCountry(e.target.value)}
                    />
                </div>

                <button type="submit" className="btn btn-primary bg-primary px-5 md-block">Continue</button>
            </form>
        </FormContainer>
     );
}

export default ShippingScreen;