import {
  chevronUp as ChevronUp,
  chevronDown as ChevronDown,
} from "@/Components/Icons/draftIcon";
import { useState } from "react";

const Size = ({ sizes, selected, dispatch }) => {
  const [openSize, setOpenSize] = useState(false);

  const previewText = selected.map((s) => `${s} EUR`).join(", ");

  return (
    <div className="w-full h-auto py-4 border-b-2 border-stone-300/30 px-6">
      <button
        type="button"
        className="w-full flex items-center justify-between hover:cursor-pointer"
        onClick={() => setOpenSize((prev) => !prev)}
      >
        <div className="text-left">
          <h4 className="text-black font-semibold">
            <>Size</>
            {selected.length > 0 && ` [${selected.length}]`}
          </h4>
          {selected.length > 0 && (
            <span className="text-sm text-stone-400 block mt-1">
              {previewText}
            </span>
          )}
        </div>
        {openSize ? (
          <ChevronUp className="size-6 text-stone-500" />
        ) : (
          <ChevronDown className="size-6 text-stone-500" />
        )}
      </button>
      {openSize && (
        <ul className="w-full h-auto grid grid-cols-3 mt-6 gap-3">
          {sizes.map((size, index) => {
            const isActive = selected.includes(size.value);

            return (
              <li key={index} className="w-full h-10">
                <button
                  type="button"
                  onClick={() =>
                    dispatch({
                      type: "TOGGLE_VALUE",
                      payload: { key: "sizes", value: size.value },
                    })
                  }
                  className={`text-primary flex items-center justify-center w-full h-full border ${isActive ? "border-accent bg-accent text-white" : "border-primary bg-transparent text-primary"} hover:cursor-pointer`}
                >
                  {size.name}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Size;
