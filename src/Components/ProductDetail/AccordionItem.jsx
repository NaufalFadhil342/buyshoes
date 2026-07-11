import {
  arrowRightThin as ArrowRightIcon,
  chevronUp as ChevronUp,
  chevronDown as ChevronDown,
} from "../Icons/draftIcon";

const AccordionItem = ({ title, children, isOpen, onToggle }) => {
  return (
    <div className="odd:border-y border-stone-300">
      <div
        className="w-full h-20 py-4 flex items-center justify-between font-bold text-stone-900"
        onClick={onToggle}
      >
        <>{title}</>
        {title === "Reviews" ? (
          <button className="w-auto h-12 pl-4 pr-2 border border-primary bg-transparent flex items-center gap-2 font-medium hover:cursor-pointer">
            <>Write a Review</>
            <ArrowRightIcon className="size-7" />
          </button>
        ) : (
          <span className="block">
            {isOpen === title ? (
              <ChevronUp className="size-6 text-stone-400" />
            ) : (
              <ChevronDown className="size-6 text-stone-400" />
            )}
          </span>
        )}
      </div>
      {isOpen === title && <div className="w-full h-auto pb-4">{children}</div>}
    </div>
  );
};

export default AccordionItem;
