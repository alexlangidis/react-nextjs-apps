import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById } from "../data/products";
import { useCardStore } from "../store/cardStore";

export default function ProductDetails() {
  const { id } = useParams();
  const addItem = useCardStore((state) => state.addItem);
  const navigate = useNavigate();
  const product = getProductById(id ?? "");

  useEffect(() => {
    if (!product) {
      navigate("/");
    }
  }, [navigate, product]);

  if (!product) {
    return null;
  }

  return (
    <div className="page">
      <div className="container">
        <div className="product-detail">
          <div className="product-detail-image">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="product-detail-content">
            <h1 className="product-detail-name">{product.name}</h1>
            <p className="product-detail-price">${product.price}</p>
            <p className="product-detail-description">{product.description}</p>
            <button
              className="btn btn-primary"
              onClick={() => addItem(product)}
            >
              Add to Card
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
