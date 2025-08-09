import React from 'react';

const ExpediaAppSection = () => {
  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <h2 style={styles.title}>Explore the World with Expedia</h2>
        <p style={styles.description}>
          Book flights, hotels, and rental cars all in one place. Enjoy exclusive deals and
          travel smarter with our easy-to-use app.
        </p>
      </div>
    </section>
  );
};

const styles = {
  section: {
    background: 'linear-gradient(135deg, #6B73FF 0%, #000DFF 100%)',
    color: '#fff',
    padding: '60px 20px',
    textAlign: 'center',
    animation: 'fadeInUp 1s ease forwards',
    opacity: 0, // initial opacity for animation
    transform: 'translateY(20px)',
    animationFillMode: 'forwards',
  },
  container: {
    maxWidth: '600px',
    margin: '0 auto',
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '20px',
    fontWeight: '700',
  },
  description: {
    fontSize: '1.25rem',
    lineHeight: '1.6',
  },
};

// Adding keyframes for fadeInUp animation inside the component with React style tags
const styleSheet = `
@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
`;

// Inject styles in head
if (typeof window !== 'undefined') {
  const styleTag = document.createElement('style');
  styleTag.innerHTML = styleSheet;
  document.head.appendChild(styleTag);
}

export default ExpediaAppSection;
