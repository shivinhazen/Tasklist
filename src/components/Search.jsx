import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

const Search = ({search, setSearch }) => {
  return (
    <div className="search">
      <h2>Buscar:</h2>
      {/* Campo de busca com ícone */}
      <div className="search-field">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Digite para buscar..."
        />
        <FontAwesomeIcon icon="search" />
      </div>
    </div>
  )
}

Search.propTypes = {
  search: PropTypes.string.isRequired,
  setSearch: PropTypes.func.isRequired
};

export default Search
