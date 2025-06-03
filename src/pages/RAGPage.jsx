import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { commonQuestions } from '../constants/commonQuestions';
import faqData from '../assets/logistics_faq_raw.json';

const RAGPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState('');
  const [selectedFaq, setSelectedFaq] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

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
    // Simulate search delay and return demo results
    setTimeout(() => {
      setIsSearching(false);
      setSearchResults([
        {
          title: "Relevant Document 1",
          excerpt: "This document contains important information about logistics and shipping procedures...",
          score: 0.92,
          source: "logistics_faq_raw.json"
        },
        {
          title: "Relevant Document 2",
          excerpt: "Detailed information about shipping rates and delivery times...",
          score: 0.85,
          source: "shipping_policies.json"
        },
        {
          title: "Relevant Document 3",
          excerpt: "Best practices for handling international shipments...",
          score: 0.78,
          source: "international_shipping_guide.json"
        }
      ]);
    }, 2000);
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
              <h3 style={{
                color: '#4a6fa5',
                marginBottom: '0.5rem',
                fontSize: '1.2rem',
              }}>FAQ Preview</h3>
              <select
                value={selectedFaq || ''}
                onChange={(e) => {
                  const faqIndex = e.target.value;
                  setSelectedFaq(faqIndex);
                  setSearchQuery(faqData[faqIndex]?.question || '');
                }}
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
                <option value="">Select a FAQ item...</option>
                {faqData.map((faq, index) => (
                  <option key={index} value={index}>
                    {faq.question}
                  </option>
                ))}
              </select>
            </div>

            {selectedFaq !== null && (
              <div style={{
                backgroundColor: '#f8f9fa',
                padding: '1rem',
                borderRadius: '4px',
                marginBottom: '1rem',
              }}>
                <h4 style={{
                  color: '#4a6fa5',
                  marginBottom: '0.5rem',
                  fontSize: '1.1rem',
                }}>Selected FAQ:</h4>
                <p style={{
                  color: '#333',
                  marginBottom: '0.5rem',
                }}>Question: {faqData[selectedFaq].question}</p>
                <p style={{
                  color: '#666',
                }}>Answer: {faqData[selectedFaq].answer}</p>
              </div>
            )}
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
                  opacity: isSearching ? 0.7 : 1,
                  cursor: isSearching ? 'not-allowed' : 'pointer'
                }}
                disabled={isSearching}
              >
                {isSearching ? 'Searching...' : 'Search'}
              </button>
            </div>
          </form>

          {searchResults.length > 0 && (
            <div style={{
              marginTop: '2rem',
              backgroundColor: '#fff',
              padding: '1.5rem',
              borderRadius: '8px',
              boxShadow: '0 2px 15px rgba(0, 0, 0, 0.1)',
            }}>
              <h3 style={{
                color: '#4a6fa5',
                marginBottom: '1rem',
                fontSize: '1.2rem',
              }}>Search Results</h3>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}>
                {searchResults.map((result, index) => (
                  <div key={index} style={{
                    padding: '1rem',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '4px',
                    border: '1px solid #ddd',
                  }}>
                    <h4 style={{
                      color: '#4a6fa5',
                      marginBottom: '0.5rem',
                      fontSize: '1.1rem',
                    }}>{result.title}</h4>
                    <p style={{
                      color: '#666',
                      marginBottom: '0.5rem',
                    }}>Relevance Score: {result.score.toFixed(2)}</p>
                    <p style={{
                      color: '#333',
                      marginBottom: '0.5rem',
                    }}>Source: {result.source}</p>
                    <p style={{
                      color: '#555',
                      lineHeight: '1.6',
                    }}>{result.excerpt}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div style={{
            marginTop: '2rem',
            borderTop: '1px solid #eee',
            paddingTop: '1rem',
          }}>
            <h3 style={{
              color: '#4a6fa5',
              marginBottom: '1rem',
            }}>How it works</h3>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
              }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  backgroundColor: '#4a6fa5',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                }}>1</div>
                <div>
                  <h4 style={{
                    color: '#4a6fa5',
                    marginBottom: '0.5rem',
                  }}>Document Retrieval</h4>
                  <p style={{
                    color: '#666',
                    lineHeight: '1.6',
                  }}>The system retrieves relevant documents based on your query using semantic search.</p>
                </div>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
              }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  backgroundColor: '#4a6fa5',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                }}>2</div>
                <div>
                  <h4 style={{
                    color: '#4a6fa5',
                    marginBottom: '0.5rem',
                  }}>Context Generation</h4>
                  <p style={{
                    color: '#666',
                    lineHeight: '1.6',
                  }}>The system generates context-aware responses by combining retrieved information.</p>
                </div>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
              }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  backgroundColor: '#4a6fa5',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                }}>3</div>
                <div>
                  <h4 style={{
                    color: '#4a6fa5',
                    marginBottom: '0.5rem',
                  }}>Response Generation</h4>
                  <p style={{
                    color: '#666',
                    lineHeight: '1.6',
                  }}>The system generates accurate and context-aware responses based on the retrieved information.</p>
                </div>
              </div>
            </div>
          </div>

          <div style={{
            marginTop: '2rem',
            borderTop: '1px solid #eee',
            paddingTop: '1rem',
          }}>
            <h3 style={{
              color: '#4a6fa5',
              marginBottom: '1rem',
            }}>Benefits</h3>
            <ul style={{
              listStyleType: 'disc',
              paddingLeft: '1.5rem',
              color: '#666',
            }}>
              <li>More accurate and context-aware responses</li>
              <li>Ability to retrieve and use relevant documents</li>
              <li>Improved understanding of complex queries</li>
              <li>Better handling of domain-specific knowledge</li>
            </ul>
          </div>

          <div style={{
            marginTop: '2rem',
            borderTop: '1px solid #eee',
            paddingTop: '1rem',
          }}>
            <h3 style={{
              color: '#4a6fa5',
              marginBottom: '1rem',
            }}>Try it out</h3>
            <p style={{
              color: '#666',
              lineHeight: '1.6',
            }}>Enter your query above and see how the system retrieves relevant documents and generates context-aware responses.</p>
          </div>

          <div style={{
            marginTop: '2rem',
            borderTop: '1px solid #eee',
            paddingTop: '1rem',
          }}>
            <h3 style={{
              color: '#4a6fa5',
              marginBottom: '1rem',
            }}>Note</h3>
            <p style={{
              color: '#666',
              lineHeight: '1.6',
            }}>This is a demo implementation. In a real RAG system, the search would be integrated with a vector database and a language model to provide actual context-aware responses.</p>
          </div>

          <div style={{
            marginTop: '2rem',
            borderTop: '1px solid #eee',
            paddingTop: '1rem',
            textAlign: 'center',
          }}>
            <button
              onClick={() => navigate('/')}  // Navigate back to home
              style={{
                padding: '0.75rem 1.5rem',
                borderRadius: '4px',
                backgroundColor: '#4a6fa5',
                color: '#fff',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1rem',
                transition: 'background-color 0.3s ease',
              }}
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
