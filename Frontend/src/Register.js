import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from './api/axios'

const Register = () => {
  const emailRef = useRef()
  const passwordRef = useRef()
  const confirmPasswordRef = useRef()

  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    if (passwordRef?.current?.value !== confirmPasswordRef?.current?.value) {
      setErrorMessage("Password Didn't Match!")
      setShowError(true)
      setTimeout(() => setShowError(false), 2000)
      return
    }

    axios
      .post('/register', {
        email: emailRef?.current?.value,
        password: passwordRef?.current?.value,
      })
      .then((res) => {
        if (res.status === 200) {
          navigate('/signin')
          return
        }
        console.log('Something went wrong')
      })
      .catch((err) => {
        setErrorMessage(err?.response?.data.message)
        setShowError(true)
        setTimeout(() => setShowError(false), 2000)
      })
  }

  return (
    <div className="Component">
      <form className="Form" onSubmit={handleSubmit}>
        {showError && <div className="Warning">{errorMessage}</div>}
        <label>Email</label>
        <input
          className="Input"
          id="email"
          type="email"
          required
          ref={emailRef}
        />
        <label>Password</label>
        <input
          className="Input"
          id="password"
          type="password"
          required
          ref={passwordRef}
        />
        <label>ConfirmPassword</label>
        <input
          className="Input"
          id="confirmPassword"
          type="password"
          required
          ref={confirmPasswordRef}
        />
        <button className="Submit" type="submit">
          Sign Up
        </button>
        <div>Already Registered?</div>
        <a href="/signin">Sign In</a>
      </form>
    </div>
  )
}

export default Register
