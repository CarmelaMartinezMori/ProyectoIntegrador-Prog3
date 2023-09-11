import React from 'react';

const SearchResults = ({ searchResults }) => {
  return (
    <div>
      <h2>Search Results:</h2>
      {searchResults && searchResults.length > 0 ? (
        <div>
          <h3>Tracks:</h3>
          <ul>
            {searchResults.map((result) => (
              <li key={result.id}>
                <h4>{result.title}</h4>
                <p>Artist: {result.artist.name}</p>

              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default SearchResults;
