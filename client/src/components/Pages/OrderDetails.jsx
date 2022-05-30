import React, {useState, useEffect, useContext} from 'react'
import {useParams} from 'react-router-dom'
import {Context} from '../../context/Context'
import styled from 'styled-components'
const Container = styled.div`
    overflow-x: auto;
`;
const Image = styled.img`
    width:100px;
    height:100px;
    object-fit: cover;
`;
const Table = styled.table`
    margin:auto;
    width: 100%;
`;
const THead = styled.thead``;
const TR = styled.tr`
`;
const TD = styled.td`
    text-align: center;
    padding: 10px;
`;
const TH = styled.th`
    text-align: center;
    padding: 10px;
`;
const TBody = styled.tbody``;
const OrderDetails = () => {
    const state = useContext(Context)
    const [history] = state.FetchUserCart.history
    const [orderDetails, setOrderDetails] = useState([])

    const params = useParams()

    useEffect(() => {
        if(params.id){
            history.forEach(item =>{
                if(item._id === params.id) setOrderDetails(item)
            })
        }
    },[params.id, history])


    if(orderDetails.length === 0) return null;

    return (
        <Container>
            <Table>
                <THead>
                    <TR>
                        <TH>Name</TH>
                        <TH>Address</TH>
                        <TH>Postal Code</TH>
                        <TH>Country Code</TH>
                        <TH>City</TH>
                        <TH>Province</TH>
                    </TR>
                </THead>
                <TBody>
                    <TR>
                        <TD>{orderDetails.address.recipient_name}</TD>
                        <TD>{orderDetails.address.line1}</TD>
                        <TD>{orderDetails.address.postal_code}</TD>
                        <TD>{orderDetails.address.country_code}</TD>
                        <TD>{orderDetails.address.city}</TD>
                        <TD>{orderDetails.address.state}</TD>
                    </TR>
                </TBody>
            </Table>

            <Table style={{margin: "30px 0px"}}>
                <THead>
                    <TR>
                        <TH>Products</TH>
                        <TH>Title</TH>
                        <TH>Quantity</TH>
                        <TH>Price</TH>
                    </TR>
                </THead>
                <TBody>
                    {
                        orderDetails.cart.map(item =>(
                        <TR key={item._id}>
                            <TD><Image src={item.images.url} alt="" /></TD>
                            <TD>{item.title}</TD>
                            <TD>{item.quantity}</TD>
                            <TD>$ {item.price * item.quantity}</TD>
                        </TR>
                        ))
                    }
                    
                </TBody>
            </Table>
        </Container>
    )
}

export default OrderDetails
