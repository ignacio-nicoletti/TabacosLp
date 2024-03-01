import style from './NavbarAdmin.module.css';
import logo from '../../Assets/logoT.png';
import {NavLink} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {GetDecodedCookie} from '../../utils/DecodedCookie';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';

const NavBarAdmin = ({setOption, option}) => {
  const [login, setLogin] = useState (false);
  const [menuActive, setMenuActive] = useState (false);

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
    <div>

      <div className={style.containNavbar}>
        <div className={style.logo}>
          <img src={logo} alt="" />
        </div>

        <div className={style.options}>

          {login === false
            ? <NavLink to="/login" className={style.link}>
                <p>Ingresar</p>
              </NavLink>
            : <NavLink to="/login" className={style.link}>
                <p onClick={handlerCloseSession}>Cerrar sesion</p>
              </NavLink>}
        </div>
      </div>

      {/* navbarMobile */}
      <div className={style.containNavbarMobile}>
        <div className={style.DivIconMenuMobile}>
          <div className={style.logoMobile}>
            <img src={logo} alt="" />
          </div>
          {!menuActive
            ? <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-x"
                width="36"
                height="36"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                onClick={() => setMenuActive (!menuActive)}
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M18 6l-12 12" />
                <path d="M6 6l12 12" />
              </svg>
            : <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-menu-2"
                width="36"
                height="36"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                onClick={() => setMenuActive (!menuActive)}
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M4 6l16 0" />
                <path d="M4 12l16 0" />
                <path d="M4 18l16 0" />
              </svg>}
        </div>

        <div
          className={
            !menuActive
              ? style.optionsMobileActive
              : style.optionsMobileInactive
          }
        >

          {login === false
            ? <NavLink to="/login" className={style.link}>
                <p>Ingresar</p>
              </NavLink>
            : <div>

                <NavLink to="/login" className={style.link}>
                  <p onClick={handlerCloseSession}>cerrar sesion</p>
                </NavLink>

                <div className={style.options}>
                  <div
                    className={
                      option === 'Facturacion'
                        ? `${style.buttonOptions} ${style.marker}`
                        : style.buttonOptions
                    }
                    onClick={() => setOption ('Facturacion')}
                  >
                    <p>
                      Facturacion
                    </p>
                  </div>
                  <div
                    className={
                      option === 'Agregar Producto'
                        ? `${style.buttonOptions} ${style.marker}`
                        : style.buttonOptions
                    }
                    onClick={() => setOption ('Agregar Producto')}
                  >
                    <p>
                      Agregar Producto
                    </p>
                  </div>

                  <div
                    className={
                      option === 'Ventas'
                        ? `${style.buttonOptions} ${style.marker}`
                        : style.buttonOptions
                    }
                    onClick={() => setOption ('Ventas')}
                  >
                    <p>
                      Ventas
                    </p>
                  </div>

                  <div
                    className={
                      option === 'Base de datos'
                        ? `${style.buttonOptions} ${style.marker}`
                        : style.buttonOptions
                    }
                    onClick={() => setOption ('Base de datos')}
                  >
                    <p>
                      Base de datos
                    </p>
                  </div>
                </div>
              </div>}
        </div>
      </div>
    </div>
  );
};
export default NavBarAdmin;
