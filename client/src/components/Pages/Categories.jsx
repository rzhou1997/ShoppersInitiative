import React, {useState, useContext} from 'react'
import {Context} from '../../context/Context'
import styled from 'styled-components'
import { axiosInstance } from '../Utilities/config'

const Container = styled.div`
    max-width: 700px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    margin: 30px auto;
`;
const Form = styled.form`
    width: 290px;
    margin-bottom: 20px;
`;
const Label = styled.label`
    display: block;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    margin-bottom: 10px;
`;
const Input = styled.input`
    width: 210px;
    height: 35px;
    border: none;
    outline: none;
    border-bottom: 1px solid #555;
`;
const Button = styled.button`
    width: 70px;
    height: 35px;
    background: #555;
    color: white;
    margin-left: 10px;
`;
const AllCategories = styled.div``;
const Row = styled.div`
    min-width: 290px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
`;
const CategoryName = styled.p``;
const EditDelete = styled.div``;

const Categories = () => {
    const state = useContext(Context)
    const [categories] = state.FetchCategories.categories
    const [category, setCategory] = useState('')
    const [token] = state.token
    const [callback, setCallback] = state.FetchCategories.callback
    const [onEdit, setOnEdit] = useState(false)
    const [id, setID] = useState('')

    const createCategory = async e =>{
        e.preventDefault()
        try {
            if(onEdit){
                const res = await axiosInstance.put(`/category/updatecategory/${id}`, {name: category}, {
                    headers: {Authorization: token}
                })
                alert(res.data.msg)
            }else{
                const res = await axiosInstance.post('/category/createcategory', {name: category}, {
                    headers: {Authorization: token}
                })
                alert(res.data.msg)
            }
            setOnEdit(false)
            setCategory('')
            setCallback(!callback)
            
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const editCategory = async (id, name) =>{
        setID(id)
        setCategory(name)
        setOnEdit(true)
    }

    const deleteCategory = async id =>{
        try {
            const res = await axiosInstance.delete(`/category/deletecategory/${id}`, {
                headers: {Authorization: token}
            })
            alert(res.data.msg)
            setCallback(!callback)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    return (
        <Container>
            <Form onSubmit={createCategory}>
                <Label htmlFor="category">Category</Label>
                <Input type="text" name="category" value={category} required
                onChange={e => setCategory(e.target.value)} />

                <Button type="submit">{onEdit? "Update" : "Create"}</Button>
            </Form>

            <AllCategories>
                {
                    categories.map(category => (
                        <Row key={category._id}>
                            <CategoryName>{category.name}</CategoryName>
                            <EditDelete>
                                <Button onClick={() => editCategory(category._id, category.name)}>Edit</Button>
                                <Button onClick={() => deleteCategory(category._id)}>Delete</Button>
                            </EditDelete>
                        </Row>
                    ))
                }
            </AllCategories>
        </Container>
    )
}

export default Categories
