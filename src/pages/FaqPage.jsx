import React from 'react';
import { useNavigate } from 'react-router-dom';
import faqData from '../assets/logistics_faq_raw.json';
import { embeddSearchChatGPT } from '../api/chatgpt.js';

const FaqPage = () => {
  const navigate = useNavigate();

  const faqItems = faqData;

  // Handle save functionality
  const saveF = async () => {
    try {
      // Log all FAQ items to console
      let result = []
      console.log('All FAQ Items:');
      for (let i = 0; i < faqData.length; i++) {
      // for (let i = 0; i < 4; i++) {
        const embedding = await embeddSearchChatGPT(faqData[i].question);

        console.log(embedding);
        console.log(`FAQ Item ${i + 1}:`, faqData[i]);
        result.push({ question: faqData[i].question, answer: faqData[i].answer, embedding: embedding })
      }
      downloadJSON(result)


      // Example: Save the current FAQ items to local storage
      // localStorage.setItem('faqItems', JSON.stringify(faqItems));

      // Example: Navigate to a different page after save
      // navigate('/embedded-search');

      // Example: Log to console for debugging
      console.log('Save function called', { timestamp: new Date().toISOString() });

    } catch (error) {
      console.error('Error in saveF:', error);
      alert('An error occurred while saving.');
    }
  };
  const downloadJSON = (data, filename = 'data.json') => {
    const jsonStr = JSON.stringify(data, null, 2); // pretty-print JSON
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };


  // Inline styles
  const styles = {
    container: {
      maxWidth: '800px',
      margin: '0 auto',
      padding: '2rem 1rem',
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
    },
    header: {
      textAlign: 'center',
      marginBottom: '2.5rem',
    },
    title: {
      fontSize: '2.2rem',
      color: '#2c3e50',
      marginBottom: '0.5rem',
      background: 'linear-gradient(90deg, #4a6fa5, #5e9ce0)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
    },
    subtitle: {
      color: '#6c757d',
      fontSize: '1.1rem',
      margin: '0.5rem 0',
    },
    content: {
      backgroundColor: 'white',
      borderRadius: '10px',
      padding: '2rem',
      boxShadow: '0 2px 15px rgba(0, 0, 0, 0.05)',
    },
    faqContainer: {
      marginBottom: '2rem',
    },
    faqItem: {
      marginBottom: '1.5rem',
      paddingBottom: '1.5rem',
      borderBottom: '1px solid #eee',
    },
    question: {
      color: '#2c3e50',
      fontSize: '1.2rem',
      margin: '0 0 0.5rem 0',
    },
    answer: {
      color: '#555',
      lineHeight: '1.6',
      margin: '0',
    },
    backButton: {
      display: 'inline-flex',
      alignItems: 'center',
      backgroundColor: '#f8f9fa',
      color: '#4a6fa5',
      border: '1px solid #dee2e6',
      borderRadius: '6px',
      padding: '0.6rem 1.2rem',
      fontSize: '0.95rem',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
    },
    backButtonHover: {
      backgroundColor: '#e9ecef',
      borderColor: '#ced4da',
    },
    contactButton: {
      display: 'inline-flex',
      alignItems: 'center',
      backgroundColor: '#4a6fa5',
      color: 'white',
      border: '1px solid #3a5a80',
      borderRadius: '6px',
      padding: '0.6rem 1.2rem',
      fontSize: '0.95rem',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      marginLeft: '1rem',
    },
    contactButtonHover: {
      backgroundColor: '#3a5a80',
      borderColor: '#2a4a70',
    },
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <p style={styles.title}>Frequently Asked Questions</p>
      </header>

      <div style={styles.content}>
        <div style={styles.faqContainer}>
          {faqItems.map((item, index) => (
            <div key={index} style={styles.faqItem}>
              <h3 style={styles.question}>{item.question}</h3>
              <p style={styles.answer}>{item.answer}</p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center' }}>
          <button
            onClick={() => navigate('/')}
            style={styles.backButton}
            onMouseOver={(e) => e.target.style.backgroundColor = styles.backButtonHover.backgroundColor}
            onMouseOut={(e) => e.target.style.backgroundColor = styles.backButton.backgroundColor}
          >
            ← 返回聊天室 / Back to Chat
          </button>
          <button
            onClick={() => saveF()}
            style={styles.contactButton}
          >
            get embedded
          </button>
        </div>
      </div>
    </div>
  );
};

export default FaqPage;
