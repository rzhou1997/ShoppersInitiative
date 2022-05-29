import React, {useContext, useState, useEffect} from 'react'
import {useParams, Link} from 'react-router-dom'
import {Context} from '../../context/Context'
import ProductItem from '../Utilities/ProductItem'
import styled from 'styled-components'

const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    padding: 50px;
    font-size: 125%;
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
const Image = styled.img`
    max-width: 400px;
    width: 100%;
    margin: 20px;
    object-fit: cover;
    display: block;
`;
const Price = styled.span``;
const OtherDetails = styled.p`
    line-height: 1.5;
    margin: 10px 0;
    opacity: 0.8;
`;
const BuyContainer = styled.div`
    background: black;
    color: white;
    margin-top: 10px;
    padding: 10px 25px;
    display: inline-block;
    text-transform: uppercase;
    letter-spacing: 2px;
`;

const Products = styled.div`
    width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  justify-items: center;
  margin: 20px 0;
`;


const Details = () => {
    const params = useParams()
    const state = useContext(Context)
    const [products] = state.FetchProducts.products
    const addCart = state.FetchUserCart.addCart
    const [detailProduct, setDetailProduct] = useState([])

    useEffect(() =>{
        if(params.id){

            products.forEach(product => {
                if(product._id === params.id) setDetailProduct(product)
            })
        }
    },[params.id, products])

    if(detailProduct.length === 0) return null;

    return (
        <>
            <Container>
                <Image src={detailProduct.images.url} alt="" />
                <Wrapper>
                    <DetailsDescriptionRow>
                        <Title>{detailProduct.title}</Title>
                    </DetailsDescriptionRow>
                    <Price>$ {detailProduct.price}</Price>
                    <OtherDetails>{detailProduct.description}</OtherDetails>
                    <OtherDetails>{detailProduct.content}</OtherDetails>
                    <OtherDetails>Sold: {detailProduct.sold}</OtherDetails>
                    <Link to="/cart" className="cart" onClick={() => addCart(detailProduct)}>
                        <BuyContainer>Buy Now</BuyContainer>
                    </Link>
                </Wrapper>
            </Container>

            
            <Title>Related products</Title>
            <Products>
                {
                    products.map(product => {
                        return product.category === detailProduct.category ? <ProductItem key={product._id} product={product} /> : null
                    })
                }
            </Products>
        </>
    )
}

export default Details
