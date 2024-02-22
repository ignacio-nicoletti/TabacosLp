import style from './filterDataBase.module.css';

const FilterDataBase = ({
  filters,
  setFilters,
  filterCategorie,
  filterBrands,
 
}) => {
 

  const handlerFilters = event => {
    const property = event.target.name;
    const value = event.target.value;

    setFilters ({
      ...filters,
      [property]: value ? value[0].toUpperCase () + value.slice (1) : '',
    });
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

    </div>
  );
};

export default FilterDataBase;
