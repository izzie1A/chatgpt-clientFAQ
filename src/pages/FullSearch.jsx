import { useState, useEffect } from 'react';
import faqData from '../assets/logistics_faq_tag.json';
import { fullSearchData } from '../api/chatgpt';
import { commonQuestions } from '../constants/commonQuestions';

const FullSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [allFaqs, setAllFaqs] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState('');

  // Handle question selection from dropdown
  const handleQuestionSelect = (e) => {
    const questionType = e.target.value;
    setSelectedQuestion(questionType);

    if (questionType !== 'custom' && questionType !== '') {
      const selected = commonQuestions.find(q => q.value === questionType);
      setSearchQuery(selected?.label || '');
    } else if (questionType === 'custom') {
      setSearchQuery('');
    }
  };

  // Load FAQ data when component mounts
  useEffect(() => {
    setAllFaqs(faqData);
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    setIsSearching(true);
    try {
      const tagsString = await fullSearchData(searchQuery);
      try {
        console.log(tagsString);
      } catch (e) {
        console.error('Error parsing tags:', e);
      }

      setSearchResults(tagsString);
    } catch (error) {
      console.error('Error in search:', error);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Search</h2>

      <form onSubmit={handleSearch} style={styles.searchForm}>
        <div style={styles.selectContainer}>
          <select
            value={selectedQuestion}
            onChange={handleQuestionSelect}
            style={styles.selectInput}
            disabled={isSearching}
          >
            {commonQuestions.map((q) => (
              <option key={q.value} value={q.value}>
                {q.label}
              </option>
            ))}
          </select>
        </div>
        <div style={styles.searchInputContainer}>
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
        </div>
      </form>

      <div style={{
        marginTop: '2rem',
        padding: '1.5rem',
        backgroundColor: '#f8f9fa',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        minHeight: '150px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.3s ease'
      }}>
        {isSearching ? (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              border: '4px solid #f3f3f3',
              borderTop: '4px solid #4a6fa5',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }}></div>
            <p style={{
              color: '#4a6fa5',
              fontWeight: '500',
              margin: 0
            }}>Searching for results...</p>
          </div>
        ) : searchResults.length > 0 ? (
          <div style={{
            width: '100%',
            maxWidth: '800px',
            margin: '0 auto',
            padding: '0.5rem 0'
          }}>
            <p style={{
              color: '#6c757d',
              marginBottom: '1.5rem',
              fontSize: '0.95rem',
              textAlign: 'center',
              fontStyle: 'italic'
            }}>
              Showing {searchResults.length} matching tag{searchResults.length !== 1 ? 's' : ''} for your search
            </p>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              padding: '1.5rem',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
            }}>
              {searchResults}
            </div>
          </div>
        ) : searchQuery ? (
          <div style={{
            textAlign: 'center',
            padding: '1.5rem'
          }}>
            <div style={{
              fontSize: '3rem',
              marginBottom: '1rem',
              color: '#e9ecef'
            }}>🔍</div>
            <h3 style={{
              color: '#495057',
              margin: '0 0 0.5rem 0'
            }}>No results found</h3>
            <p style={{
              color: '#6c757d',
              margin: 0
            }}>We couldn't find any matches for "{searchQuery}"</p>
          </div>
        ) : (
          <div style={{
            textAlign: 'center',
            padding: '1.5rem'
          }}>
            <div style={{
              fontSize: '3rem',
              marginBottom: '1rem',
              color: '#e9ecef'
            }}>🔍</div>
            <h3 style={{
              color: '#495057',
              margin: '0 0 0.5rem 0'
            }}>Search with tags</h3>
            <p style={{
              color: '#6c757d',
              margin: 0
            }}>Enter your search query to find relevant tags</p>
          </div>
        )}
      </div>
      
      <style jsx global>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>




      <div>
        <h2 style={styles.title}>FAQ</h2>
        <div style={styles.faqContainer}>
          {allFaqs.map((item, index) => (
            <div key={index} style={styles.faqItem}>
              <h3 style={styles.question}>{item.question}</h3>
              <p style={styles.answer}>{item.answer}</p>
              {item.tags.map((tag, index) => (
                <b key={index} style={styles.tag}>{tag}</b>
              ))}
            </div>
          ))}
        </div>
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
    flexDirection: 'column',
    gap: '1rem',
    marginBottom: '2rem',
  },
  selectContainer: {
    width: '100%',
    marginBottom: '0.5rem',
  },
  selectInput: {
    width: '100%',
    padding: '0.75rem',
    fontSize: '1rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    backgroundColor: 'white',
    cursor: 'pointer',
    color: '#6c757d',
    outline: 'none',
    ':focus': {
      borderColor: '#4a6fa5',
      boxShadow: '0 0 0 2px rgba(74, 111, 165, 0.2)'
    }
  },
  searchInputContainer: {
    display: 'flex',
    gap: '1rem',
    width: '100%',
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
  tag: {
    display: 'inline-block',
    backgroundColor: '#e9ecef',
    color: '#495057',
    padding: '0.25rem 0.5rem',
    borderRadius: '4px',
    fontSize: '0.8rem',
    marginRight: '0.5rem',
    marginBottom: '0.5rem',
  },
};

export default FullSearch;
