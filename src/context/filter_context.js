import React, { useEffect, useContext, useReducer } from 'react'
import reducer from '../reducers/filter_reducer'
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'
import { useProductsContext } from './products_context'

const initialState = {
  all_products: [],
  filtered_products: [],
  view: 'grid',
  sort: 'price-lowest',
  text: '',
  category: 'all',
  company: 'all',
  color: 'all',
  price: 0,
  max_price: 0,
  shipping: false,
}

const FilterContext = React.createContext()

export const FilterProvider = ({ children }) => {
  const { products } = useProductsContext()
  const [state, dispatch] = useReducer(reducer, initialState)

  // initial product fetching
  useEffect(() => {
    dispatch({ type: LOAD_PRODUCTS, payload: products })
  }, [products])

  // made products sorted for every change on filtered elements
  useEffect(() => {
    dispatch({ type: SORT_PRODUCTS })
  }, [products, state.sort, state.filtered_products])

  // sort functionality
  const sortProducts = (e) => {
    dispatch({
      type: UPDATE_SORT,
      payload: e.target.value,
    })
  }

  // view functionality
  const setGridView = () => {
    dispatch({ type: SET_GRIDVIEW })
  }
  const setListView = () => {
    dispatch({ type: SET_LISTVIEW })
  }

  // filter functionality
  const updateFilters = (e) => {
    dispatch({
      type: UPDATE_FILTERS,
      payload: { name: e.target.name, value: e.target.value },
    })
    dispatch({ type: FILTER_PRODUCTS })
  }

  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS })
  }

  return (
    <FilterContext.Provider
      value={{
        ...state,
        setGridView,
        setListView,
        sortProducts,
        updateFilters,
        clearFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  )
}
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext)
}
