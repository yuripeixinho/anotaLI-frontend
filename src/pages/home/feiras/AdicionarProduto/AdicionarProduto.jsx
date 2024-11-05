// ProductCard.js
import React from "react";
import "./styles.scss";

function ProductCard({ image, name, description, price }) {
  return (
    <div className="product-card">
      <img src={image} alt={name} />
      <div className="product-info">
        <h4>{name}</h4>
        <p>{description}</p>
        <span className="price">{price}</span>
      </div>
    </div>
  );
}

export default ProductCard;
