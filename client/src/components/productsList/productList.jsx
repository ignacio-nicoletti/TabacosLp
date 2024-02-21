import React, {useEffect, useState} from 'react';
import style from './productList.module.css';
import InstanceOfAxios from '../../utils/intanceAxios';
import FilterDataBase from '../filterDataBase/filterDataBase';

const ProductRow = ({product}) => (
  <div className={style.dataList}>
    <p>{product.code}</p>
    <p>{product.title}</p>
    <p>{product.description}</p>
    <p>{product.brand}</p>
    <p>{product.amount}</p>
    <p>{product.category}</p>
    <p>{product.stock}</p>
    <p>{product.priceCost}</p>
    <p>{product.priceList}</p>
  </div>
);

const ProductList = () => {
  const [data, setData] = useState ([]);
  const [filterData, setFilterData] = useState ([]);
  const [loading, setLoading] = useState (true);
  const [error, setError] = useState (null);
  const [filters, setFilters] = useState ({
    brand: '',
    categorie: '',
    code: "",
    title: '',
  });

  useEffect (() => {
    const fetchData = async () => {
      try {
        const response = await InstanceOfAxios ('/products', 'GET');
        setData (response);
      } catch (error) {
        setError (error.message);
      } finally {
        setLoading (false);
      }
    };

    fetchData ();
  }, []);

  useEffect (
    () => {
      // Filtrar la data basada en los filtros
      if (
        (filters.code ===
          "" &&
          filters.brand === '' &&
          filters.categorie === '' &&
          filters.title === '')
      ) {
        setFilterData (data);
      } else {
        const filteredData = data.filter (
          el =>
            el.title.toLowerCase ().includes (filters.title.toLowerCase ()) &&
            (filters.brand === '' ||
              el.brand
                .toLowerCase ()
                .includes (filters.brand.toLowerCase ())) &&
            (filters.categorie === '' ||
              el.category
                .toLowerCase ()
                .includes (filters.categorie.toLowerCase ())) &&
            (filters.code === "" || String(el.code).includes(String(filters.code)))
        );

        // Actualizar la data filtrada en el estado
        setFilterData (filteredData);
      }
    },
    [data, filters, setFilters]
  );
  console.log (filterData);
  return (
    <div className={style.containData}>
      <FilterDataBase data={data} filters={filters} setFilters={setFilters} />

      <div className={style.titulos}>
        <p>Codigo</p>
        <p>Titulo</p>
        <p>Descripcion</p>
        <p>Marca</p>
        <p>Cantidad</p>
        <p>Categoria</p>
        <p>Stock</p>
        <p>Precio costo</p>
        <p>Precio lista</p>
      </div>

      {loading
        ? <p>Loading...</p>
        : filterData.map ((el, index) => (
            <ProductRow key={index} product={el} />
          ))}
    </div>
  );
};

export default ProductList;

{
  /* <svg
      xmlns="http://www.w3.org/2000/svg"
      class="icon icon-tabler icon-tabler-edit"
      width="36"
      height="36"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
      <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
      <path d="M16 5l3 3" />
    </svg>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="icon icon-tabler icon-tabler-trash"
      width="36"
      height="36"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M4 7l16 0" />
      <path d="M10 11l0 6" />
      <path d="M14 11l0 6" />
      <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
      <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
    </svg> */
}
