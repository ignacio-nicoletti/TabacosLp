import style from './NavbarAdmin.module.css';
import logo from '../../Assets/logoT.png';
import {NavLink} from 'react-router-dom';
import {GetDecodedCookie} from '../../utils/DecodedCookie';
import {useEffect, useState} from 'react';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';

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

  const handlerCloseSession = () => {
    Swal.fire ({
      title: '¿Confirmar cierre de sesión?',
      text: '¡Tu sesión actual se cerrará!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar',
    }).then (result => {
      if (result.isConfirmed) {
        Cookies.remove ('cookieToken');
        window.location.href = '/login';
      }
    });
  };

  return (
    <div className={style.containNavbar}>
      <div className={style.logo}>
        <img src={logo} alt="" />
      </div>

      <div className={style.options}>
        <NavLink to="/admin/home" className={style.link}>
          <p>Inicio</p>
        </NavLink>
        {login === false
          ? <NavLink to="/login" className={style.link}>
              <p>Ingresar</p>
            </NavLink>
          : <NavLink to="/login" className={style.link}>
              <p onClick={handlerCloseSession}>Cerrar sesion</p>
            </NavLink>}
      </div>
    </div>
  );
};
export default NavBarAdmin;
