import { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { askChatGPT, testAPIKey } from './api/chatgpt';
import FaqPage from './pages/FaqPage';
import SearchPage from './pages/SearchPage';
import EmbeddedSearch from './pages/EmbeddedSearch';
import { FirebaseProvider } from './firebase/FirebaseContext';

// Navbar Component
const Navbar = () => {
  const navLinkStyle = {
    textDecoration: 'none',
    color: '#6c757d',
    fontWeight: '500',
    padding: '0.5rem 0',
    transition: 'all 0.3s ease',
    fontSize: '1.1rem',
    ':hover': {
      color: '#4a6fa5',
    },
  };

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 2rem',
      backgroundColor: '#fff',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
    }}>
      <Link to="/" style={{
        textDecoration: 'none',
        fontSize: '1.5rem',
        fontWeight: 'bold',
        background: 'linear-gradient(90deg, #4a6fa5, #5e9ce0)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        textFillColor: 'transparent',
      }}>
        ChatGPT
      </Link>
      <div style={{ display: 'flex', gap: '2rem' }}>
        <Link to="/" style={navLinkStyle}>Home</Link>
        <Link to="/faq" style={navLinkStyle}>FAQ</Link>
        <Link to="/search" style={navLinkStyle}>Search</Link>
        <Link to="/embedded-search" style={navLinkStyle}>Embedded Search</Link>
      </div>
    </nav>
  );
};

// Home Component
const Home = () => {
  const [input, setInput] = useState('');
  const [reply, setReply] = useState('');
  const [selectedQuestion, setSelectedQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Common questions for the dropdown
  const commonQuestions = [
    { value: '', label: 'Select a common question...' },
    { value: 'shipping', label: 'When is the shipping estimate date?' },
    { value: 'return', label: 'What is your return policy?' },
    { value: 'tracking', label: 'How can I track my order?' },
    { value: 'payment', label: 'What payment methods do you accept?' },
    { value: 'custom', label: 'Custom question...' }
  ];

  // Handle question selection from dropdown
  const handleQuestionSelect = (e) => {
    const questionType = e.target.value;
    setSelectedQuestion(questionType);

    if (questionType !== 'custom' && questionType !== '') {
      const selected = commonQuestions.find(q => q.value === questionType);
      setInput(selected?.label || '');
    } else if (questionType === 'custom') {
      setInput('');
    }
  };

  // Test API connection on component mount
  useEffect(() => {
    const testConnection = async () => {
      console.log('Testing API Key connection...');
      const isConnected = await testAPIKey();
      if (isConnected) {
        console.log('✅ API Key connected successfully!');
      } else {
        console.error('❌ API Key connection failed, please check your API Key');
      }
    };
    testConnection();
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;
    setIsLoading(true);
    setError(null);

    try {
      const res = await askChatGPT(input);
      setReply(res);
    } catch (err) {
      setError(`Error: ${err.message || 'Failed to get response from ChatGPT'}`);
      setReply('Sorry, there was an error processing your request.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTestShippingQuestion = async () => {
    if (!selectedQuestion) {
      setError('Please select a question or type your own');
      return;
    }

    const question = selectedQuestion && selectedQuestion !== 'custom'
      ? commonQuestions.find(q => q.value === selectedQuestion)?.label || input
      : input.trim();

    if (!question) return;

    setIsLoading(true);
    setError(null);

    try {
      const res = await askChatGPT(question);
      setReply(res);
    } catch (err) {
      setError(`Error: ${err.message || 'Failed to get response from ChatGPT'}`);
      setReply('Sorry, there was an error processing your request.');
    } finally {
      setIsLoading(false);
    }
  };

  const containerStyle = {
    maxWidth: '800px',
    margin: '2rem auto',
    padding: '2rem',
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  };

  const headingStyle = {
    textAlign: 'center',
    color: '#2c3e50',
    marginBottom: '2rem',
    fontWeight: '600',
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    fontSize: '1rem',
    border: '1px solid #ddd',
    borderRadius: '8px',
    marginBottom: '1rem',
    boxSizing: 'border-box',
    transition: 'border-color 0.3s ease',
  };

  const buttonStyle = {
    backgroundColor: '#4a6fa5',
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '500',
    transition: 'all 0.3s ease',
    width: '100%',
    marginTop: '1rem',
  };

  const replyStyle = {
    marginTop: '2rem',
    padding: '1.5rem',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    whiteSpace: 'pre-wrap',
  };

  const errorStyle = {
    color: '#dc3545',
    marginTop: '1rem',
    padding: '0.75rem',
    backgroundColor: '#f8d7da',
    borderRadius: '4px',
    border: '1px solid #f5c6cb',
  };

  const selectStyle = {
    width: '100%',
    padding: '12px 16px',
    fontSize: '1rem',
    border: '1px solid #ddd',
    borderRadius: '8px',
    marginBottom: '1rem',
    backgroundColor: 'white',
    cursor: 'pointer',
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Chat with ChatGPT</h1>
      
      <div>
        <select 
          value={selectedQuestion} 
          onChange={handleQuestionSelect}
          style={selectStyle}
        >
          {commonQuestions.map((q) => (
            <option key={q.value} value={q.value}>
              {q.label}
            </option>
          ))}
        </select>

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your question here..."
          style={inputStyle}
          disabled={isLoading || (selectedQuestion && selectedQuestion !== 'custom')}
        />

        <button 
          onClick={handleTestShippingQuestion}
          disabled={isLoading || (!input.trim() && !selectedQuestion)}
          style={{
            ...buttonStyle,
            opacity: (isLoading || (!input.trim() && !selectedQuestion)) ? 0.7 : 1,
            cursor: (isLoading || (!input.trim() && !selectedQuestion)) ? 'not-allowed' : 'pointer',
          }}
        >
          {isLoading ? 'Sending...' : 'Ask ChatGPT'}
        </button>

        {error && <div style={errorStyle}>{error}</div>}

        {reply && (
          <div style={replyStyle}>
            <h3>Response:</h3>
            <p>{reply}</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Main App Component
function AppContent() {
  return (
    <div className="App">
      <Navbar />
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/embedded-search" element={<EmbeddedSearch />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <FirebaseProvider>
      <AppContent />
    </FirebaseProvider>
  );
}

export default App;
