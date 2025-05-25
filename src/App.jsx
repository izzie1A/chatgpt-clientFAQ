import { useState, useEffect } from 'react';  // 加入 useEffect
import { askChatGPT, testAPIKey } from './api/chatgpt';

function App() {
  const [input, setInput] = useState('');
  const [reply, setReply] = useState('');

  // 將 useEffect 移入組件內部
  useEffect(() => {
    const testConnection = async () => {
      console.log('正在測試 API Key 連接...');
      const isConnected = await testAPIKey();
      if (isConnected) {
        console.log('✅ API Key 連接成功！');
      } else {
        console.error('❌ API Key 連接失敗，請檢查你的 API Key 是否正確');
      }
    };
    testConnection();
  }, []);  // 空依賴數組表示只喺組件掛載時運行一次

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const res = await askChatGPT(input);
      setReply(res);
    } catch (err) {
      console.error('Error calling ChatGPT:', err);
      setError(`Error: ${err.message || 'Failed to get response from ChatGPT'}`);
      setReply('Sorry, there was an error processing your request.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTestShippingQuestion = async () => {
    const question = "When is the shipping estimate date?";
    setInput(question);
    
    setIsLoading(true);
    setError(null);
    
    try {
      const res = await askChatGPT(question);
      setReply(res);
    } catch (err) {
      console.error('Error calling ChatGPT:', err);
      setError(`Error: ${err.message || 'Failed to get response from ChatGPT'}`);
      setReply('Sorry, there was an error processing your request.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: 800, margin: '0 auto' }}>
      <h2>🌟 Talk to ChatGPT</h2>
      <div style={{ marginBottom: 20 }}>
        <button 
          onClick={handleTestShippingQuestion}
          style={{
            padding: '8px 16px',
            marginRight: 10,
            backgroundColor: '#f0f0f0',
            border: '1px solid #ccc',
            borderRadius: 4,
            cursor: 'pointer'
          }}
        >
          Test Shipping Question
        </button>
      </div>
      <textarea
        rows="10"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ 
          width: '100%',
          padding: 10,
          marginBottom: 10,
          fontSize: 16,
          borderRadius: 4,
          border: '1px solid #ccc'
        }}
        placeholder="Ask something..."
      />
      <button 
        onClick={handleSend}
        disabled={isLoading}
        style={{
          padding: '10px 20px',
          backgroundColor: isLoading ? '#cccccc' : '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: 4,
          cursor: isLoading ? 'not-allowed' : 'pointer',
          fontSize: 16,
          opacity: isLoading ? 0.7 : 1
        }}
      >
        {isLoading ? 'Sending...' : 'Send'}
      </button>
      
      <div style={{ marginTop: 20, padding: 15, border: '1px solid #eee', borderRadius: 4, minHeight: 100 }}>
        <strong>ChatGPT:</strong>
        {isLoading ? (
          <p>Loading response...</p>
        ) : error ? (
          <div style={{ color: 'red', marginTop: 10 }}>{error}</div>
        ) : (
          <p style={{ whiteSpace: 'pre-wrap', marginTop: 10 }}>{reply || 'Ask me anything about shipping or other topics!'}</p>
        )}
      </div>
      
      {/* Debug Info - Only show in development */}
      {import.meta.env.DEV && (
        <div style={{ marginTop: 20, padding: 15, backgroundColor: '#f5f5f5', borderRadius: 4, fontSize: 12 }}>
          <div><strong>Debug Info:</strong></div>
          <div>API Key: {import.meta.env.VITE_OPENAI_API_KEY ? '✅ Set' : '❌ Missing'}</div>
          <div>Environment: {import.meta.env.MODE}</div>
        </div>
      )}
    </div>
  );
}

export default App;  // 確保有導出組件