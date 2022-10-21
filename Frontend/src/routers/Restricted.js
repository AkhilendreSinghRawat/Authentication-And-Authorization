import React from 'react'

import { Navigate } from 'react-router-dom'
import Auth from '../utils/Auth'

const Restricted = ({ children }) => {
  const auth = Auth()

  return auth ? <Navigate to="/" /> : children
}

export default Restricted
