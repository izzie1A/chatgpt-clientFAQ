import React from 'react';
import { useNavigate } from 'react-router-dom';

const FaqPage = () => {
  const navigate = useNavigate();

  const faqItems = [
    {
      question: 'What is your return policy?',
      answer: 'We accept returns within 30 days of purchase with a valid receipt.'
    },
    {
      question: 'How can I track my order?',
      answer: 'You can track your order using the tracking number provided in your confirmation email.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, PayPal, and bank transfers.'
    },
    {
      question: 'Do you offer international shipping?',
      answer: 'Yes, we ship worldwide with various shipping options available at checkout.'
    }
  ];

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
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Frequently Asked Questions</h1>
        <p style={styles.subtitle}>Find answers to common questions about our services and policies</p>
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

        <button 
          onClick={() => navigate('/')} 
          style={styles.backButton}
          onMouseOver={(e) => e.target.style.backgroundColor = styles.backButtonHover.backgroundColor}
          onMouseOut={(e) => e.target.style.backgroundColor = styles.backButton.backgroundColor}
        >
          ← Back to Chat
        </button>
      </div>
    </div>
  );
};

export default FaqPage;
