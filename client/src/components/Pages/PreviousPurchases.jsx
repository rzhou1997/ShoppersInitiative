import React, {useContext, useEffect} from 'react'
import {Context} from '../../context/Context'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import { axiosInstance } from '../Utilities/config'

const Container = styled.div`
    overflow-x: auto;
`;
const Title = styled.h2`
    text-align: center;
    margin:20px;
    text-transform: uppercase;
    letter-spacing: 1.2px;
`;
const Content = styled.h4`
    text-align: center;
    margin:20px;
    text-transform: uppercase;
    letter-spacing: 1.2px;
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

const PreviousPurchases = () => {
    const state = useContext(Context)
    const [history, setHistory] = state.FetchUserCart.history
    const [isAdmin] = state.FetchUserCart.isAdmin
    const [token] = state.token
    

    useEffect(() => {
        if(token){
            const getHistory = async() =>{
                if(isAdmin){
                    const res = await axiosInstance.get('/payment/getpayments', {
                        headers: {Authorization: token}
                    })
                    setHistory(res.data)
                }else{
                    const res = await axiosInstance.get('/user/history', {
                        headers: {Authorization: token}
                    })
                    setHistory(res.data)
                }
            }
            getHistory()
        }
    },[token, isAdmin, setHistory])

    return (
        <Container>
            <Title>History</Title>

            <Content>{isAdmin? `There have been ${history.length} orders` : `You have purchsed ${history.length} orders` }</Content>

            <Table>
                <THead>
                    <TR>
                        <TH>Payment ID</TH>
                        <TH>Date of Purchased</TH>
                    </TR>
                </THead>
                <TBody>
                    {
                        history.map(items => (
                            <TR key={items._id}>
                                <TD>{items.paymentID}</TD>
                                <TD>{new Date(items.createdAt).toLocaleDateString()}</TD>
                                <TD><Link to={`/history/${items._id}`}>View</Link></TD>
                            </TR>
                        ))
                    }
                </TBody>
            </Table>
        </Container>
    )
}

export default PreviousPurchases
