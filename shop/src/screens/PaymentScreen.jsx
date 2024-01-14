import React from "react";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { useState} from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Col } from "react-bootstrap";
import {savePaymentMethod} from '../actions/cartActions'
import CheckoutSteps from "../components/CheckoutSteps";


function PaymentScreen() {
    const nav = useNavigate()

    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart

    const dispatch = useDispatch()
    const [paymentMethod, setPaymentMethods ] = useState('Paystack')

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        nav('/placeorder')
    }

    if (!shippingAddress.address) {
        nav('/shipping')
    }
    return ( 
        <FormContainer>
            <CheckoutSteps step1 step2 step3/>

            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as='legend'>Select Method</Form.Label>
                    <Col>
                        <Form.Check 
                        type="radio"
                        label='Paystack or Credit Card'
                        id='Paystack'
                        name="paymentMethod"
                        checked
                        onChange={(e) => setPaymentMethods(e.target.value)}
                        >
                        </Form.Check>
                    </Col>
                </Form.Group>
                <Button type="submit" variant="primary">Continue</Button>
            </Form>
        </FormContainer>
     );
}

export default PaymentScreen;