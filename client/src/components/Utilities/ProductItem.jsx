import React,{useContext} from 'react'
import {Link} from 'react-router-dom'
import {Context} from '../../context/Context'

import styled from 'styled-components'
const Container = styled.div`
    max-width: 300px;
    overflow: hidden;
    padding: 10px;
    box-shadow: 0 0 15px #ddd;
    margin: 10px 0;
    position: relative;
`;
const Image = styled.img`
    width: 100%;
    height: 225px;
    display: block;
    object-fit: cover;
`;
const ProductContainer = styled.div`

`;
const ProductTitle = styled.h2`
    width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    text-transform: capitalize;
    cursor: pointer;
    color: #323232;
`;
const ProductPrice = styled.span`
    color: crimson;

`;
const ProductDescription = styled.p`
    width: 100%;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    height: 75px;
    color:#323232;
`;

const RowButton = styled.div`
    width: 100%;
    display: flex;
    margin-top: 10px;
    a{
        width: 50%;
        text-align: center;
        text-transform: uppercase;
        font-weight: 600;
        letter-spacing:2px;
        color: white;
        padding: 6px;
    }
    #Button1{
        background: #6FBBA1;
        margin-right: 5px;
    }
    #Button2{
        background: teal;
        margin-right: 5px;
        align-items: right;
    }
`;

const Input = styled.input`
    position: relative;
    width: 25px;
    height: 25px;
`;
const ProductItem = ({product, isAdmin, deleteProduct, handleCheck}) = >{
    const state = useContext(Context)
    const addCart = state.FetchUserCart.addCart
    return (
        <Container>
            {
                isAdmin && <Input type="checkbox" checked={product.checked}
                onChange={() => handleCheck(product._id)} />
            }
            <Image src={product.images.url} alt="" />

            <ProductContainer>
                <ProductTitle>{product.title}</ProductTitle>
                <ProductPrice>${product.price}</ProductPrice>
                <ProductDescription>{product.description}</ProductDescription>
            </ProductContainer>

            
            <RowButton>
            {
                isAdmin ? 
                <>
                    <Link id="Button1" to=""onClick={() =>deleteProduct(product._id, product.images.public_id)}>Delete</Link>
                    <Link id="Button2" to={`/edit_product/${product._id}`}>Edit</Link>
                </>
                : <>
                    <Link id="Button1" to="" onClick={() => addCart(product)}>Buy</Link>
                    <Link id="Button2" to={`/detail/${product._id}`}>View</Link>
                </>
            }
                
            </RowButton>
        </Container>
    )
}

export default ProductItem
