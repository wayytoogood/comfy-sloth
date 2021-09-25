import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'

const filter_reducer = (state, action) => {
  const { type, payload } = action

  switch (type) {
    case LOAD_PRODUCTS:
      const maxPrice = payload.reduce((max, item) => {
        if (item.price > max) max = item.price
        return max
      }, 0)
      return {
        ...state,
        all_products: [...payload],
        filtered_products: [...payload],
        price: maxPrice,
        max_price: maxPrice,
      }
    case SET_GRIDVIEW:
      return { ...state, view: 'grid' }
    case SET_LISTVIEW:
      return { ...state, view: 'list' }
    case UPDATE_SORT:
      return { ...state, sort: payload }
    case SORT_PRODUCTS:
      const { sort, filtered_products } = state
      let sortedProducts = [...filtered_products]
      if (sort === 'price-lowest') {
        sortedProducts = filtered_products.sort((a, b) => a.price - b.price)
      }
      if (sort === 'price-highest') {
        sortedProducts = filtered_products.sort((a, b) => b.price - a.price)
      }
      if (sort === 'name-a') {
        sortedProducts = filtered_products.sort((a, b) =>
          a.name.localeCompare(b.name)
        )
      }
      if (sort === 'name-z') {
        sortedProducts = filtered_products.sort((a, b) =>
          b.name.localeCompare(a.name)
        )
      }
      return { ...state, filtered_products: sortedProducts }
    case UPDATE_FILTERS:
      const { name, value } = payload
      if (name === 'shipping') {
        return { ...state, [name]: !state.shipping }
      }
      return { ...state, [name]: value }
    case FILTER_PRODUCTS:
      const updatedFiltered = state.all_products
        .filter((item) => item.name.startsWith(state.text.toLowerCase()))
        .filter((item) => {
          if (state.category === 'all' || item.category === state.category)
            return item
          return false
        })
        .filter((item) => {
          if (state.company === 'all' || item.company === state.company)
            return item
          return false
        })
        .filter((item) => {
          if (state.color === 'all' || item.colors.includes(state.color))
            return item
          return false
        })
        .filter((item) => {
          if (!state.shipping) return item
          else return item.shipping
        })
        .filter((item) => item.price <= Number(state.price))
      return { ...state, filtered_products: updatedFiltered }
    case CLEAR_FILTERS:
      return {
        ...state,
        text: '',
        category: 'all',
        company: 'all',
        color: 'all',
        price: state.max_price,
        shipping: false,
        filtered_products: [...state.all_products],
      }
    default:
      throw new Error(`No Matching "${action.type}" - action type`)
  }
}

export default filter_reducer
