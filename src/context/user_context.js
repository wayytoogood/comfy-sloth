import React, { useContext, useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

const UserContext = React.createContext()
export const UserProvider = ({ children }) => {
  const [isUser, setIsUser] = useState(null)

  const { loginWithRedirect, logout, user } = useAuth0()

  useEffect(() => {
    setIsUser(user)
  }, [user])

  return (
    <UserContext.Provider
      value={{
        loginWithRedirect,
        logout,
        isUser,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
// make sure use
export const useUserContext = () => {
  return useContext(UserContext)
}
