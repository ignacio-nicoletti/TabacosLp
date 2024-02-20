import {useState} from 'react';
import NavBar from '../../components/Navbar/navbar';
import style from './loginPage.module.css';
import InstanceOfAxios from '../../utils/intanceAxios';

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


  const handleSubmit = async (e) => {
    e.preventDefault();
    await InstanceOfAxios("/login", "POST", data).then((data) => {
      document.cookie =
        encodeURIComponent("cookieToken") +
        "=" +
        encodeURIComponent(data.token);
    //   window.location.href = "/";
    });
  };

  return (
    <div>
      <NavBar />
      <div className={style.containLogin}>
        <div className={style.markLogin}>
          <h3>Ingresar</h3>

          <div className={style.email}>
            <p className={style.title}>Email</p>
            <input
              type="email"
              value={data.email}
              onChange={handlerData}
              name="email"
            />
          </div>

          <div className={style.passwordContain}>
            <p className={style.title}>Contraseña</p>
            <div className={style.password}>

              <input
                type={!eyesActive ? 'password' : 'text'}
                value={data.password}
                onChange={handlerData}
                name="password"
              />

              {eyesActive
                ? <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="icon icon-tabler icon-tabler-eye-off"
                    width="36"
                    height="36"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    onClick={() => setEyesActive (!eyesActive)}
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M10.585 10.587a2 2 0 0 0 2.829 2.828" />
                    <path d="M16.681 16.673a8.717 8.717 0 0 1 -4.681 1.327c-3.6 0 -6.6 -2 -9 -6c1.272 -2.12 2.712 -3.678 4.32 -4.674m2.86 -1.146a9.055 9.055 0 0 1 1.82 -.18c3.6 0 6.6 2 9 6c-.666 1.11 -1.379 2.067 -2.138 2.87" />
                    <path d="M3 3l18 18" />
                  </svg>
                : <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="icon icon-tabler icon-tabler-eye"
                    width="36"
                    height="36"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    onClick={() => setEyesActive (!eyesActive)}
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                    <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
                  </svg>}
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
