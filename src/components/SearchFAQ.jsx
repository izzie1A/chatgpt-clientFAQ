import React, { useState } from 'react';

function SearchFAQ() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setIsLoading(true);
    setError('');
    
    try {
      const res = await fetch('http://localhost:5000/search-faq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query }),
      });

      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }

      const data = await res.json();
      setResults(data.results || []);
    } catch (err) {
      console.error('Search failed:', err);
      setError('Failed to fetch results. Please try again.');
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '2rem',
      backgroundColor: '#fff',
      borderRadius: '8px',
      boxShadow: '0 2px 15px rgba(0, 0, 0, 0.1)'
    }}>
      <h2 style={{
        color: '#4a6fa5',
        marginBottom: '1.5rem',
        textAlign: 'center'
      }}>
        Ask a Question
      </h2>
      
      <form onSubmit={handleSearch} style={{
        display: 'flex',
        gap: '10px',
        marginBottom: '1.5rem'
      }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type your question here..."
          style={{
            flex: 1,
            padding: '10px 15px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '16px'
          }}
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !query.trim()}
          style={{
            padding: '10px 20px',
            backgroundColor: '#4a6fa5',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px',
            opacity: (isLoading || !query.trim()) ? 0.7 : 1,
            pointerEvents: (isLoading || !query.trim()) ? 'none' : 'auto'
          }}
        >
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {error && (
        <div style={{
          color: '#e74c3c',
          marginBottom: '1rem',
          textAlign: 'center'
        }}>
          {error}
        </div>
      )}

      {results.length > 0 && (
        <div>
          <h3 style={{
            color: '#4a6fa5',
            margin: '1.5rem 0 1rem',
            borderBottom: '1px solid #eee',
            paddingBottom: '0.5rem'
          }}>
            Top Matches:
          </h3>
          <ul style={{
            listStyle: 'none',
            padding: 0,
            margin: 0
          }}>
            {results.map((r, i) => (
              <li 
                key={i}
                style={{
                  padding: '12px 15px',
                  marginBottom: '10px',
                  backgroundColor: '#f9f9f9',
                  borderRadius: '4px',
                  borderLeft: '4px solid #4a6fa5'
                }}
              >
                <div style={{
                  fontWeight: '500',
                  marginBottom: '5px'
                }}>
                  {r.question}
                </div>
                <div style={{
                  fontSize: '0.85em',
                  color: '#666'
                }}>
                  Confidence: {(r.score * 100).toFixed(1)}%
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SearchFAQ;
