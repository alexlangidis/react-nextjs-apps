import Counter from "./Counter";
import Logo from "./Logo";
import { useItemsStore } from "../../store/itemsStore";

export default function Header() {
  const totalNumberOfItems = useItemsStore((state) => state.totalNumberOfItems);
  const numberOfItemsPacked = useItemsStore(
    (state) => state.numberOfItemsPacked,
  );
  return (
    <header>
      <Logo />
      <Counter
        totalNumberOfItems={totalNumberOfItems}
        numberOfItemsPacked={numberOfItemsPacked}
      />
    </header>
  );
}
