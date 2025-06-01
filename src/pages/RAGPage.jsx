import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { commonQuestions } from '../constants/commonQuestions';

const RAGPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
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

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    // Add your search logic here
    setTimeout(() => {
      setIsSearching(false);
    }, 2000); // Simulate search delay
  };

  return (
    <div style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '2rem',
    }}>
      <h1 style={{
        fontSize: '2rem',
        marginBottom: '2rem',
        color: '#333',
      }}>
        RAG (Retrieval-Augmented Generation) Page
      </h1>

      <div style={{
        backgroundColor: '#fff',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 2px 15px rgba(0, 0, 0, 0.1)',
        marginBottom: '2rem',
      }}>
        <p style={{
          fontSize: '1.1rem',
          lineHeight: '1.6',
          color: '#555',
          marginBottom: '1rem',
        }}>
          This is the RAG page where you can explore Retrieval-Augmented Generation capabilities.
          RAG combines traditional information retrieval with language models to provide more accurate and context-aware responses.
        </p>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}>
          <div>
            <h2 style={{
              color: '#4a6fa5',
              marginBottom: '0.5rem',
            }}>Key Features</h2>
            <ul style={{
              listStyleType: 'disc',
              paddingLeft: '1.5rem',
              color: '#666',
            }}>
              <li>Context-aware responses</li>
              <li>Document retrieval</li>
              <li>Knowledge base integration</li>
              <li>Improved accuracy</li>
            </ul>
          </div>

          <form onSubmit={handleSearch} style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            marginTop: '2rem',
          }}>
            <div>
              <select
                value={selectedQuestion}
                onChange={handleQuestionSelect}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '4px',
                  border: '1px solid #ddd',
                  fontSize: '1rem',
                  backgroundColor: '#fff',
                  color: '#333',
                }}
              >
                {commonQuestions.map((q) => (
                  <option key={q.value} value={q.value}>
                    {q.label}
                  </option>
                ))}
              </select>
            </div>

            <div style={{
              display: 'flex',
              gap: '1rem',
              alignItems: 'center',
            }}>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter your search query..."
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  borderRadius: '4px',
                  border: '1px solid #ddd',
                  fontSize: '1rem',
                  backgroundColor: '#fff',
                  color: '#333',
                }}
                disabled={isSearching}
              />
              <button
                type="submit"
                style={{
                  padding: '0.75rem 1.5rem',
                  borderRadius: '4px',
                  backgroundColor: '#4a6fa5',
                  color: '#fff',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  transition: 'background-color 0.3s ease',
                  opacity: isSearching || !searchQuery.trim() ? 0.6 : 1,
                  cursor: (isSearching || !searchQuery.trim()) ? 'not-allowed' : 'pointer',
                }}
                disabled={isSearching || !searchQuery.trim()}
              >
                {isSearching ? 'Searching...' : 'Search'}
              </button>
            </div>
          </form>

          <div style={{
            marginTop: '2rem',
            borderTop: '1px solid #eee',
            paddingTop: '1rem',
          }}>
            <button
              onClick={() => navigate('/')}
              style={{
                backgroundColor: '#4a6fa5',
                color: '#fff',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '1rem',
                transition: 'background-color 0.3s ease',
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#3a5a80'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#4a6fa5'}
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>

      


    </div>
  );
};

export default RAGPage;
