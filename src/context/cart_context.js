import React, { useEffect, useContext, useReducer } from 'react'
import reducer from '../reducers/cart_reducer'
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  CLEAR_CART,
  COUNT_CART_TOTALS,
} from '../actions'

// getting cart items from local
const cartInitial = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : []

const initialState = {
  cart: cartInitial,
  total_items: 0,
  total_price: 0,
  shipping_cost: 768,
  shipping_fee: 0,
}

const CartContext = React.createContext()

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  // setting local storage and total values every time cart updates
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cart))
    dispatch({ type: COUNT_CART_TOTALS })
  }, [state.cart])

  const addToCart = (product, amount, color) => {
    const { id, name, price, images, shipping, stock } = product
    const {
      thumbnails: {
        large: { url: img },
      },
    } = images[0]
    dispatch({
      type: ADD_TO_CART,
      payload: { id, name, img, color, price, amount, shipping, stock },
    })
  }

  const removeItem = (id, color) => {
    dispatch({ type: REMOVE_CART_ITEM, payload: { id, color } })
  }

  const toggleAmount = (id, amount, color) => {
    dispatch({ type: TOGGLE_CART_ITEM_AMOUNT, payload: { id, amount, color } })
  }

  const clearCart = () => {
    dispatch({ type: CLEAR_CART, payload: null })
  }

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        removeItem,
        toggleAmount,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
// make sure use
export const useCartContext = () => {
  return useContext(CartContext)
}
