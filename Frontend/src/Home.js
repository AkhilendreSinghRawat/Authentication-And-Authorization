import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from './api/axios'

const Home = () => {
  const navigate = useNavigate()
  const [secret, setSecret] = useState()
  const [showSecret, setShowSecret] = useState(false)

  const handleLogout = () => {
    sessionStorage.clear()
    navigate('/signin')
  }

  const generateAccessToken = (token) => {
    if (token?.refreshToken) {
      axios
        .post('/token', { refreshToken: token?.refreshToken })
        .then((res) => {
          sessionStorage.setItem(
            'token',
            JSON.stringify({ ...token, accessToken: res?.data?.accessToken })
          )
          handleSecret()
        })
        .catch((err) => console.log(err))
    } else {
      handleLogout()
    }
  }

  const handleSecret = () => {
    if (showSecret) {
      setShowSecret(false)
      setSecret(null)
      return
    }
    const token = JSON.parse(sessionStorage.getItem('token'))
    if (token?.accessToken) {
      axios
        .get('/data', {
          headers: { authorization: `Bearer ${token?.accessToken}` },
        })
        .then((res) => {
          setSecret(res?.data?.secret)
          setShowSecret(true)
        })
        .catch((err) => {
          generateAccessToken(token)
        })
    } else {
      generateAccessToken(token)
    }
  }

  return (
    <div className="Component">
      {showSecret && <div>{secret}</div>}
      <div>
        <button onClick={handleSecret} className="Secret">
          {showSecret ? <div>Hide Secret</div> : <div>Reveal Secret</div>}
        </button>
      </div>
      <div>
        <button onClick={handleLogout} className="Submit">
          Logout
        </button>
      </div>
    </div>
  )
}

export default Home
