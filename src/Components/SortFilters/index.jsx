import { useState } from "react";
import {
  chevronDown as ChevronDown,
  chevronUp as ChevronUp,
} from "@/Components/Icons/draftIcon";
import {
  sortOptions,
  sizes,
  genderList,
  shoesCategory,
  brandList,
} from "@/LocalData/filter-sort-option";
import Size from "./Size";
import Gender from "./Gender";
import ProductCategory from "./ProductCategory";
import Brand from "./Brand";
import Price from "./Price";

const SortFilters = ({ onHideFilter, filterCount, filters, dispatch }) => {
  const [onSortOpen, setOnSortOpen] = useState(true);

  return (
    <div id="sort-filter" onClick={onHideFilter}>
      <div
        className="w-full sm:w-md h-full bg-white py-6 absolute top-0 right-0 overflow-y-auto scrollbar-none"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full flex items-center justify-between pb-4 px-6">
          <h3 className="text-xl font-semibold text-stone-900 uppercase">
            Filter & Sort
          </h3>
          <div className="w-auto flex items-center justify-end gap-6">
            {filterCount > 0 && (
              <button
                type="button"
                className="text-sm font-semibold text-black underline hover:cursor-pointer"
                onClick={() =>
                  dispatch({
                    type: "RESET",
                  })
                }
              >
                Clear all
              </button>
            )}
            <button
              type="button"
              className="text-2xl text-stone-500 hover:cursor-pointer"
              onClick={onHideFilter}
            >
              x
            </button>
          </div>
        </div>

        <div className="w-full h-auto py-4 px-6">
          <button
            type="button"
            className="w-full flex items-center justify-between hover:cursor-pointer"
            onClick={() => setOnSortOpen((prev) => !prev)}
          >
            <h4 className="text-black font-semibold">Sort by</h4>
            {onSortOpen ? (
              <ChevronUp className="size-6 text-stone-500" />
            ) : (
              <ChevronDown className="size-6 text-stone-500" />
            )}
          </button>
          {onSortOpen && (
            <ul className="w-full h-auto flex flex-col gap-6 mt-4">
              {sortOptions.map((sort, index) => (
                <li key={index} className="w-full flex items-center gap-2">
                  <input
                    type="radio"
                    className="size-5"
                    checked={filters.sort === sort.value}
                    onChange={() =>
                      dispatch({ type: "SET_SORT", payload: sort.value })
                    }
                  />
                  <span className="block">{sort.name}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <>
          <Size sizes={sizes} selected={filters.sizes} dispatch={dispatch} />
        </>
        <>
          <Gender
            genderList={genderList}
            selected={filters.genders}
            dispatch={dispatch}
          />
        </>
        <>
          <ProductCategory
            shoesCategory={shoesCategory}
            selected={filters.categories}
            dispatch={dispatch}
          />
        </>
        <>
          <Brand
            brandList={brandList}
            selected={filters.brands}
            dispatch={dispatch}
          />
        </>
        <>
          <Price priceRange={filters.priceRange} dispatch={dispatch} />
        </>
      </div>
    </div>
  );
};

export default SortFilters;
