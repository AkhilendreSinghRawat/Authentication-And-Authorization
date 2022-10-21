import React from 'react'
import Home from '../Home'
import Signin from '../Signin'
import Register from '../Register'
import Restricted from './Restricted'
import ProtectedRoutes from './ProtectedRoute'
import { Routes, Route } from 'react-router-dom'

const Routing = () => {
  return (
    <Routes>
      <Route
        path="/"
        exact
        element={
          <ProtectedRoutes>
            <Home />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/signup"
        exact
        element={
          <Restricted>
            <Register />
          </Restricted>
        }
      />
      <Route
        path="/signin"
        exact
        element={
          <Restricted>
            <Signin />
          </Restricted>
        }
      />
    </Routes>
  )
}

export default Routing
