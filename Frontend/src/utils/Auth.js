const Auth = () => {
  const user = sessionStorage.getItem('accessToken')

  if (user) {
    return true
  } else {
    return false
  }
}

export default Auth
