import {
  chevronUp as ChevronUp,
  chevronDown as ChevrownDown,
} from "@/Components/Icons/draftIcon";
import { useState } from "react";

const Gender = ({ genderList, selected, dispatch }) => {
  const [openGender, setOpenGender] = useState(false);

  const previewText = selected
    .map((g) => g.charAt(0).toUpperCase() + g.slice(1))
    .join(", ");

  return (
    <div className="w-full h-auto py-4 border-b-2 border-stone-300/30 px-6">
      <button
        type="button"
        className="w-full flex items-center justify-between hover:cursor-pointer"
        onClick={() => setOpenGender((prev) => !prev)}
      >
        <div className="text-left">
          <h4 className="text-black font-semibold">
            <>Gender</>
            {selected.length > 0 && ` [${selected.length}]`}
          </h4>
          {selected.length > 0 && (
            <span className="text-sm text-stone-400 block mt-1">
              {previewText}
            </span>
          )}
        </div>
        {openGender ? (
          <ChevronUp className="size-6 text-stone-500" />
        ) : (
          <ChevrownDown className="size-6 text-stone-500" />
        )}
      </button>
      {openGender && (
        <ul className="w-full h-auto flex flex-col gap-6 mt-6">
          {genderList.map((gender, index) => (
            <li key={index} className="w-full flex items-center gap-2">
              <input
                type="checkbox"
                className="size-5"
                checked={selected.includes(gender)}
                onChange={() =>
                  dispatch({
                    type: "TOGGLE_VALUE",
                    payload: { key: "genders", value: gender },
                  })
                }
              />
              <span className="block capitalize">{gender}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Gender;
