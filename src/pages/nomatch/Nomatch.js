import React from 'react';

const Nomatch = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 'calc(100vh - 60px)',
      fontFamily: "'Inter', sans-serif",
      textAlign: 'center',
      padding: '40px 20px',
    }}>
      <div style={{
        fontSize: '120px',
        fontWeight: '800',
        background: 'linear-gradient(135deg, #6c63ff, #00d4aa)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        lineHeight: '1',
        marginBottom: '16px',
      }}>
        404
      </div>
      <h2 style={{
        color: '#f0f0f5',
        fontWeight: '600',
        fontSize: '24px',
        marginBottom: '12px',
      }}>
        Page Not Found
      </h2>
      <p style={{
        color: '#9d9db5',
        fontSize: '16px',
        maxWidth: '400px',
        marginBottom: '32px',
        lineHeight: '1.6',
      }}>
        The page you're looking for doesn't exist or has been moved.
      </p>
      <a href="/" style={{
        background: 'linear-gradient(135deg, #6c63ff, #8b83ff)',
        color: '#fff',
        padding: '12px 32px',
        borderRadius: '14px',
        textDecoration: 'none',
        fontWeight: '600',
        fontSize: '15px',
        boxShadow: '0 6px 20px rgba(108, 99, 255, 0.35)',
        transition: 'all 0.3s ease',
      }}>
        ← Back to Dashboard
      </a>
    </div>
  );
};

export default Nomatch;