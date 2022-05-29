import React, {useState, useContext, useEffect} from 'react'
import {Context} from '../../context/Context'
import {useHistory, useParams} from 'react-router-dom'
import styled from 'styled-components'
import './cssFiles/productCreation.css'
import { axiosInstance } from '../Utilities/config'


const Container = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-around;
`;
const Upload = styled.div`
    max-width: 450px;
    height: 500px;
    width: 100%;
    border: 1px solid #ddd;
    padding: 15px;
    margin: 20px;
    position: relative;
    
`;
const Input = styled.input`
    width: 100%;
    min-height: 40px;
    padding: 0 5px;
`;

const Form = styled.form`
    max-width: 500px;
    min-width: 290px;
    width: 100%;
    margin: 15px 30px;
`;
const Row = styled.div`
    width: 100%;
    margin: 15px 0;
`;
const Label = styled.label``;
const Select = styled.select``;
const Option = styled.option``;
const TextArea = styled.textarea`
    width: 100%;
    min-height: 40px;
    padding: 0 5px;
`;
const Button = styled.button`
    width: 200px;
    height: 40px;
    background: #555;
    color: white;
    text-transform: uppercase;
    letter-spacing: 2px;
    font-weight: 700;
`;
const initialState = {
    title: '',
    price: 0,
    description: '',
    content: '',
    category: '',
    _id: ''
}

const ProductCreation = () => {
    const state = useContext(Context)
    const [product, setProduct] = useState(initialState)
    const [categories] = state.FetchCategories.categories
    const [images, setImages] = useState(false)


    const [isAdmin] = state.FetchUserCart.isAdmin
    const [token] = state.token

    const history = useHistory()
    const param = useParams()

    const [products] = state.FetchProducts.products
    const [onEdit, setOnEdit] = useState(false)
    const [callback, setCallback] = state.FetchProducts.callback

    useEffect(() => {
        if(param.id){
            setOnEdit(true)
            products.forEach(product => {
                if(product._id === param.id) {
                    setProduct(product)
                    setImages(product.images)
                }
            })
        }else{
            setOnEdit(false)
            setProduct(initialState)
            setImages(false)
        }
    }, [param.id, products])

    const handleUpload = async e =>{
        e.preventDefault()
        try {
            if(!isAdmin) return alert("You're not an admin")
            const file = e.target.files[0]
            
            if(!file) return alert("File not exist.")

            if(file.size > 1024 * 1024) // 1mb
                return alert("Size too large!")

            if(file.type !== 'image/jpeg' && file.type !== 'image/png') // 1mb
                return alert("File format is incorrect.")

            let formData = new FormData()
            formData.append('file', file)

            const res = await axiosInstance.post('/upload/newitem', formData, {
                headers: {'content-type': 'multipart/form-data', Authorization: token}
            })
            setImages(res.data)

        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const handleDestroy = async () => {
        try {
            if(!isAdmin) return alert("You're not an admin")
            await axiosInstance.post('/upload/deleteitem', {public_id: images.public_id}, {
                headers: {Authorization: token}
            })
            setImages(false)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const handleChangeInput = e =>{
        const {name, value} = e.target
        setProduct({...product, [name]:value})
    }

    const handleSubmit = async e =>{
        e.preventDefault()
        try {
            if(!isAdmin) return alert("You're not an admin")
            if(!images) return alert("No Image Upload")

            if(onEdit){
                await axiosInstance.put(`/product/updateproduct/${product._id}`, {...product, images}, {
                    headers: {Authorization: token}
                })
            }else{
                await axiosInstance.post('/product/createproduct', {...product, images}, {
                    headers: {Authorization: token}
                })
            }
            setCallback(!callback)
            history.push("/")
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const styleUpload = {
        display: images ? "block" : "none"
    }
    return (
        <Container>
            <Upload>
                <input type="file" name="file" id="uploaded_img" onChange={handleUpload}/>
                <div id="file_img" style={styleUpload}>
                    <img src={images ? images.url : ''} alt=""/>
                    <span onClick={handleDestroy}>X</span>
                </div>
                
            </Upload>

            <Form onSubmit={handleSubmit}>
                <Row>
                    <Label htmlFor="title">Title</Label>
                    <Input type="text" name="title" id="title" required value={product.title} onChange={handleChangeInput} />
                </Row>

                <Row>
                    <Label htmlFor="price">Price</Label>
                    <Input type="number" name="price" id="price" required value={product.price} onChange={handleChangeInput} />
                </Row>

                <Row>
                    <Label htmlFor="description">Description</Label>
                    <TextArea type="text" name="description" id="description" required value={product.description} rows="5" onChange={handleChangeInput} />
                </Row>

                <Row>
                    <Label htmlFor="content">Content</Label>
                    <TextArea type="text" name="content" id="content" required value={product.content} rows="7" onChange={handleChangeInput} />
                </Row>

                <Row>
                    <Label htmlFor="categories">Categories: </Label>
                    <Select name="category" value={product.category} onChange={handleChangeInput} >
                        <Option value="">Please select a category</Option>
                        {
                            categories.map(category => (
                                <Option value={category._id} key={category._id}>
                                    {category.name}
                                </Option>
                            ))
                        }
                    </Select>
                </Row>

                <Button type="submit">{onEdit? "Update" : "Create"}</Button>
            </Form>
        </Container>
    )
}

export default ProductCreation
