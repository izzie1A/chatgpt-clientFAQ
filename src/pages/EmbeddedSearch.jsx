import React, { useState } from 'react';
import { embeddSearchChatGPT } from '../api/chatgpt.js';
import faqData from '../assets/logistics_faq_embedded.json';


function cosineSimilarity(a, b) {
  const dot = a.reduce((sum, val, i) => sum + val * b[i], 0);
  const magA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
  const magB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
  return dot / (magA * magB);
}


const EmbeddedSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearching, setShowSearching] = useState(false);

  const [text, setText] = useState('');
  const [embedding, setEmbedding] = useState([]);

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    setIsSearching(true);

    setTimeout(() => {
      console.log('Searching for:', searchQuery);
      setSearchResults([
        `Search result 1 for "${searchQuery}"`,
        `Search result 2 for "${searchQuery}"`,
        `Search result 3 for "${searchQuery}"`
      ]);
      setIsSearching(false);
    }, 1000);
    embeddSearchChatGPT()

  };
  const handleSubmit = async () => {
    if (!text.trim()) return;
    
    setShowSearching(true);
    try {
      const result = await embeddSearchChatGPT(text);
      setEmbedding(result);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setShowSearching(false);
    }
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

          <textarea
            rows="4"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter your Question..."
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
            onClick={handleSubmit}
            style={{
              padding: '0 24px',
              backgroundColor: '#4a6fa5',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: '500',
              transition: 'all 0.2s ease-out',
              transform: 'translateY(0)',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
              position: 'relative',
              overflow: 'hidden',
              height: '40px',
              minWidth: '100px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.transform = 'translateY(2px)';
              e.currentTarget.style.boxShadow = '0 1px 2px rgba(0,0,0,0.2)';
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
            }}
            onTouchStart={(e) => {
              e.currentTarget.style.transform = 'translateY(2px)';
              e.currentTarget.style.boxShadow = '0 1px 2px rgba(0,0,0,0.2)';
            }}
            onTouchEnd={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
            }}
          >
            <span style={{
              position: 'relative',
              transition: 'all 0.3s ease',
              display: 'inline-block'
            }}>
              Search
            </span>
          </button>

          <style jsx global>{`
            @keyframes pulse {
              0% { transform: scale(1); }
              50% { transform: scale(0.95); }
              100% { transform: scale(1); }
            }
            button:active span {
              animation: pulse 0.3s ease;
            }
          `}</style>



          {/* <input
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
          </button> */}
        </div>

        {showSearching && (
          <div style={{
            textAlign: 'center',
            padding: '10px',
            color: '#4a6fa5',
            fontStyle: 'italic'
          }}>
            Searching...
          </div>
        )}

        
      </div>



      <div id="embedfaqSortResult">
        {[...faqData]
          .map(item => ({
            ...item,
            similarity: cosineSimilarity(embedding, item.embedding)
          }))
          .sort((a, b) => b.similarity - a.similarity)
          .map((item, index) => (
            <div key={index} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #eee', borderRadius: '4px' }}>
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
              <div style={{ color: '#666', fontSize: '0.9em' }}>
                Similarity score: {item.similarity.toFixed(4)}
              </div>
            </div>
          ))}
      </div>



    </div>
  );
};

export default EmbeddedSearch;
