import {useState} from 'react';
import style from './EditProductModal.module.css';
import Swal from 'sweetalert2';
import {GetDecodedCookie} from '../../utils/DecodedCookie';
import InstanceOfAxios from '../../utils/intanceAxios';

const EditProductModal = ({
  setEditActive,
  productSelect,
  filterCategorie,
  filterBrands,
}) => {
  const [data, setData] = useState ({
    code: productSelect.code,
    title: productSelect.title,
    description: productSelect.description,
    stock: productSelect.stock,
    priceCost: productSelect.priceCost,
    priceList: productSelect.priceList,
    category: productSelect.category,
    brand: productSelect.brand,
    amount: productSelect.amount,
  });

  const handlerFilters = event => {
    const property = event.target.name;
    const value = event.target.value;

    setData ({
      ...data,
      [property]: value ? value[0].toUpperCase () + value.slice (1) : '',
    });
  };

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
      await InstanceOfAxios (
        `/products/${productSelect._id}`,
        'PUT',
        data,
        token
      );

      Swal.fire ({
        title: '¡Guardado!',
        text: 'El producto se ha guardado correctamente.',
        icon: 'success',
      });
      setEditActive (false);
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
    <div className={style.containModal}>
      <div className={style.modal}>

        <div className={style.iconClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-x"
            width="36"
            height="36F"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            onClick={() => setEditActive (false)}
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M18 6l-12 12" />
            <path d="M6 6l12 12" />
          </svg>
        </div>
        <div className={style.data}>
          <span>Codigo</span>
          <input
            type="text"
            value={data.code}
            onChange={handlerFilters}
            name="code"
          />
          <span>Titulo</span>
          <input
            type="text"
            value={data.title}
            onChange={handlerFilters}
            name="title"
          />
          <span>Descripcion</span>
          <input
            type="text"
            value={data.description}
            onChange={handlerFilters}
            name="description"
          />
          <span>Marca</span>
          <select name="brand" onChange={handlerFilters} id="brandSelect">
            <option value="">Marca</option>
            {filterBrands.map (el => <option key={el} value={el}>{el}</option>)}
          </select>
          <input
            type="text"
            value={data.brand}
            onChange={handlerFilters}
            name="brand"
          />
          <span>Cantidad</span>
          <input
            type="text"
            value={data.amount}
            onChange={handlerFilters}
            name="amount"
          />
          <span>Categoria</span>
          <select
            name="category"
            onChange={handlerFilters}
            id="categorieSelect"
          >
            <option value="">Categoria</option>
            {filterCategorie.map (el => (
              <option key={el} value={el}>{el}</option>
            ))}
          </select>
          <input
            type="text"
            value={data.category}
            onChange={handlerFilters}
            name="category"
          />
          <span>Stock</span>
          <input
            type="text"
            value={data.stock}
            onChange={handlerFilters}
            name="stock"
          />
          <span>Precio compra</span>
          <input
            type="text"
            value={data.priceCost}
            onChange={handlerFilters}
            name="priceCost"
          />
          <span>Precio venta</span>
          <input
            type="text"
            value={data.priceList}
            onChange={handlerFilters}
            name="priceList"
          />
          <button onClick={handleSubmit}>Guardar producto</button>
        </div>
      </div>
    </div>
  );
};
export default EditProductModal;
