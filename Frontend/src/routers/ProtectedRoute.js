import React from 'react'

import { Navigate } from 'react-router-dom'
import Auth from '../utils/Auth'

const ProtectedRoutes = ({ children }) => {
  const auth = Auth()

  return auth ? children : <Navigate to="/signin" />
}

export default ProtectedRoutes
