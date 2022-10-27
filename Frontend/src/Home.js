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

  const generateAccessToken = () => {
    const refreshToken = sessionStorage.getItem('refreshToken')
    if (refreshToken) {
      axios
        .post('/token', { refreshToken })
        .then((res) => {
          sessionStorage.setItem('accessToken', res?.data?.accessToken)
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
    const accessToken = sessionStorage.getItem('accessToken')
    if (accessToken) {
      axios
        .get('/data', { headers: { authorization: `Bearer ${accessToken}` } })
        .then((res) => {
          setSecret(res?.data?.secret)
          setShowSecret(true)
        })
        .catch((err) => {
          generateAccessToken()
        })
    } else {
      generateAccessToken()
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
