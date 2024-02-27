import {useState, useEffect} from 'react';
import style from './filterInvoice.module.css';

const FilterInvoice = ({invoiceList, onDayChange, onMonthChange}) => {
  const [selectedDate, setSelectedDate] = useState ('');
  const [filteredData, setFilteredData] = useState ([]);
  const [totalPrice, setTotalPrice] = useState (null);

  useEffect (
    () => {
      const filteredData = invoiceList.filter (el => {
        const date = new Date (el.date).toISOString ();
        return selectedDate ? date.includes (selectedDate) : true;
      });

      const total = filteredData.reduce (
        (acc, invoice) => acc + invoice.priceTotal,
        0
      );

      setFilteredData (filteredData);
      setTotalPrice (total);
    },
    [selectedDate, invoiceList]
  );

  const uniqueDatesByDay = [
    ...new Set (
      invoiceList.map (el => new Date (el.date).toISOString ().split ('T')[0])
    ),
  ];

  const uniqueDatesByMonth = [
    ...new Set (
      invoiceList.map (el => new Date (el.date).toISOString ().slice (0, 7))
    ),
  ];

  const handleDayChange = event => {
    const selectedDate = event.target.value;
    setSelectedDate (selectedDate);
    onDayChange (selectedDate);
  };

  const handleMonthChange = event => {
    const selectedDate = event.target.value;
    setSelectedDate (selectedDate);
    onMonthChange (selectedDate);
  };

  return (
    <div className={style.filterInvoiceContain}>

      <div>
        <select name="dayFilter" id="dayFilter" onChange={handleDayChange}>
          <option value="">Fecha por Día</option>
          {uniqueDatesByDay.map ((date, index) => (
            <option key={index} value={date}>
              {new Date (date).toLocaleDateString ('es-AR', {
                timeZone: 'UTC',
              })}
            </option>
          ))}
        </select>
      </div>

      <div>
        <select
          name="monthFilter"
          id="monthFilter"
          onChange={handleMonthChange}
        >
          <option value="">Fecha por Mes</option>
          {uniqueDatesByMonth.map ((date, index) => (
            <option key={index} value={date}>
              {new Date (date).toLocaleDateString ('es-AR', {
                timeZone: 'UTC',
                year: 'numeric',
                month: 'long',
              })}
            </option>
          ))}
        </select>
      </div>

      <p>
        Total: ${totalPrice && totalPrice.toLocaleString ().replace (',', '.')}
      </p>

    </div>
  );
};

export default FilterInvoice;
