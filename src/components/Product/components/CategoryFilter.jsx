import React from 'react';

const categories = [
  'All',
  'Electronics',
  'Home Appliances',
  'Footwear',
  'Accessories',
];

function CategoryFilter({ selectedCategory, onCategoryChange }) {
  return (
    <div style={styles.container}>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onCategoryChange(cat)}
          style={{
            ...styles.button,
            backgroundColor: selectedCategory === cat ? '#007bff' : '#e0e0e0',
            color: selectedCategory === cat ? 'white' : 'black',
          }}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

const styles = {
  container: {
    margin: '20px 0',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
  },
  button: {
    border: 'none',
    borderRadius: '20px',
    padding: '10px 20px',
    cursor: 'pointer',
    fontSize: '14px',
  },
};

export default CategoryFilter;
