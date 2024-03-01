import {useState} from 'react';
import NavBarAdmin from '../../components/NavBarAdmin/NavbarAdmin';

import style from './HomeAdmin.module.css';
import AddProduct from '../../components/AddProduct/AddProduct';
import ProductList from '../../components/productsList/productList';
import Facturacion from '../../components/Facturation/Facturation';
import Invoice from '../../components/invoice/invoice';

const HomeAdmin = () => {
  const [option, setOption] = useState ('Facturacion'|| 'Agregar Producto'||'Ventas'||'Base de datos');

  return (
    <div className={style.contain}>
      <NavBarAdmin setOption={setOption} option={option}/>

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
          {/* ------options-------- */}
          {option === 'Agregar Producto'
            ? <AddProduct />
            : option === 'Base de datos'
                ? <ProductList />
                : option === 'Facturacion'
                    ? <Facturacion />
                    : option === 'Ventas' ? <Invoice /> : ''}
        </div>
      </div>

    </div>
  );
};

export default HomeAdmin;
