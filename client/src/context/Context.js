import React, {createContext, useState, useEffect} from 'react'
import FetchProducts from '../api/FetchProducts'
import FetchUserCart from '../api/FetchUserCart'
import FetchCategories from '../api/FetchCategories'
import { axiosInstance } from '../components/Utilities/config'

export const Context = createContext()


export const ContextProvider = ({children}) =>{
    const [token, setToken] = useState(false)


    useEffect(() =>{
        const firstLogin = localStorage.getItem('firstLogin')
        if(firstLogin){
            const refreshToken = async () =>{
                const res = await axiosInstance.get('/user/refresh_token')
        
                setToken(res.data.accesstoken)
    
                setTimeout(() => {
                    refreshToken()
                }, 10 * 60 * 1000)
            }
            refreshToken()
        }
    },[])


    
    const state = {
        token: [token, setToken],
        FetchProducts: FetchProducts(),
        FetchUserCart: FetchUserCart(token),
        FetchCategories: FetchCategories()
    }

    return (
        <Context.Provider value={state}>
            {children}
        </Context.Provider>
    )
}