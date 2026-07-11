import {
  chevronUp as ChevronUp,
  chevronDown as ChevronDown,
} from "@/Components/Icons/draftIcon";
import { useState } from "react";

const Brand = ({ brandList, selected, dispatch }) => {
  const [openBrand, setOpenBrand] = useState(false);

  const previewText = selected
    .map((val) => brandList.find((c) => c.value === val)?.name ?? val)
    .join(", ");

  return (
    <div className="w-full h-auto py-4 border-b-2 border-stone-300/30 px-6">
      <button
        type="button"
        className="w-full flex items-center justify-between hover:cursor-pointer"
        onClick={() => setOpenBrand((prev) => !prev)}
      >
        <div className="text-left">
          <h4 className="text-black font-semibold">
            <>Brand</>
            {selected.length > 0 && ` [${selected.length}]`}
          </h4>
          {selected.length > 0 && (
            <span className="text-sm text-stone-400 block mt-1">
              {previewText}
            </span>
          )}
        </div>
        {openBrand ? (
          <ChevronUp className="size-6 text-stone-500" />
        ) : (
          <ChevronDown className="size-6 text-stone-500" />
        )}
      </button>
      {openBrand && (
        <ul className="w-full h-auto flex flex-col gap-6 mt-6">
          {brandList.map((brand, index) => (
            <li key={index} className="flex items-center gap-2">
              <input
                type="checkbox"
                className="size-5"
                checked={selected.includes(brand.value)}
                onChange={() =>
                  dispatch({
                    type: "TOGGLE_VALUE",
                    payload: { key: "brands", value: brand.value },
                  })
                }
              />
              <span className="block">{brand.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Brand;
