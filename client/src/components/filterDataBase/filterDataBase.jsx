import {useState} from 'react';
import style from './filterDataBase.module.css';
import {GetDecodedCookie} from '../../utils/DecodedCookie';
import InstanceOfAxios from '../../utils/intanceAxios';
import Swal from 'sweetalert2';

const FilterDataBase = ({
  filters,
  setFilters,
  filterCategorie,
  filterBrands,
  fetchData 
}) => {
  const [activePriceModal, setActivePriceModal] = useState (false);
  const [inputs, setInputs] = useState ({
    priceCostPercentage: null,
    priceListPercentage: null,
  });

  const handlerInputs = event => {
    const {name, value} = event.target;
    setInputs ({
      ...inputs,
      [name]: value ? value[0].toUpperCase () + value.slice (1) : '',
    });
  };

  const handlerFilters = event => {
    const property = event.target.name;
    const value = event.target.value;
    setFilters ({
      ...filters,
      [property]: value ? value[0].toUpperCase () + value.slice (1) : '',
    });
  };

  const handlerModifPrice = () => {
    const token = GetDecodedCookie ('cookieToken');
    InstanceOfAxios ('/products', 'PUT', inputs, token);
    fetchData ();
    Swal.fire ({
      title: '¡Guardado!',
      text: 'El producto se ha guardado correctamente.',
      icon: 'success',
    });
  
    setActivePriceModal(false)
  
  
  };

  return (
    <div className={style.containFilters}>

      <div className={style.divFilter}>
        <input
          type="text"
          placeholder="Codigo de barra"
          name="code"
          onChange={handlerFilters}
          value={filters.code}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="icon icon-tabler icon-tabler-x"
          width="36"
          height="36"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
          onClick={() => setFilters ({...filters, code: ''})}
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M18 6l-12 12" />
          <path d="M6 6l12 12" />
        </svg>
      </div>

      <div className={style.divFilter}>
        <input
          type="text"
          placeholder="Titulo"
          onChange={handlerFilters}
          name="title"
          value={filters.title}
        />
        {' '}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="icon icon-tabler icon-tabler-x"
          width="36"
          height="36"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
          onClick={() => setFilters ({...filters, title: ''})}
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M18 6l-12 12" />
          <path d="M6 6l12 12" />

        </svg>
      </div>

      <div className={style.divFilter}>
        <select name="brand" onChange={handlerFilters} id="brandSelect">
          <option value="">Marca</option>
          {filterBrands.map (el => <option key={el} value={el}>{el}</option>)}
        </select>
      </div>

      <div className={style.divFilter}>
        <select name="categorie" onChange={handlerFilters} id="categorieSelect">
          <option value="">Categoria</option>
          {filterCategorie.map (el => (
            <option key={el} value={el}>{el}</option>
          ))}
        </select>
      </div>

      <div className={style.DivModifPrice}>
        <button onClick={() => setActivePriceModal (true)}>
          Modificar precios
        </button>
      </div>

      {activePriceModal
        ? <div className={style.ContainModifPriceModal}>
            <div className={style.ModifPriceModal}>
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
                  onClick={() => setActivePriceModal (false)}
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M18 6l-12 12" />
                  <path d="M6 6l12 12" />
                </svg>
              </div>

              <div className={style.BoxInputs}>

              

                <span>Precio de compra</span>
                <div className={style.inputAndspan}>
                  <input
                    type="number"
                    onChange={handlerInputs}
                    name="priceCostPercentage"
                  />
                  <span> %</span>
                </div>
                <span>Precio de venta</span>

                <div className={style.inputAndspan}>
                  <input
                    type="number"
                    onChange={handlerInputs}
                    name="priceListPercentage"
                  />
                  {' '}
                  <span> %</span>
                </div>
                <button onClick={() => handlerModifPrice ()}>Guardar</button>
              </div>
            </div>
          </div>
        : ''}

    </div>
  );
};

export default FilterDataBase;
