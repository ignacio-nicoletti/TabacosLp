import {useState} from 'react';
import NavBar from '../../components/Navbar/navbar';
import style from './loginPage.module.css';
import InstanceOfAxios from '../../utils/intanceAxios';
import Cookies from 'js-cookie';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';

const LoginPage = () => {
  const [eyesActive, setEyesActive] = useState (false);
  const [data, setData] = useState ({
    email: '',
    password: '',
  });

  const handlerData = event => {
    const property = event.target.name;
    const value = event.target.value;
    setData ({...data, [property]: value});
  };

  const handleSubmit = async e => {
    e.preventDefault ();
    Cookies.remove ('cookieToken'); //si ya hay token lo borra y actualiza
    await InstanceOfAxios ('/login', 'POST', data).then (data => {
      document.cookie =
        encodeURIComponent ('cookieToken') +
        '=' +
        encodeURIComponent (data.token);

      if (data.rol === 'ROL_Admin') {
        window.location.href = '/admin/home';
      } else {
        window.location.href = '/';
      }
    });
  };

  return (
    <div>
      <NavBar />
      <div className={style.containLogin}>
        <div className={style.markLogin}>
          <h3>Bienvenidos!</h3>

          <div className={style.emailContain}>
            <div className={style.email}>
              <input
                type="email"
                value={data.email}
                onChange={handlerData}
                name="email"
                placeholder="Escribe tu email"
              />
            </div>
          </div>

          <div className={style.passwordContain}>
            <div className={style.password}>
              <input
                type={!eyesActive ? 'password' : 'text'}
                value={data.password}
                onChange={handlerData}
                name="password"
                placeholder="Escribe tu contraseña"
              />
              <FontAwesomeIcon
                icon={eyesActive ? faEyeSlash : faEye}
                className={style.passwordToggleIcon}
                onClick={() => setEyesActive (!eyesActive)}
              />
            </div>
          </div>
          <button onClick={handleSubmit}>
            Iniciar sesion
          </button>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
