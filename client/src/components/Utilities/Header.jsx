import React, {useContext} from 'react'
import {Context} from '../../context/Context'
import Menu from './icon/menu.svg'
import Close from './icon/close.svg'
import Cart from './icon/cart.svg'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import { axiosInstance } from './config'
const Container = styled.div`
  min-height: 70px;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  border-bottom: 1px solid #ddd;
  a{
    color: #555;
  }
`;

const UnOrderedList = styled.ul`
  display: inline-block;
  padding: 0 20px;

`;

const OrderedList = styled.li`
  display: inline-block;
  padding: 0 20px;
`;

const LogoContainer = styled.h1`
  flex: 1;
`;

const Hide = styled.div`
  display: none;
`;

const Image = styled.img``;

const CartContainer = styled.div`
  position: relative;
  margin-right: 20px;
`;

const CartContainerSpan = styled.div`
  background: crimson;
  border-radius: 20px;
  color: white;
  position: absolute;
  top:-10px;
  right: -10px;
  padding: 5px 7px;
  font-size: 10px;
`;

function Header() {
    const state = useContext(Context)
    const [isLogged] = state.FetchUserCart.isLogged
    const [isAdmin] = state.FetchUserCart.isAdmin
    const [cart] = state.FetchUserCart.cart

    const logoutUser = async () =>{
        await axiosInstance.get('/user/logout')
        
        localStorage.removeItem('firstLogin')
        
        window.location.href = "/";
    }
    return (
        <Container>
            <Hide><Image src={Menu} alt="" width="30" /></Hide>
            <LogoContainer><Link to="/">ShoppersInitiative</Link></LogoContainer>

            <UnOrderedList>

                {isAdmin && (
                    <>
                        <OrderedList><Link to="/create_product">Create Product</Link></OrderedList>
                        <OrderedList><Link to="/category">Categories</Link></OrderedList>
                    </>
                )}

                {
                    isLogged ? 
                    <>
                        <OrderedList><Link to="/history">{isAdmin ? 'Orders' : 'History'}</Link></OrderedList>
                        <OrderedList><Link to="/" onClick={logoutUser}>Logout</Link></OrderedList>
                    </> 
                    : 
                    <OrderedList><Link to="/login">Login ✥ Register</Link></OrderedList>
                }

                <OrderedList><Hide><Image src={Close} alt="" width="30"/></Hide></OrderedList>

            </UnOrderedList>

            {
                !isAdmin && (
                    <CartContainer>
                        <CartContainerSpan>{cart.length}</CartContainerSpan>
                        <Link to="/cart"><Image src={Cart} alt="" width="30" /></Link>
                    </CartContainer>
                )
            }
            
        </Container>
    )
}

export default Header
