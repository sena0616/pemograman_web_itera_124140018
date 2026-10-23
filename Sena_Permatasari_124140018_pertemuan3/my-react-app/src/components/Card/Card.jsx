import React from 'react';

function Card({ children }) {
  return (
    <div
      style={{
        border: '1px solid #cbd5e1',
        borderRadius: '8px',
        padding: '1rem',
        background: 'white',
        marginBottom: '1.5rem',
      }}
    >
      {children}
    </div>
  );
}

export default Card;