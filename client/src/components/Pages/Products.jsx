import React, {useContext, useState} from 'react'
import {Context} from '../../context/Context'
import ProductItem from '../Utilities/ProductItem'
import Filters from '../Utilities/Filters'
import styled from 'styled-components';
import { axiosInstance } from '../Utilities/config'

const Paginate = styled.div`
    text-align: center;
`

const Button = styled.button`
    padding: 10px 25px;
    margin-bottom: 20px;
    border: 1px solid #555;
    text-transform: capitalize;
`

const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  justify-items: center;
  margin: 20px 0;
`;
const RemoveAllContainer = styled.div`
  text-align: right;
  margin: 20px;
`
const Span = styled.span`
  color: turquoise;
  letter-spacing: 1.3px;
`;
const Input = styled.input`
  height: 25px;
  width: 25px;
  transform: translateY(5px);
  margin: 0 15px;
`;
const ButtonDeleteAll = styled.button`
  border: 1px solid crimson;
  padding: 10px 25px;
  color: red;
`;

function Products() {
    const state = useContext(Context)
    const [products, setProducts] = state.FetchProducts.products
    const [isAdmin] = state.FetchUserCart.isAdmin
    const [token] = state.token
    const [callback, setCallback] = state.FetchProducts.callback
    const [isCheck, setIsCheck] = useState(false)
    const [page, setPage] = state.FetchProducts.page
    const [result] = state.FetchProducts.result

    const handleCheck = (id) =>{
        products.forEach(product => {
            if(product._id === id) product.checked = !product.checked
        })
        setProducts([...products])
    }

    const deleteProduct = async(id, public_id) => {
        try {
            await axiosInstance.post('/upload/deleteitem', {public_id},{headers: {Authorization: token}})
            await axiosInstance.delete(`/product/deleteproduct/${id}`, {headers: {Authorization: token}})
            setCallback(!callback)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const checkAll = () =>{
        products.forEach(product => {
            product.checked = !isCheck
        })
        setProducts([...products])
        setIsCheck(!isCheck)
    }

    const deleteAll = () =>{
        products.forEach(product => {
            if(product.checked) deleteProduct(product._id, product.images.public_id)
        })
    }

    return (
        <>
        <Filters />
        {
            isAdmin && (
                <RemoveAllContainer>
                    <Span>Select all</Span>
                    <Input type="checkbox" checked={isCheck} onChange={checkAll} />
                    <ButtonDeleteAll onClick={deleteAll}>Delete</ButtonDeleteAll>
                </RemoveAllContainer>
            )
        }

        <Container>
            {
                products.map(product => {
                    return <ProductItem key={product._id} product={product}
                    isAdmin={isAdmin} deleteProduct={deleteProduct} handleCheck={handleCheck} />
                })
            } 
        </Container>

        <Paginate>
            {
                result < page * 6 ? ""
                : <Button onClick={() => setPage(page+1)}>Load more</Button>
            }
        </Paginate>
        </>
    )
}

export default Products
