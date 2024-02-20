import NavBarAdmin from '../../components/NavBarAdmin/NavbarAdmin';

import style from './HomeAdmin.module.css';

const HomeAdmin = () => {
  return (
    <div className={style.contain}>
      <NavBarAdmin />

      <div className={style.ContainProgram}>
        <div className={style.Program}>
          <p>
            facturacion
          </p>
        </div>
      </div>

    </div>
  );
};

export default HomeAdmin;
