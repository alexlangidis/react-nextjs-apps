import { useCardStore } from "../store/cardStore";

export default function Card() {
  const items = useCardStore((state) => state.items);
  const incrementItem = useCardStore((state) => state.incrementItem);
  const decrementItem = useCardStore((state) => state.decrementItem);
  const removeItem = useCardStore((state) => state.removeItem);
  const clearItems = useCardStore((state) => state.clearItems);
  const getTotalPrice = useCardStore((state) => state.getTotalPrice);
  const itemCount = useCardStore((state) => state.getItemCount());

  return (
    <div className="page">
      <div className="container">
        <div className="card-page-header">
          <div>
            <p className="card-page-kicker">Your selection</p>
            <h1 className="page-title">Card</h1>
          </div>
          {items.length > 0 && (
            <span className="card-count">
              {itemCount} {itemCount === 1 ? "item" : "items"}
            </span>
          )}
        </div>

        {items.length === 0 ? (
          <div className="card-empty">
            <p className="card-empty-title">Your card is empty.</p>
            <p className="card-empty-text">
              Add a few items from the catalog to see them here.
            </p>
          </div>
        ) : (
          <div className="card-layout">
            <div className="card-items">
              {items.map((item) => (
                <article key={item.id} className="card-item">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="card-item-image"
                  />

                  <div className="card-item-content">
                    <div className="card-item-header">
                      <div>
                        <h2 className="card-item-name">{item.name}</h2>
                        <p className="card-item-meta">
                          ${item.price.toFixed(2)} each
                        </p>
                      </div>
                      <p className="card-item-price">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>

                    <div className="card-item-footer">
                      <div className="card-quantity-controls">
                        <button
                          className="card-qty-button"
                          type="button"
                          onClick={() => decrementItem(item.id)}
                          aria-label={`Decrease quantity of ${item.name}`}
                        >
                          -
                        </button>
                        <span className="card-quantity">
                          Qty {item.quantity}
                        </span>
                        <button
                          className="card-qty-button"
                          type="button"
                          onClick={() => incrementItem(item.id)}
                          aria-label={`Increase quantity of ${item.name}`}
                        >
                          +
                        </button>
                      </div>

                      <button
                        className="card-remove-button"
                        type="button"
                        onClick={() => removeItem(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <aside className="card-summary">
              <p className="card-summary-label">Order summary</p>
              <h2 className="card-summary-total">
                ${getTotalPrice().toFixed(2)}
              </h2>
              <div className="card-summary-row">
                <span>Items</span>
                <strong>{itemCount}</strong>
              </div>
              <div className="card-summary-row">
                <span>Subtotal</span>
                <strong>${getTotalPrice().toFixed(2)}</strong>
              </div>
              <p className="card-summary-note">
                Taxes and shipping are calculated at the next step.
              </p>
              <button className="btn btn-primary btn-large" type="button">
                Continue
              </button>
              <button
                className="card-clear-button"
                type="button"
                onClick={clearItems}
              >
                Clear card
              </button>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
