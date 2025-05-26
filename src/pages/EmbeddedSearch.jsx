import React, { useState } from 'react';

const EmbeddedSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      // In a real app, you would make an API call here
      console.log('Searching for:', searchQuery);
      // For demo purposes, we'll just show a mock result
      setSearchResults([
        `Search result 1 for "${searchQuery}"`,
        `Search result 2 for "${searchQuery}"`,
        `Search result 3 for "${searchQuery}"`
      ]);
      setIsSearching(false);
    }, 1000);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div style={{
      maxWidth: '800px',
      margin: '2rem auto',
      padding: '0 1rem',
    }}>
      <h1 style={{
        color: '#4a6fa5',
        textAlign: 'center',
        marginBottom: '2rem'
      }}>
        Embedded Search
      </h1>
      <div style={{
        backgroundColor: '#fff',
        borderRadius: '8px',
        padding: '2rem',
        boxShadow: '0 2px 15px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{
          display: 'flex',
          gap: '10px',
          marginBottom: '2rem'
        }}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter your search query..."
            style={{
              flex: 1,
              padding: '12px 16px',
              fontSize: '1rem',
              border: '1px solid #ddd',
              borderRadius: '8px',
              outline: 'none',
              transition: 'border-color 0.3s',
            }}
          />
          <button
            onClick={handleSearch}
            disabled={isSearching || !searchQuery.trim()}
            style={{
              padding: '0 24px',
              backgroundColor: '#4a6fa5',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: '500',
              transition: 'background-color 0.3s',
              opacity: (isSearching || !searchQuery.trim()) ? 0.7 : 1,
              cursor: (isSearching || !searchQuery.trim()) ? 'not-allowed' : 'pointer',
            }}
          >
            {isSearching ? 'Searching...' : 'Search'}
          </button>
        </div>

        {isSearching ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <p>Searching for "{searchQuery}"...</p>
          </div>
        ) : searchResults.length > 0 ? (
          <div>
            <h3 style={{ marginBottom: '1rem' }}>Search Results:</h3>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}>
              {searchResults.map((result, index) => (
                <li key={index} style={{
                  padding: '12px 16px',
                  borderBottom: '1px solid #eee',
                  '&:last-child': {
                    borderBottom: 'none'
                  },
                  '&:hover': {
                    backgroundColor: '#f9f9f9'
                  }
                }}>
                  {result}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p style={{
            color: '#666',
            textAlign: 'center',
            fontStyle: 'italic'
          }}>
            Enter a search query and click the Search button to see results.
          </p>
        )}
      </div>
    </div>
  );
};

export default EmbeddedSearch;
