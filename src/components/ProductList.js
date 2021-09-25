import React from 'react'
import { useFilterContext } from '../context/filter_context'
import GridView from './GridView'
import ListView from './ListView'

const ProductList = () => {
  const { view, filtered_products } = useFilterContext()
  if (filtered_products.length < 1) {
    return (
      <h5 style={{ textTransform: 'none' }}>
        Sorry, no products matched your search...
      </h5>
    )
  }
  if (view === 'list') {
    return <ListView products={filtered_products} />
  }
  return <GridView products={filtered_products} />
}

export default ProductList
