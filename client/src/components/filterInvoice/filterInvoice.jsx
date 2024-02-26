import style from "./filterInvoice.module.css";

const FilterInvoince = ({ invoiceList, onDateChange }) => {
  const uniqueDatesByDay = [
    ...new Set(
      invoiceList.map((el) =>
        new Date(el.date).toISOString().split("T")[0]
      )
    ),
  ];

  const handleSelectChange = (event) => {
    const selectedDate = event.target.value;
    onDateChange(selectedDate); // Llama a la función proporcionada desde el padre
  };

  return (
    <div className={style.filterInvoinceContain}>
      <select name="Action" id="" onChange={handleSelectChange}>
        <option value="">Fecha</option>
        {uniqueDatesByDay.map((date, index) => (
          <option key={index} value={date}>
            {new Date(date).toLocaleDateString("es-AR", {
              timeZone: "UTC",
            })}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterInvoince;