import {
  chevronUp as ChevronUp,
  chevronDown as ChevronDown,
} from "@/Components/Icons/draftIcon";
import { useEffect, useRef, useState } from "react";

const DEBOUNCE_MS = 400;

const Price = ({ priceRange, dispatch }) => {
  const [openPrice, setOpenPrice] = useState(true);
  const [localMin, setLocalMin] = useState(priceRange[0] || "");
  const [localMax, setLocalMax] = useState(priceRange[1] || "");

  const debounceRef = useRef(null);

  useEffect(() => {
    setLocalMin(priceRange[0] || "");
    setLocalMax(priceRange[1] || "");
  }, [priceRange[0], priceRange[1]]);

  const commitChange = (rawMin, rawMax) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      let min = rawMin === "" ? 0 : Number(rawMin);
      let max = rawMax === "" ? 0 : Number(rawMax);

      if (max !== 0 && min > max) {
        max = min;
        setLocalMax(String(min));
      }

      dispatch({ type: "SET_PRICE_RANGE", payload: [min, max] });
    }, DEBOUNCE_MS);
  };

  const handleMinChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setLocalMin(value);
    commitChange(value, localMax);
  };

  const handleMaxChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setLocalMax(value);
    commitChange(localMin, value);
  };

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  return (
    <div className="w-full h-auto py-4 border-b-2 border-stone-300/30 px-6">
      <button
        type="button"
        className="w-full flex items-center justify-between hover:cursor-pointer"
        onClick={() => setOpenPrice((prev) => !prev)}
      >
        <h4 className="text-black font-semibold">Price</h4>
        {openPrice ? (
          <ChevronUp className="size-6 text-stone-500" />
        ) : (
          <ChevronDown className="size-6 text-stone-500" />
        )}
      </button>

      {openPrice && (
        <div className="mt-6 w-full flex flex-col xs:flex-row items-center gap-4">
          <div className="w-full">
            <label htmlFor="min" className="text-black font-semibold">
              Minimum
            </label>
            <input
              id="min"
              type="text"
              inputMode="numeric"
              placeholder="20"
              value={localMin}
              onChange={handleMinChange}
              className="border border-stone-500 outline-accent w-full h-14 flex items-center pl-3 mt-3"
            />
          </div>
          <div className="w-full">
            <label htmlFor="max" className="text-black font-semibold">
              Maximum
            </label>
            <input
              id="max"
              type="text"
              inputMode="numeric"
              placeholder="75"
              value={localMax}
              onChange={handleMaxChange}
              className="border border-stone-500 outline-accent w-full h-14 flex items-center pl-3 mt-3"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Price;
