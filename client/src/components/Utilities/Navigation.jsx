import React, {useContext} from 'react'
import {Switch, Route} from 'react-router-dom'
import Products from '../Pages/Products'
import Details from '../Pages/Details'
import Login from '../Pages/Login'
import PreviousPurchases from '../Pages/PreviousPurchases'
import OrderDetails from '../Pages/OrderDetails'
import Cart from '../Pages/Cart'
import Categories from '../Pages/Categories'
import ProductCreation from '../Pages/ProductCreation'

import {Context} from '../../context/Context'


function Pages() {
    const state = useContext(Context)
    const [isLogged] = state.FetchUserCart.isLogged
    const [isAdmin] = state.FetchUserCart.isAdmin


    return (
        <Switch>
            <Route path="/" exact component={Products} />
            <Route path="/detail/:id" exact component={Details} />

            <Route path="/login" exact component={isLogged ? Products : Login} />
            

            <Route path="/category" exact component={isAdmin ? Categories : Products} />
            <Route path="/create_product" exact component={isAdmin ? ProductCreation : Products} />
            <Route path="/edit_product/:id" exact component={isAdmin ? ProductCreation : Products} />

            <Route path="/history" exact component={PreviousPurchases} />
            <Route path="/history/:id" exact component={OrderDetails} />

            <Route path="/cart" exact component={Cart} />


        </Switch>
    )
}

export default Pages
