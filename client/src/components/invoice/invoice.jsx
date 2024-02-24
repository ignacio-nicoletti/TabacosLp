import {useEffect, useState} from 'react';
import style from './invoice.module.css';
import InstanceOfAxios from '../../utils/intanceAxios';
import {GetDecodedCookie} from '../../utils/DecodedCookie';
const Invoice = () => {
  const [invoiceList, setInvoiceList] = useState ([]);
  const [loading, setLoading] = useState (true);

  useEffect (() => {
    const token = GetDecodedCookie ('cookieToken');

    const fetchData = async () => {
      try {
        const response = await InstanceOfAxios (
          '/invoice',
          'GET',
          undefined,
          token
        );
        setInvoiceList (response);
      } catch (error) {
        console.log (error.message);
      } finally {
        setLoading (false);
      }
    };

    fetchData ();
  }, []);

const formatDateModal = isoDate => {
  const date = new Date(isoDate);
  const options = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'UTC' // Establece la zona horaria UTC para la fecha de entrada
  };

  const formattedDate = new Intl.DateTimeFormat('es-AR', options).format(date);
  return formattedDate;
};

  const formatNumberWithDots = number => {
    const formattedNumber = new Intl.NumberFormat ('es-ES', {
      maximumFractionDigits: 0,
    }).format (number);
    return formattedNumber.replace (',', '.');
  };

  const ProductRow = ({product}) => (
    <div className={style.dataList}>
      <p>{product._id}</p>

      <div className={style.productBox}>
        {product.products.map (el => (
          <div className={style.productItem}>
            <p>{el.title}</p>
            <p>{el.brand}</p>
            <p>${el.priceList} </p>
            <p>{el.unity} U.</p>
          </div>
        ))}
      </div>
      <p>${formatNumberWithDots (product.priceTotal)}</p>
      <p>{formatDateModal (product.date)}</p>

    </div>
  );

  return (
    <div className={style.containInvoice}>

      <div className={style.ContainTitulos}>

        {loading
          ? <p>Loading...</p>
          : <div>

              <div className={style.titulos}>
                <p>Codigo Factura</p>
                <p>Productos</p>
                <p>Total</p>
                <p>Fecha</p>
              </div>

              {invoiceList.map ((el, index) => (
                <ProductRow key={index} product={el} />
              ))}

            </div>}

      </div>
    </div>
  );
};

export default Invoice;
