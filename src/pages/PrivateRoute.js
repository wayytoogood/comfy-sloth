import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
// will remove later
// import { useUserContext } from '../context/user_context'

const PrivateRoute = ({ children, ...rest }) => {
  // const { isUser } = useUserContext()    //burda useEffect'le değişen isUser'ımızı kullanamamamızın nedeni sanırım Auth0Provider'dan gelen loading true olduğunda, isUser değerinin bir sonraki render'da yenilenicek olması.
  const { user } = useAuth0()

  return (
    <Route
      {...rest}
      render={() => (user ? children : <Redirect to='/'></Redirect>)}
    ></Route>
  )
}
export default PrivateRoute
