import React, { useState, useEffect } from 'react';
import faqData from '../assets/logistics_faq_raw.json';

const FullSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearching, setShowSearching] = useState(false);
  const [faqs, setFaqs] = useState([]);

  // 載入 FAQ 數據
  useEffect(() => {
    setFaqs(faqData);
  }, []);

  // Future implementation note:
  // For production, you'll want to implement a proper search functionality
  // that includes cosine similarity for semantic search. Here's a placeholder
  // for that future implementation.
  // 
  // const faqData = [
  //   {
  //     question: 'Sample question',
  //     answer: 'Sample answer',
  //     embedding: [0.1, 0.2, 0.3]
  //   }
  // ];
  //
  // const cosineSimilarity = (a, b) => {
  //   if (!a || !b || a.length !== b.length) return 0;
  //   const dot = a.reduce((sum, val, i) => sum + val * b[i], 0);
  //   const magA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
  //   const magB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
  //   return dot / (magA * magB);
  // };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setShowSearching(true);

    try {
      // 簡單的關鍵字搜索
      const query = searchQuery.toLowerCase();
      const results = faqs.filter(item => 
        item.question.toLowerCase().includes(query) || 
        item.answer.toLowerCase().includes(query)
      );
      
      setSearchResults(results);
      
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsSearching(false);
      setShowSearching(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e);
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
        Full Search
      </h1>

      <div style={{
        backgroundColor: '#fff',
        borderRadius: '8px',
        padding: '2rem',
        boxShadow: '0 2px 15px rgba(0, 0, 0, 0.1)'
      }}>
        <form onSubmit={handleSearch} style={{
          display: 'flex',
          gap: '10px',
          marginBottom: '2rem',
          flexDirection: 'column'
        }}>
          <div style={{ display: 'flex', gap: '10px' }}>
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
                ':focus': {
                  borderColor: '#4a6fa5',
                  boxShadow: '0 0 0 2px rgba(74, 111, 165, 0.2)'
                }
              }}
              disabled={isSearching}
            />

            <button
              type="submit"
              disabled={isSearching || !searchQuery.trim()}
              style={{
                padding: '0 24px',
                backgroundColor: isSearching || !searchQuery.trim() ? '#cccccc' : '#4a6fa5',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: isSearching || !searchQuery.trim() ? 'not-allowed' : 'pointer',
                fontSize: '1rem',
                fontWeight: '500',
                transition: 'all 0.2s ease-out',
                opacity: isSearching || !searchQuery.trim() ? 0.7 : 1,
                height: '46px',
                minWidth: '100px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onMouseDown={(e) => {
                if (!isSearching && searchQuery.trim()) {
                  e.currentTarget.style.transform = 'translateY(2px)';
                  e.currentTarget.style.boxShadow = '0 1px 2px rgba(0,0,0,0.2)';
                }
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
              }}
            >
              {isSearching ? (
                <span style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <span style={{
                    display: 'inline-block',
                    width: '16px',
                    height: '16px',
                    border: '2px solid rgba(255,255,255,0.3)',
                    borderTopColor: 'white',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }}></span>
                  Searching...
                </span>
              ) : 'Search'}
            </button>
          </div>
        </form>

        {showSearching && isSearching && (
          <div style={{
            textAlign: 'center',
            padding: '20px',
            color: '#4a6fa5',
            fontStyle: 'italic'
          }}>
            <div style={{
              display: 'inline-block',
              width: '24px',
              height: '24px',
              border: '3px solid rgba(74, 111, 165, 0.2)',
              borderTopColor: '#4a6fa5',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              marginRight: '10px',
              verticalAlign: 'middle'
            }}></div>
            <span>Searching for results...</span>
          </div>
        )}

        {searchResults.length > 0 && (
          <div style={{ marginTop: '20px' }}>
            <h3 style={{
              color: '#4a6fa5',
              marginBottom: '16px',
              borderBottom: '1px solid #eee',
              paddingBottom: '8px'
            }}>
              Search Results
            </h3>
            <div id="faqResults">
              {searchResults.map((item, index) => (
                <div key={index} className="faq-item">
                  <h3>{item.question}</h3>
                  <p>{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default FullSearch;
