const Auth = () => {
  const user = sessionStorage.getItem('token')

  if (user) {
    return true
  } else {
    return false
  }
}

export default Auth
