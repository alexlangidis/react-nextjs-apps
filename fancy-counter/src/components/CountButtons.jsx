import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";

export default function CountButtons({ locked, setCount }) {
  const increaseCount = () => {
    setCount((prev) => {
      const newCount = prev + 1;
      if (newCount > 5) {
        return 5;
      }
      return newCount;
    });
  };

  const decreaseCount = () => {
    setCount((prev) => {
      const newCount = prev - 1;
      if (newCount < 0) {
        return 0;
      }
      return newCount;
    });
  };

  return (
    <div className="button-container">
      <button className="count-btn" onClick={decreaseCount} disabled={locked}>
        <MinusIcon className="count-btn-icon" />
      </button>
      <button className="count-btn" onClick={increaseCount} disabled={locked}>
        <PlusIcon className="count-btn-icon" />
      </button>
    </div>
  );
}
