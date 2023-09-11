import React from 'react';
import SearchFilter from '../../components/SearchFilter/FilteredSearch';

function SearchResults() {
  return (
    <div>
      <h1>Búsqueda y Filtrado</h1>
      <p>Utiliza el buscador y los filtros para encontrar información específica.</p>
      <SearchFilter/>
    </div>
  );
}

export default SearchResults;
