import React, {useContext} from 'react'
import {Context} from '../../context/Context'
import styled from 'styled-components'
const FilterMenu = styled.div`
  width: 100%;
  min-height: 40px;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin: 15px 0;
`;

const FilterWrapper = styled.div``;

const CategorySelect = styled.select`
  border: 1px solid #ccc;
  outline: none;
  height: 40px;
  padding: 0 5px;
`;

const SearchInput = styled.input`
  border: 1px solid #ccc;
  outline: none;
  height: 40px;
  padding: 0 5px;
  flex: 1;
  margin: 0 10px;
`;

const Option = styled.option``;

const Filters = () => {
    const state = useContext(Context)
    const [categories] = state.FetchCategories.categories
    const [isAdmin] = state.FetchUserCart.isAdmin


    const [category, setCategory] = state.FetchProducts.category
    const [sort, setSort] = state.FetchProducts.sort
    const [search, setSearch] = state.FetchProducts.search


    const handleCategory = e => {
        setCategory(e.target.value)
        setSearch('')
    }

    return (
        <FilterMenu>
            <FilterWrapper>
                <span>Filters: </span>
                <CategorySelect value={category} onChange={handleCategory} >
                    <Option value=''>All Products</Option>
                    {
                        categories.map(category => (
                            <Option value={"category=" + category._id} key={category._id}>
                                {category.name}
                            </Option>
                        ))
                    }
                </CategorySelect>
            </FilterWrapper>
            <SearchInput type="text" value={search} placeholder="Enter your search!" onChange={e => setSearch(e.target.value.toLowerCase())} />
            <FilterWrapper>
                <span>Sort By: </span>
                <CategorySelect value={sort} onChange={e => setSort(e.target.value)} >
                    <Option value=''>Newest</Option>
                    <Option value='sort=oldest'>Oldest</Option>
                    {
                        isAdmin && (
                            <Option value='sort=-sold'>Best sales</Option>
                        )
                    }
                    <Option value='sort=-price'>Price: High-Low</Option>
                    <Option value='sort=price'>Price: Low-High</Option>
                </CategorySelect>
            </FilterWrapper>
        </FilterMenu>
    )
}

export default Filters
