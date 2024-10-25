import { Skeleton } from "@/components/ui/skeleton";

export function TimelineSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="w-full h-[140px]" />
      <Skeleton className="w-full h-[140px]" />
      <Skeleton className="w-full h-[140px]" />
    </div>
  );
}
