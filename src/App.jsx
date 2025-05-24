import { useState } from 'react';
import { askChatGPT } from './api/chatgpt';

function App() {
  const [input, setInput] = useState('');
  const [reply, setReply] = useState('');

  const handleSend = async () => {
    const res = await askChatGPT(input);
    setReply(res);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>🌟 Talk to ChatGPT</h2>
      <textarea
        rows="10"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ width: '100%' }}
        placeholder="Ask something..."
      />
      <button onClick={handleSend}>Send</button>
      <div>
        <strong>ChatGPT:</strong>
        <p>{reply}</p>
      </div>
    </div>
  );
}

export default App;