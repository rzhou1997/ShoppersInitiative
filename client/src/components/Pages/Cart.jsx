import React, {useContext, useState, useEffect} from 'react'
import {Context} from '../../context/Context'
import {axiosInstance} from "../Utilities/config"
import { useHistory } from 'react-router-dom'
import PaypalButton from '../Utilities/PaypalButton'
import styled from 'styled-components'

const TitleHeader = styled.h2`
  text-align: center;
  font-size:5rem;
`;
const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    padding: 50px;
    font-size: 125%;
    position: relative;
    border: 1px solid #ccc;
    transform: scaleY(0.98);
`;
const Image = styled.img`
    max-width: 400px;
    width: 100%;
    margin: 20px;
    object-fit: cover;
    display: block;
`;
const Wrapper = styled.div`
    max-width: 500px;
    width: 100%;
    margin: 5px 20px;
`;
const DetailsDescriptionRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
const Title = styled.h2`
    text-transform: uppercase;
    color: darkblue;
    letter-spacing: 2px;
    font-weight: 2rem;
`;
const Price = styled.h3``;
const OtherDetails = styled.p`
    line-height: 1.5;
    margin: 10px 0;
    opacity: 0.8;
`;
const Amount = styled.div``;
const Button = styled.button`
  width: 40px;
  height: 40px;
  border: 1px solid #777;
`;
const QuantitySpan = styled.span`
  color: black;
  padding: 0 20px;
`;
const Id = styled.h6``;
const Delete = styled.div`
  position: absolute;
  top:0;
  right: 5px;
  color: crimson;
  font-weight: 900;
  cursor: pointer;
`;
const Total = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Cart = () => {
    const state = useContext(Context)
    const [cart, setCart] = state.FetchUserCart.cart
    const [token] = state.token
    const [total, setTotal] = useState(0)
    const history = useHistory();

    useEffect(() =>{
        const getTotal = () =>{
            const total = cart.reduce((prev, item) => {
                return prev + (item.price * item.quantity)
            },0)

            setTotal(total)
        }

        getTotal()

    },[cart])

    const addToCart = async (cart) =>{
        await axiosInstance.patch('/user/addcart', {cart}, {
            headers: {Authorization: token}
        })
    }


    const increment = (id) =>{
        cart.forEach(item => {
            if(item._id === id){
                item.quantity += 1
            }
        })

        setCart([...cart])
        addToCart(cart)
    }

    const decrement = (id) =>{
        cart.forEach(item => {
            if(item._id === id){
                item.quantity === 1 ? item.quantity = 1 : item.quantity -= 1
            }
        })

        setCart([...cart])
        addToCart(cart)
    }

    const removeProduct = id =>{
        if(window.confirm("Do you want to delete this product?")){
            cart.forEach((item, index) => {
                if(item._id === id){
                    cart.splice(index, 1)
                }
            })

            setCart([...cart])
            addToCart(cart)
        }
    }

    const tranSuccess = async(payment) => {
        const {paymentID, address} = payment;

        await axiosInstance.post('/payment/createpayment', {cart, paymentID, address}, {
            headers: {Authorization: token}
        })

        setCart([])
        addToCart([])
        alert("You have successfully placed an order.")
        history.push("/")
        window.location.reload()
    }


    if(cart.length === 0) 
        return <TitleHeader>Cart Empty</TitleHeader> 

    return (
        <div>
            {
                cart.map(product => (
                    <Container key={product._id}>
                        <Image src={product.images.url} alt="" />

                        <Wrapper>
                            <DetailsDescriptionRow>
                                <Title>Title: {product.title}</Title>
                                <Id>ID: {product._id}</Id>
                            </DetailsDescriptionRow>
                            

                            <Price>$ {product.price * product.quantity}</Price>
                            <OtherDetails>{product.description}</OtherDetails>
                            <OtherDetails>{product.content}</OtherDetails>

                            <Amount>
                                <Button onClick={() => decrement(product._id)}> - </Button>
                                <QuantitySpan>{product.quantity}</QuantitySpan>
                                <Button onClick={() => increment(product._id)}> + </Button>
                            </Amount>
                            
                            <Delete onClick={() => removeProduct(product._id)}>X</Delete>
                        </Wrapper>
                    </Container>
                ))
            }

            <Total>
                <Price>Total: $ {total}</Price>
                <PaypalButton
                total={total}
                tranSuccess={tranSuccess} />
            </Total>
        </div>
    )
}

export default Cart
