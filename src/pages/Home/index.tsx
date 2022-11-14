import React from 'react'
import { useNavigate } from 'react-router-dom'

import { useCreditCard } from '../../hooks/creditCard'
import { useCart } from '../../hooks/cart'

import NavBar from '../../components/NavBar'
import CaloriesCalcForm from '../../components/CaloriesCalcForm'
import Total from '../../components/Total'
import { Button } from '../../components/Button'

import { Root, Container, Content } from './styles'

const Payment: React.FC = () => {
  // const navigate = useNavigate()
  const { totalData } = useCart()
  const { formIsValid } = useCreditCard()

  return (
    <Root>
      <NavBar actualStep={'payment'} />
      <Container>
        <Content>
          <h1>Calculo de calorias</h1>
          <CaloriesCalcForm />
          <Total
            subTotal={totalData.subTotal}
            shipping={totalData.shippingTotal}
            discount={totalData.discount}
            total={totalData.total}
          />
          <Button type={'submit'} form={'creditCardForm'} disabled={!formIsValid} >
            finalizar o pedido
          </Button>
        </Content>
      </Container>
    </Root>
  )
}

export default Payment
