import style from './NavbarAdmin.module.css';
import logo from '../../Assets/logoT.png';
import {NavLink} from 'react-router-dom';
import {GetDecodedCookie} from '../../utils/DecodedCookie';
import {useEffect, useState} from 'react';
import Cookies from "js-cookie";

const NavBarAdmin = () => {
  const [login, setLogin] = useState (false);

  useEffect (() => {
    const token = GetDecodedCookie ('cookieToken');
    if (token) {
      setLogin (true);
    } else {
      setLogin (false);
    }
   
  }, []);

const handlerCloseSession=()=>{
    Cookies.remove("cookieToken");
    window.location.href = "/login";
}


  return (
    <div className={style.containNavbar}>
      <div className={style.logo}>
        <img src={logo} alt="" />
      </div>

      <div className={style.options}>
        <NavLink to="/admin/home" className={style.link}>
          <p>Inicio</p>
        </NavLink>
        {login===false
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
export default NavBarAdmin;
