import React from 'react'

function Logout() {
  const handleLogout = () => {
    // Clear user's session or token
    localStorage.removeItem('userToken');
    // Redirect user to login page
    window.location.href = '/';
  }

  return (
    <div onClick={handleLogout}>
      Logout
    </div>
  )
}

export default Logout