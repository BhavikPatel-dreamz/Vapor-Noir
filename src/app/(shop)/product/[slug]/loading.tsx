import { Skeleton } from "@/components/ui/skeleton";

export default function ProductLoading() {
  return (
    <div className="bg-white">
      <div className="bg-muted/50 border-b border-border">
        <div className="container-x py-3">
          <div className="flex items-center gap-1.5">
            <Skeleton className="h-3 w-10" />
            <Skeleton className="h-3 w-3" />
            <Skeleton className="h-3 w-8" />
            <Skeleton className="h-3 w-3" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
      </div>

      <section className="container-x py-6 md:py-10">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div>
            <Skeleton className="aspect-square w-full" />
            <div className="flex gap-3 mt-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="aspect-square w-20" />
              ))}
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <div className="flex gap-2">
                <Skeleton className="h-5 w-12" />
                <Skeleton className="h-5 w-20" />
              </div>
              <Skeleton className="mt-3 h-8 w-3/4" />
              <Skeleton className="mt-2 h-4 w-full" />
              <Skeleton className="mt-2 h-4 w-32" />
            </div>
            <Skeleton className="h-9 w-28" />
            <Skeleton className="h-16 w-full" />
            <div>
              <Skeleton className="h-3 w-20 mb-3" />
              <div className="flex gap-2">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-10 w-24" />
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-12 w-12" />
              <Skeleton className="h-12 flex-1" />
              <Skeleton className="h-12 w-28" />
              <Skeleton className="h-12 w-12" />
            </div>
            <Skeleton className="h-20 w-full" />
            <div>
              <Skeleton className="h-3 w-24 mb-3" />
              <div className="grid grid-cols-2 gap-2">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="h-4 w-full" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
