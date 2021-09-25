import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions'

const cart_reducer = (state, action) => {
  const { type, payload } = action
  const { cart, shipping_cost } = state
  switch (type) {
    case ADD_TO_CART:
      let newCart = [...cart]
      const isInCart = newCart.find(
        (item) => item.id === payload.id && item.color === payload.color
      )

      if (isInCart) {
        const newAmount = isInCart.amount + payload.amount
        if (newAmount <= payload.stock) isInCart.amount += payload.amount
      } else {
        newCart = [...newCart, payload]
      }

      return { ...state, cart: newCart }
    case REMOVE_CART_ITEM:
      const removedCart = cart.filter((item) => {
        if (item.id !== payload.id) {
          return item
        }
        if (item.color !== payload.color) {
          return item
        }
        return false
      })
      return { ...state, cart: removedCart }
    case TOGGLE_CART_ITEM_AMOUNT:
      const toggledCart = cart.map((item) => {
        if (item.id === payload.id && item.color === payload.color) {
          item.amount = payload.amount
        }
        return item
      })
      return { ...state, cart: toggledCart }
    case COUNT_CART_TOTALS:
      const { itemCount, totalPrice, shippingFee } = cart.reduce(
        (acc, curr) => {
          acc.itemCount += curr.amount
          acc.totalPrice += curr.amount * curr.price
          if (!curr.shipping) {
            acc.shippingFee += shipping_cost
          }
          return acc
        },
        { itemCount: 0, totalPrice: 0, shippingFee: 0 }
      )
      return {
        ...state,
        total_items: itemCount,
        total_price: totalPrice,
        shipping_fee: shippingFee,
      }
    case CLEAR_CART:
      return { ...state, cart: [] }
    default:
      throw new Error(`No matching "${type}" - action type`)
  }
}

export default cart_reducer
