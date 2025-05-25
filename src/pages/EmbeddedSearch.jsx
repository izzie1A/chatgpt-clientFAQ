import React from 'react';

const EmbeddedSearch = () => {
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
        <p>
          This is the Embedded Search page. You can add your search functionality here.
        </p>
        {/* Add your embedded search component here in the future */}
      </div>
    </div>
  );
};

export default EmbeddedSearch;
