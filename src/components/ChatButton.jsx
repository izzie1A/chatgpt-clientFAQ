import React, { useState } from 'react';
import styled from 'styled-components';

const ChatButtonContainer = styled.div`
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 1000;
  
  @media (max-width: 768px) {
    bottom: 20px;
    right: 20px;
  }
`;

const ChatButtonStyle = styled.button`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #4a90e2;
  color: white;
  border: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  font-size: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  position: relative;
  z-index: 1001;
  
  @media (max-width: 768px) {
    width: 56px;
    height: 56px;
    font-size: 24px;
  }
  
  &:hover {
    background-color: #357abd;
    transform: scale(1.1);
  }
`;

const ChatWindow = styled.div`
  position: fixed;
  bottom: 100px;
  right: 30px;
  
  @media (max-width: 768px) {
    right: 20px;
    bottom: 90px;
    width: calc(100% - 40px) !important;
    max-width: 100%;
    height: 60vh;
  }
  width: 350px;
  height: 500px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.2);
  display: ${props => (props.isOpen ? 'flex' : 'none')};
  flex-direction: column;
  z-index: 1000;
  overflow: hidden;
`;

const ChatHeader = styled.div`
  padding: 15px;
  background: #4a90e2;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ChatBody = styled.div`
  flex: 1;
  padding: 15px;
  overflow-y: auto;
`;

const ChatFooter = styled.div`
  padding: 15px;
  border-top: 1px solid #eee;
  display: flex;
  gap: 10px;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 20px;
  outline: none;
  
  &:focus {
    border-color: #4a90e2;
  }
`;

const SendButton = styled.button`
  background: #4a90e2;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 0 20px;
  cursor: pointer;
  
  &:hover {
    background: #357abd;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
`;

const ChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello! How can I help you today?', sender: 'bot' }
  ]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() === '') return;
    
    // Add user message
    const newMessage = {
      id: messages.length + 1,
      text: message,
      sender: 'user'
    };
    
    setMessages([...messages, newMessage]);
    setMessage('');
    
    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: 'Thanks for your message! How can I assist you further?',
        sender: 'bot'
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  return (
    <>
      <ChatButtonContainer>
        <ChatButtonStyle onClick={toggleChat}>
          💬
        </ChatButtonStyle>
      </ChatButtonContainer>
      
      <ChatWindow isOpen={isOpen}>
        <ChatHeader>
          <h3>Chat with us</h3>
          <CloseButton onClick={toggleChat}>×</CloseButton>
        </ChatHeader>
        
        <ChatBody>
          {messages.map(msg => (
            <div 
              key={msg.id} 
              style={{
                textAlign: msg.sender === 'user' ? 'right' : 'left',
                margin: '10px 0',
                padding: '8px 12px',
                borderRadius: '15px',
                backgroundColor: msg.sender === 'user' ? '#e3f2fd' : '#f5f5f5',
                maxWidth: '80%',
                marginLeft: msg.sender === 'user' ? 'auto' : '0',
                wordWrap: 'break-word'
              }}
            >
              {msg.text}
            </div>
          ))}
        </ChatBody>
        
        <form onSubmit={handleSendMessage}>
          <ChatFooter>
            <Input 
              type="text" 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
            />
            <SendButton type="submit">Send</SendButton>
          </ChatFooter>
        </form>
      </ChatWindow>
    </>
  );
};

export default ChatButton;
