import { Skeleton } from "./skeleton";

export function SkeletonCard() {
  return (
    <div className="w-full grid grid-cols-4 gap-4 items-center my-12 px-20">
      <div className="w-full shrink-0 rounded bg-stone-300 p-4">
        <Skeleton className="w-full h-50 rounded-md" />
        <div className="mt-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/12 mt-2" />
          <Skeleton className="h-4 w-2/5 mt-2" />
        </div>
      </div>
      <div className="w-full shrink-0 rounded bg-stone-300 p-4">
        <Skeleton className="w-full h-50 rounded-md" />
        <div className="mt-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/12 mt-2" />
          <Skeleton className="h-4 w-2/5 mt-2" />
        </div>
      </div>
      <div className="w-full shrink-0 rounded bg-stone-300 p-4">
        <Skeleton className="w-full h-50 rounded-md" />
        <div className="mt-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/12 mt-2" />
          <Skeleton className="h-4 w-2/5 mt-2" />
        </div>
      </div>
      <div className="w-full shrink-0 rounded bg-stone-300 p-4">
        <Skeleton className="w-full h-50 rounded-md" />
        <div className="mt-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/12 mt-2" />
          <Skeleton className="h-4 w-2/5 mt-2" />
        </div>
      </div>
    </div>
  );
}
