import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

const Filter = ({ filter, setFilter, setSort }) => {
  return (
    <div className="filter">
      <h2>Filtrar:</h2>
      <div className="filter-options">
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="All">Todas</option>
          <option value="Completed">Completas</option>
          <option value="Incomplete">Incompletas</option>
        </select>
        <div className="sort-buttons">
          <p>Ordenar:</p>
          <button onClick={() => setSort("Asc")} title="Crescente">  
            <FontAwesomeIcon icon="arrow-up" />
          </button>
          <button onClick={() => setSort("Desc")} title="Decrescente">  
            <FontAwesomeIcon icon="arrow-down" />
          </button>
        </div>
      </div>
    </div>
  );
};

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
  setSort: PropTypes.func.isRequired
};

export default Filter;
