import {
  chevronUp as ChevronUp,
  chevronDown as ChevronDown,
} from "@/Components/Icons/draftIcon";
import { useState } from "react";

const ProductCategory = ({ shoesCategory, selected, dispatch }) => {
  const [openProdCategory, setOpenProdCategory] = useState(false);

  const previewText = selected
    .map((val) => shoesCategory.find((c) => c.value === val)?.name ?? val)
    .join(", ");

  return (
    <div className="w-full h-auto py-4 border-b-2 border-stone-300/30 px-6">
      <button
        type="button"
        className="w-full flex items-center justify-between hover:cursor-pointer"
        onClick={() => setOpenProdCategory((prev) => !prev)}
      >
        <div className="text-left">
          <h4 className="text-black font-semibold">
            <>Product Category</>
            {selected.length > 0 && ` [${selected.length}]`}
          </h4>
          {selected.length > 0 && (
            <span className="text-sm text-stone-400 block mt-1">
              {previewText}
            </span>
          )}
        </div>
        {openProdCategory ? (
          <ChevronUp className="size-6 text-stone-500" />
        ) : (
          <ChevronDown className="size-6 text-stone-500" />
        )}
      </button>
      {openProdCategory && (
        <ul className="w-full h-auto flex flex-col gap-6 mt-6">
          {shoesCategory.map((cat, index) => (
            <li key={index} className="flex items-center gap-2">
              <input
                type="checkbox"
                className="size-5"
                checked={selected.includes(cat.value)}
                onChange={() =>
                  dispatch({
                    type: "TOGGLE_VALUE",
                    payload: { key: "categories", value: cat.value },
                  })
                }
              />
              <span className="block">{cat.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductCategory;
