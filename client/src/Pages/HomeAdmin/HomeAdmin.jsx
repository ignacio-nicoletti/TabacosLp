import {useState} from 'react';
import NavBarAdmin from '../../components/NavBarAdmin/NavbarAdmin';

import style from './HomeAdmin.module.css';
import AddProduct from '../../components/AddProduct/AddProduct';

const HomeAdmin = () => {
  const [option, setOption] = useState ('Facturacion');

  return (
    <div className={style.contain}>
      <NavBarAdmin />

      <div className={style.ContainProgram}>
        <div className={style.Program}>
          <div className={style.options}>
            <div
              className={style.buttonOptions}
              onClick={() => setOption ('Facturacion')}
            >
              <p>
                Facturacion
              </p>
            </div>
            <div
              className={style.buttonOptions}
              onClick={() => setOption ('Agregar Producto')}
            >
              <p>
                Agregar Producto
              </p>
            </div>

            <div
              className={style.buttonOptions}
              onClick={() => setOption ('Ventas')}
            >
              <p>
                Ventas
              </p>
            </div>

            <div
              className={style.buttonOptions}
              onClick={() => setOption ('Base de datos')}
            >
              <p>
                Base de datos
              </p>
            </div>
          </div>
          {/* ------options-------- */}
          {option === 'Agregar Producto' ? <AddProduct /> : ''}
        </div>
      </div>

    </div>
  );
};

export default HomeAdmin;
