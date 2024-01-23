import { Link, useNavigate } from "react-router-dom"
import './Navbar.css'

export default function Navbar() {
  const Navigate = useNavigate();

  const auth = JSON.parse(localStorage.getItem('auth'))

  function handleClick() {
    localStorage.clear();
    Navigate('/sinup');

  }



  return (
    <>
      {
        auth ?
          <div className="nav-container">
            <div className="nav">
              <Link to={'/'} className="nav-scanners">Inventory Management System</Link>
              <Link to={'/create'}>generateQrCode</Link>

              <Link to={'/qr'} >ScanQrCode</Link>
              <div className="sinout"> <Link className="sinou" to={'/sinup'} onClick={handleClick}>SinOut</Link></div>
            </div>

          </div>
          :
          <div className="navs">
            <Link to={'/login'} className="login">Login</Link>
            <Link to={'/sinup'} className="sinup">SinUp</Link>
          </div>
      }

    </>
  )
}