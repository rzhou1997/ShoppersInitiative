import {useState, useEffect} from 'react'
import {axiosInstance} from "../../src/components/Utilities/config"

function FetchCategories() {
    const [categories, setCategories] = useState([])
    const [callback, setCallback] = useState(false)

    useEffect(() =>{
        const getCategories = async () =>{
            const res = await axiosInstance.get('/category/getcategories')
            setCategories(res.data)
        }

        getCategories()
    },[callback])
    return {
        categories: [categories, setCategories],
        callback: [callback, setCallback]
    }
}

export default FetchCategories
