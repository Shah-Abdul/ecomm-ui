import React, { useState, useEffect } from 'react';
import { fetchProducts, deleteProduct } from '../../../services/api';
import ProductCard from '../components/ProductCard';
import CategoryFilter from '../components/CategoryFilter';
import SearchFilter from '../components/SearchFilter';
import Navbar from '../components/Navbar';
import { useAuth } from '../../../context/AuthContext'; // <-- Import useAuth
import './ProductsPage.css';

const ProductsPage = () => {
  const { currentUser, loading } = useAuth(); // <-- Get currentUser from context
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const pageSize = 20;

  useEffect(() => {
    if (!loading) {
      loadProducts();
    }
  }, [page, category, searchTerm, loading]); // wait until loading is false

  const loadProducts = async () => {
    const selectedCategory = category === 'All' ? '' : category;
    const data = await fetchProducts(selectedCategory, page, searchTerm, pageSize);

    if (data.products && data.products.length > 0) {
      setProducts(data.products);
      setHasMore(data.products.length === pageSize);
    } else {
      setProducts([]);
      setHasMore(false);
    }
  };

  

  const handleDelete = async (productId) => {
    console.log(currentUser);
    await deleteProduct(productId);
    loadProducts();
  };

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setPage(1);
  };

  const handleSearchChange = (searchValue) => {
    setSearchTerm(searchValue);
    setPage(1);
  };

  const handlePrevious = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    if (hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  if (loading) {
    return <p>Loading...</p>; // Optional: loading spinner while fetching auth
  }

  return (
    <div className="products-page">
      <Navbar role={currentUser?.role || 'customer'} /> {/* Pass role to Navbar */}
      
      <div className="filters-container">
        <SearchFilter searchTerm={searchTerm} onSearchChange={handleSearchChange} />
        <CategoryFilter selectedCategory={category} onCategoryChange={handleCategoryChange} />
      </div>


      <div className="pagination">
        <button onClick={handlePrevious} disabled={page === 1}>
          Previous Page
        </button>
        <span>Page {page}</span>
        <button onClick={handleNext} disabled={!hasMore || products.length === 0}>
          Next Page
        </button>
      </div>

      {products.length === 0 ? (
        <p className="no-products-message">No products available.</p>
      ) : (
        <div className="products-grid">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onDelete={handleDelete}
              role={currentUser?.role || 'customer'} // Pass role to ProductCard
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
