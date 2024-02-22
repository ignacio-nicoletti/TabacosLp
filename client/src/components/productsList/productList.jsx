import React, {useEffect, useState} from 'react';
import style from './productList.module.css';
import InstanceOfAxios from '../../utils/intanceAxios';
import FilterDataBase from '../filterDataBase/filterDataBase';
import EditProductModal from '../EditProductModal/EditProductModal';

const ProductList = () => {
  const [data, setData] = useState ([]);
  const [filterData, setFilterData] = useState ([]);
  const [loading, setLoading] = useState (true);
  const [error, setError] = useState (null);
  const [filters, setFilters] = useState ({
    brand: '',
    categorie: '',
    code: '',
    title: '',
  });

  const [productSelect, setProductSelect] = useState ({});
  const [editActive, setEditActive] = useState (false);

  const ProductRow = ({product}) => (
    <div
      className={style.dataList}
      onClick={() => {
        setEditActive (true);
        setProductSelect (product);
      }}
    >
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
        filters.code === '' &&
        filters.brand === '' &&
        filters.categorie === '' &&
        filters.title === ''
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
            (filters.code === '' ||
              String (el.code).includes (String (filters.code)))
        );

        // Actualizar la data filtrada en el estado
        setFilterData (filteredData);
      }
    },
    [data, filters, setFilters]
  );

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

      {editActive === true
        ? <EditProductModal
            setEditActive={setEditActive}
            productSelect={productSelect}
          />
        : ''}

    </div>
  );
};

export default ProductList;
