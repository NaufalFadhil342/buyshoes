import { Skeleton } from "./Skeleton";

export function SkeletonCard() {
  return (
    <div className="w-full grid xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 items-center my-12 px-[5%] sm:px-12 lg:px-20">
      <div className="w-full shrink-0 rounded bg-stone-300 p-4">
        <Skeleton className="w-full h-50 rounded-md" />
        <div className="mt-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/12 mt-2" />
          <Skeleton className="h-4 w-2/5 mt-2" />
        </div>
      </div>
      <div className="w-full shrink-0 rounded bg-stone-300 p-4 hidden xs:block">
        <Skeleton className="w-full h-50 rounded-md" />
        <div className="mt-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/12 mt-2" />
          <Skeleton className="h-4 w-2/5 mt-2" />
        </div>
      </div>
      <div className="w-full shrink-0 rounded bg-stone-300 p-4 hidden md:block">
        <Skeleton className="w-full h-50 rounded-md" />
        <div className="mt-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/12 mt-2" />
          <Skeleton className="h-4 w-2/5 mt-2" />
        </div>
      </div>
      <div className="w-full shrink-0 rounded bg-stone-300 p-4 hidden xl:block">
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
