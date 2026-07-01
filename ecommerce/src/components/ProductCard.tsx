import { Link } from "react-router-dom";
import type { Product } from "../data/products";
import { useCardStore } from "../store/cardStore";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCardStore((state) => state.addItem);

  return (
    <div className="product-card">
      <img
        src={product.image}
        alt="product image"
        className="product-card-image"
      />
      <div className="product-card-content">
        <h3 className="product-card-name">{product.name}</h3>
        <p className="product-card-price">${product.price}</p>
        <div className="product-card-actions">
          <Link to={`/products/${product.id}`} className="btn btn-secondary">
            View Details
          </Link>
          <button
            className="btn btn-primary"
            onClick={() => addItem(product)}
            type="button"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
