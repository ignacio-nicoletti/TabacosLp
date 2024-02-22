import {useState} from 'react';
import style from './AddProduct.module.css';
import InstanceOfAxios from '../../utils/intanceAxios';
import {GetDecodedCookie} from '../../utils/DecodedCookie';
import Swal from 'sweetalert2';
import {useEffect} from 'react';

const AddProduct = () => {
  const [data, setData] = useState ({
    code: ' ',
    title: '',
    description: '',
    stock: '',
    priceCost: '',
    priceList: '',
    category: '',
    brand: '',
    amount: '',
  });

  const [listCategorie, setListCaterogie] = useState ([]);
  const [listBrand, setListBrand] = useState ([]);

  const handlerData = event => {
    const property = event.target.name;
    const value = event.target.value;
    setData ({
      ...data,
      [property]: value ? value[0].toUpperCase () + value.slice (1) : '',
    });
  };

  useEffect (() => {
    InstanceOfAxios ('/products/categories', 'GET').then (data =>
      setListCaterogie (data.categories)
    );
    InstanceOfAxios ('/products/brands', 'GET').then (data =>
      setListBrand (data.brands)
    );
  }, []);

  const handleSubmit = async e => {
    e.preventDefault ();

    if (
      data.code !== '' &&
      data.title !== '' &&
      data.description !== '' &&
      data.stock !== 0 &&
      data.priceCost !== '' &&
      data.priceList !== '' &&
      data.category !== '' &&
      data.brand !== '' &&
      data.amount !== ''
    ) {
      const token = GetDecodedCookie ('cookieToken');
      await InstanceOfAxios ('/products', 'POST', data, token);

      Swal.fire ({
        title: '¡Guardado!',
        text: 'El producto se ha guardado correctamente.',
        icon: 'success',
      });
      setTimeout (() => {
        window.location.reload ();
      }, 2000);
    } else {
      Swal.fire ({
        title: 'Atencion!',
        text: 'Faltan datos que completar.',
        icon: 'warning',
      });
    }
  };

  return (
    <div className={style.ContainAddProduct}>
      <div className={style.block}>
        <div className={style.divInput}>
          <span> Codigo de barra</span>
          <input type="text" name="code" onChange={handlerData} />
        </div>

        <div className={style.divInput}>
          <span> Titulo</span>
          <input type="text" name="title" onChange={handlerData} />
        </div>

        <div className={style.divInput}>
          <span> Descripcion</span>
          <input type="text" name="description" onChange={handlerData} />
        </div>
      </div>

      <div className={style.block}>
        <div className={style.divInput}>
          <span> Stock</span>
          <input type="number" name="stock" onChange={handlerData} />
        </div>

        <div className={style.divInput}>
          <span> Precio de compra</span>
          <input type="number" name="priceCost" onChange={handlerData} />
        </div>

        <div className={style.divInput}>
          <span> Precio de venta</span>
          <input type="number" name="priceList" onChange={handlerData} />
        </div>
      </div>

      <div className={style.block}>
        <div className={style.divInput}>
          <span> Categoria</span>
          <select name="category" id="" onChange={handlerData}>
            <option value="" />
            {listCategorie.map (el => <option value={el}>{el}</option>)}
          </select>
          <input
            type="text"
            name="category"
            onChange={handlerData}
            value={data.category}
          />
        </div>

        <div className={style.divInput}>
          <span> Marca</span>
          <select name="brand" id="" onChange={handlerData}>
            <option value="" />
            {listBrand.map (el => <option value={el}>{el}</option>)}
          </select>
          <input
            type="text"
            name="brand"
            value={data.brand}
            onChange={handlerData}
          />
        </div>

        <div className={style.divInput}>
          <span>Cantidad(Gr,lt)</span>
          <input
            type="text"
            name="amount"
            onChange={handlerData}
            placeholder="Ej. 30gr "
          />
        </div>
      </div>

      <button onClick={handleSubmit}>
        Agregar Producto
      </button>
    </div>
  );
};

export default AddProduct;
