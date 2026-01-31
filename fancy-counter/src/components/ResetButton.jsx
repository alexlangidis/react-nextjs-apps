import { ResetIcon } from "@radix-ui/react-icons";

export default function ResetButton({ setCount }) {
  const resetCount = () => {
    setCount(0);
  };
  return (
    <button className="reset-btn" onClick={resetCount}>
      <ResetIcon className="reset-btn-icon" />
    </button>
  );
}
