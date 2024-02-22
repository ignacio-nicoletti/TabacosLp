import {useState} from 'react';
import NavBarAdmin from '../../components/NavBarAdmin/NavbarAdmin';

import style from './HomeAdmin.module.css';
import AddProduct from '../../components/AddProduct/AddProduct';
import ProductList from '../../components/productsList/productList';
import Facturacion from '../../components/Facturation/Facturation';

const HomeAdmin = () => {
  const [option, setOption] = useState ('Facturacion');

  return (
    <div className={style.contain}>
      <NavBarAdmin />

      <div className={style.ContainProgram}>
        <div className={style.Program}>
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
          {option === 'Agregar Producto'
            ? <AddProduct />
            : option === 'Base de datos'
                ? <ProductList />
                : option === 'Facturacion' ? <Facturacion /> : ''}
        </div>
      </div>

    </div>
  );
};

export default HomeAdmin;
