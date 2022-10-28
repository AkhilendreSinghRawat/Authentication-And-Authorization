import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from './api/axios'

const Signin = () => {
  const emailRef = useRef()
  const passwordRef = useRef()

  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    axios
      .post('/login', {
        email: emailRef?.current?.value,
        password: passwordRef?.current?.value,
      })
      .then((res) => {
        if (res.status === 200) {
          sessionStorage.setItem(
            'token',
            JSON.stringify({
              accessToken: res?.data?.accessToken,
              refreshToken: res?.data?.refreshToken,
            })
          )
          navigate('/')
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
        <button className="Submit" type="submit">
          Sign In
        </button>
        <div>Not Registered?</div>
        <a href="/signup">Sign Up</a>
      </form>
    </div>
  )
}

export default Signin
