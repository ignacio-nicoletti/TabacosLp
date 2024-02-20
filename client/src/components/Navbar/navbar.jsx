import style from './navbar.module.css';
import logo from '../../Assets/logoT.png';
import {NavLink} from 'react-router-dom';
const NavBar = () => {
  return (
    <div className={style.containNavbar}>
      <div className={style.logo}>
        <img src={logo} alt="" />
      </div>

      <div className={style.options}>
        <NavLink to="/" className={style.link}>
          <p>Inicio</p>
        </NavLink>
        <NavLink to="/login" className={style.link}>
        <p>Ingresar</p>
        </NavLink>
      </div>
    </div>
  );
};
export default NavBar;
