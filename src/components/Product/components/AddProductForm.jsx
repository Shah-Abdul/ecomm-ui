import React, { useState } from 'react';
import '../ProductStyle/AddProductForm.css';

const AddProductForm = ({ onAdd }) => {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Electronics'); // Default category
  const [stock, setStock] = useState(''); // New stock field
  const [image, setImage] = useState(null); // Store the image file
  const [imagePreview, setImagePreview] = useState(''); // Preview image URL

  const categories = ['Electronics', 'Home Appliances', 'Footwear', 'Accessories'];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file); // Set the image file
    setImagePreview(URL.createObjectURL(file)); // Set image preview
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Create FormData to send the image and product data together
    const formData = new FormData();
    formData.append('name', productName); // Append product fields individually
    formData.append('description', productDescription);
    formData.append('price', parseFloat(price));
    formData.append('category', category);
    formData.append('stock', parseInt(stock));
  
    if (image) formData.append('image', image); // Append image file
  
    // Log FormData to check what is being sent
    console.log("FormData being sent:");
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
  
    try {
      await onAdd(formData);
      console.log("Product successfully added.");
    } catch (error) {
      console.error("Error adding product:", error);
    }
  
    // Reset form after submission
    setProductName('');
    setProductDescription('');
    setPrice('');
    setCategory('Electronics');
    setStock('');
    setImage(null); // Clear the image
    setImagePreview(''); // Clear image preview
  };

  return (
    <form onSubmit={handleSubmit} className="add-product-form">
      <h3>Add New Product</h3>
      <div className="form-group">
        <label>Name:</label>
        <input
          type="text"
          className="form-input"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>Description:</label>
        <textarea
          className="form-textarea"
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>Price:</label>
        <input
          type="number"
          className="form-input"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>Category:</label>
        <select
          className="form-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Stock:</label>
        <input
          type="number"
          className="form-input"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>Image:</label>
        <input
          type="file"
          className="form-input"
          accept="image/*"
          onChange={handleImageChange}
          required
        />
      </div>

      {/* Image Preview */}
      {imagePreview && (
        <div className="image-preview">
          <img
            src={imagePreview}
            alt="Selected product image" // Image preview alt text
            style={{ width: '200px', height: 'auto' }}
          />
        </div>
      )}

      <button type="submit" className="submit-btn">Add Product</button>
    </form>
  );
};

export default AddProductForm;
