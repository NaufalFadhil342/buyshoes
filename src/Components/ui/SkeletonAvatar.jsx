import { Skeleton } from "./skeleton";

export function SkeletonAvatar() {
  return (
    <div className="flex w-full items-center gap-4">
      <Skeleton className="size-20 shrink-0 rounded-md" />
      <div className="grid gap-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/12" />
      </div>
    </div>
  );
}
