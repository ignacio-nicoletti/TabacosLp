import React, { useEffect, useState } from 'react';
import style from './productList.module.css';
import InstanceOfAxios from '../../utils/intanceAxios';

const ProductRow = ({ product }) => (
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
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await InstanceOfAxios('/products', 'GET');
        setData(response);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={style.containData}>
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

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        data.map((el) => <ProductRow key={el.code} product={el} />)
      )}
    </div>
  );
};

export default ProductList;