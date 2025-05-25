import { useState, useEffect } from 'react';
import faqData from '../assets/logistics_faq_tagged.json';
import { askChatGPT, testAPIKey } from '../api/chatgpt';

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [allFaqs, setAllFaqs] = useState([]);

  // Load FAQ data when component mounts
  useEffect(() => {
    setAllFaqs(faqData);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    
    setIsSearching(true);
    
    // Simple search implementation
    const query = searchQuery.toLowerCase().trim();
    
    const results = allFaqs.filter(item => {
      // Search in question and answer
      return (
        item.question.toLowerCase().includes(query) ||
        item.answer.toLowerCase().includes(query) ||
        // Search in tags if they exist
        (item.tags && item.tags.some(tag => tag.toLowerCase().includes(query)))
      );
    }).map(item => ({
      id: item.id,
      title: item.question,
      preview: item.answer.length > 150 ? item.answer.substring(0, 150) + '...' : item.answer,
      fullAnswer: item.answer,
      tags: item.tags || []
    }));
    
    setSearchResults(results);
    setIsSearching(false);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Search</h2>
      
      <form onSubmit={handleSearch} style={styles.searchForm}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Enter your search query..."
          style={styles.searchInput}
          disabled={isSearching}
        />
        <button 
          type="submit" 
          style={styles.searchButton}
          disabled={isSearching || !searchQuery.trim()}
        >
          {isSearching ? 'Searching...' : 'Search'}
        </button>
      </form>

      <div style={styles.resultsContainer}>
        {isSearching ? (
          <p>Searching...</p>
        ) : searchResults.length > 0 ? (
          <div style={styles.resultsList}>
            {searchResults.map((result) => (
              <div key={result.id} style={styles.resultItem}>
                <h3 style={styles.resultTitle}>{result.title}</h3>
                <p style={styles.resultPreview}>{result.preview}</p>
              </div>
            ))}
          </div>
        ) : searchQuery ? (
          <p>No results found for "{searchQuery}"</p>
        ) : (
          <p>Enter a search query to begin</p>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '2rem',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '1.5rem',
    color: '#333',
  },
  searchForm: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '2rem',
  },
  searchInput: {
    flex: 1,
    padding: '0.75rem 1rem',
    fontSize: '1rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  searchInputFocus: {
    borderColor: '#4a6fa5',
  },
  searchButton: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#4a6fa5',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'background-color 0.2s',
  },
  searchButtonHover: {
    backgroundColor: '#3a5a80',
  },
  searchButtonDisabled: {
    backgroundColor: '#cccccc',
    cursor: 'not-allowed',
  },
  resultsContainer: {
    minHeight: '200px',
  },
  resultsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  resultItem: {
    backgroundColor: '#f8f9fa',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
    transition: 'transform 0.2s, box-shadow 0.2s',
  },
  resultItemHover: {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  resultTitle: {
    margin: '0 0 0.5rem',
    color: '#2c3e50',
  },
  resultPreview: {
    margin: 0,
    color: '#6c757d',
    lineHeight: 1.5,
  },
};

export default SearchPage;
