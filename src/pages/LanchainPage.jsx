import React from 'react';
import { useNavigate } from 'react-router-dom';

const LanchainPage = () => {
  const navigate = useNavigate();

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
        Lanchain Page
      </h1>


      <p style={{
        fontSize: '1.1rem',
        lineHeight: '1.6',
        color: '#555',
      }}>
        This is the Lanchain page content. You can add your content here.
      </p>
    

      
    </div>
  );
};

export default LanchainPage;
