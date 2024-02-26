import {useEffect, useState} from 'react';
import style from './invoice.module.css';
import InstanceOfAxios from '../../utils/intanceAxios';
import {GetDecodedCookie} from '../../utils/DecodedCookie';
import FilterInvoince from '../filterInvoice/filterInvoice';
const Invoice = () => {
  const [invoiceList, setInvoiceList] = useState ([]);
  const [filteredInvoiceList, setFilteredInvoiceList] = useState ([]);
  const [loading, setLoading] = useState (true);
  const [listProducts, setListProducts] = useState ({});
  const [listProductsActive, setListProductsActive] = useState (false);
  const [selectedDate, setSelectedDate] = useState ('');

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
        setFilteredInvoiceList (response); // Inicialmente, ambas listas son iguales
      } catch (error) {
        console.log (error.message);
      } finally {
        setLoading (false);
      }
    };

    fetchData ();
  }, []);

  const formatDateModal = isoDate => {
    const date = new Date (isoDate);
    const options = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'UTC', // Establece la zona horaria UTC para la fecha de entrada
    };

    const formattedDate = new Intl.DateTimeFormat ('es-AR', options).format (
      date
    );
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
        <button
          onClick={() => {
            setListProductsActive (true);
            setListProducts (product);
          }}
        >
          Ver productos
        </button>
      </div>
      <p>${formatNumberWithDots (product.priceTotal)}</p>
      <p>{formatDateModal (product.date)}</p>
    </div>
  );

  const handleDateChange = selectedDate => {
    setSelectedDate (selectedDate);
    if (selectedDate) {
      const filteredList = invoiceList.filter (
        el => new Date (el.date).toISOString ().split ('T')[0] === selectedDate
      );
      setFilteredInvoiceList (filteredList);
    } else {
      setFilteredInvoiceList (invoiceList);
    }
  };

  return (
    <div className={style.containInvoice}>

      <div className={style.ContainTitulos}>

        {loading
          ? <p>Loading...</p>
          : <div>

              <div>
                <FilterInvoince
                  invoiceList={invoiceList}
                  onDateChange={handleDateChange}
                />
              </div>

              <div className={style.titulos}>
                <p>Codigo Factura</p>
                <p>Productos</p>
                <p>Total</p>
                <p>Fecha</p>
              </div>

              {filteredInvoiceList.map ((el, index) => (
                <ProductRow key={index} product={el} />
              ))}

            </div>}

        <div>
          {listProductsActive
            ? <div className={style.ContainModalProducts}>

                <div className={style.modalProducts}>
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
                      onClick={() => setListProductsActive (false)}
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M18 6l-12 12" />
                      <path d="M6 6l12 12" />
                    </svg>
                  </div>
                  <div className={style.titulosModalProducts}>
                    <p>Titulo</p>
                    <p>Marca</p>
                    <p>Precio Lista</p>
                    <p>Cantidad</p>
                  </div>

                  {listProducts.products.map (el => (
                    <div className={style.dataProducts}>

                      <p>{el.title}</p>
                      <p>{el.brand}</p>
                      <p>${el.priceList} </p>
                      <p>{el.unity} U.</p>
                    </div>
                  ))}
                </div>
              </div>
            : ''}
        </div>

      </div>
    </div>
  );
};

export default Invoice;
