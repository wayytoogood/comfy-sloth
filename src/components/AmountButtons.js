import React from 'react'
import styled from 'styled-components'
import { FaPlus, FaMinus } from 'react-icons/fa'
import { useEffect } from 'react'
import { useCartContext } from '../context/cart_context'

const AmountButtons = ({ item, amount, setAmount, inCart }) => {
  const { id, stock, color } = item

  const { toggleAmount } = useCartContext()

  useEffect(() => {
    if (inCart) {
      toggleAmount(id, amount, color)
    }
    // eslint-disable-next-line
  }, [amount])

  const handleAmount = (operation) => {
    if (operation === 'inc') {
      setAmount((oldAmount) => {
        const newAmount = oldAmount + 1
        if (newAmount > stock) {
          return stock
        }
        return newAmount
      })
    } else {
      setAmount((oldAmount) => {
        const newAmount = oldAmount - 1
        if (newAmount < 1) {
          return 1
        }
        return newAmount
      })
    }
  }

  return (
    <Wrapper>
      <button className='amount-btn' onClick={() => handleAmount('dec')}>
        <FaMinus />
      </button>
      <h2 className='amount'>{inCart ? item.amount : amount}</h2>
      <button className='amount-btn' onClick={() => handleAmount('inc')}>
        <FaPlus />
      </button>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: grid;
  width: 140px;
  justify-items: center;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  h2 {
    margin-bottom: 0;
  }
  button {
    background: transparent;
    border-color: transparent;
    cursor: pointer;
    padding: 1rem 0;
    width: 2rem;
    height: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  h2 {
    margin-bottom: 0;
  }
`

export default AmountButtons
