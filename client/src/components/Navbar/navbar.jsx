import style from './navbar.module.css';
import logo from '../../Assets/logoT.png';
import {NavLink} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {GetDecodedCookie} from '../../utils/DecodedCookie';
import Cookies from 'js-cookie';

const NavBar = () => {
  const [login, setLogin] = useState (false);

  useEffect (() => {
    const token = GetDecodedCookie ('cookieToken');
    if (token) {
      setLogin (true);
    } else {
      setLogin (false);
    }
  }, []);

  const handlerCloseSession = () => {
    Cookies.remove ('cookieToken');
    window.location.href = '/login';
  };

  return (
    <div className={style.containNavbar}>
      <div className={style.logo}>
        <img src={logo} alt="" />
      </div>

      <div className={style.options}>
        <NavLink to="/" className={style.link}>
          <p>Inicio</p>
        </NavLink>
        {login === false
          ? <NavLink to="/login" className={style.link}>
              <p>Ingresar</p>
            </NavLink>
          : <NavLink to="/login" className={style.link}>
              <p onClick={handlerCloseSession}>cerrar sesion</p>
            </NavLink>}
      </div>
    </div>
  );
};
export default NavBar;
