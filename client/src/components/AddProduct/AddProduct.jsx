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
  const [stockActive, setStockActive] = useState (true);

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

      setData ({
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
          <input
            type="text"
            name="code"
            onChange={handlerData}
            value={data.code}
            maxLength={20}
          />
        </div>

        <div className={style.divInput}>
          <span> Titulo</span>
          <input
            type="text"
            name="title"
            onChange={handlerData}
            maxLength={40}
            value={data.title}
          />
        </div>

        <div className={style.divInput}>
          <span> Descripcion</span>
          <input
            type="text"
            name="description"
            onChange={handlerData}
            maxLength={40}
            value={data.description}
          />
        </div>
      </div>

      <div className={style.block}>
        <div className={style.divInput}>
          <div className={style.divSpanAndInputCheck}>
            <span> Stock </span>
            <input
              type="checkbox"
              name=""
              id=""
              checked={stockActive}
              onChange={() => setStockActive (!stockActive)}
            />
          </div>
          <input
            type="number"
            name="stock"
            onChange={handlerData}
            disabled={!stockActive ? true : false}
            value={data.stock}
          />
        </div>

        <div className={style.divInput}>
          <span> Precio de compra</span>
          <input
            type="number"
            name="priceCost"
            onChange={handlerData}
            value={data.priceCost}
          />
        </div>

        <div className={style.divInput}>
          <span> Precio de venta</span>
          <input
            type="number"
            name="priceList"
            onChange={handlerData}
            value={data.priceList}
          />
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
            maxLength={20}
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
            maxLength={20}
          />
        </div>

        <div className={style.divInput}>
          <span>Cantidad(Gr,lt)</span>
          <input
            type="text"
            name="amount"
            onChange={handlerData}
            placeholder="Ej. 30gr "
            value={data.amount}
            maxLength={20}
          />
        </div>
      </div>
      <div className={style.BoxButonAdd}>

        <button onClick={handleSubmit}>
          Agregar Producto
        </button>
      </div>
    </div>
  );
};

export default AddProduct;
