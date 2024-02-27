import React, {useEffect, useState} from 'react';
import style from './productList.module.css';
import InstanceOfAxios from '../../utils/intanceAxios';
import FilterDataBase from '../filterDataBase/filterDataBase';
import EditProductModal from '../EditProductModal/EditProductModal';
import {GetDecodedCookie} from '../../utils/DecodedCookie';
import Swal from 'sweetalert2';

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
  const [filterCategorie, setFilterCategorie] = useState ([]);
  const [filterBrands, setFilterBrands] = useState ([]);
  const [productSelect, setProductSelect] = useState ({});
  const [editActive, setEditActive] = useState (false);

  useEffect (() => {
    InstanceOfAxios ('/products/categories', 'GET').then (data =>
      setFilterCategorie (data.categories)
    );
    InstanceOfAxios ('/products/brands', 'GET').then (data =>
      setFilterBrands (data.brands)
    );
  }, []);

  const ProductRow = ({product}) => (
    <div className={style.dataList}>
      <p>{product.code}</p>
      <p>{product.title}</p>
      <p
        style={{
          wordWrap: 'break-word',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {product.description}
      </p>
      <p>{product.brand}</p>
      <p>{product.amount}</p>
      <p>{product.category}</p>
      <p>{product.stock ? product.stock : '-'}</p>
      <p>{product.priceCost.toLocaleString ().replace (',', '.')}</p>
      <p>{product.priceList.toLocaleString ().replace (',', '.')}</p>
      <p>
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
          className={style.iconTrash}
          onClick={() => habldeDeleteProduct (product._id)}
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M4 7l16 0" />
          <path d="M10 11l0 6" />
          <path d="M14 11l0 6" />
          <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
          <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
        </svg>
      </p>
      <p>
        <svg
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
          onClick={() => {
            setEditActive (true);
            setProductSelect (product);
          }}
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
          <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
          <path d="M16 5l3 3" />
        </svg>
      </p>
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

  const habldeDeleteProduct = id => {
    console.log (id);

    Swal.fire ({
      title: 'Estas seguro que quieres borrarlo?',
      // text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, borrar',
    }).then (result => {
      if (result.isConfirmed) {
        Swal.fire ({
          title: 'Eliminado!',
          text: 'producto eliminada.',
          icon: 'success',
        });
        const token = GetDecodedCookie ('cookieToken');
        InstanceOfAxios (`/products/${id}`, 'DELETE', undefined, token);
      }
    });
  };

  return (
    <div className={style.containData}>
      <FilterDataBase
        data={data}
        filters={filters}
        setFilters={setFilters}
        filterBrands={filterBrands}
        filterCategorie={filterCategorie}
      />

      <div className={style.titulos}>
        <p>Codigo</p>
        <p>Titulo</p>
        <p>Descripcion</p>
        <p>Marca</p>
        <p>Cantidad</p>
        <p>Categoria</p>
        <p>Stock</p>
        <p>Precio compra</p>
        <p>Precio venta</p>
        <p>Borrar</p>
        <p>Editar</p>
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
            filterCategorie={filterCategorie}
            filterBrands={filterBrands}
          />
        : ''}

    </div>
  );
};

export default ProductList;
