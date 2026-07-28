import { Skeleton } from "@/components/ui/skeleton";

export default function ProductLoading() {
  return (
    <>
      {/* Breadcrumb skeleton */}
      <div className="container-x pt-6 pb-2">
        <div className="flex items-center gap-1.5">
          <Skeleton className="h-3 w-10" />
          <Skeleton className="h-3 w-3 rounded-full" />
          <Skeleton className="h-3 w-8" />
          <Skeleton className="h-3 w-3 rounded-full" />
          <Skeleton className="h-3 w-20" />
        </div>
      </div>

      <section className="container-x py-6 md:py-10">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Gallery skeleton */}
          <div className="grid gap-4 md:grid-cols-[80px_1fr]">
            <div className="order-2 flex gap-3 md:order-1 md:flex-col">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="aspect-square w-20 shrink-0 rounded-lg" />
              ))}
            </div>
            <Skeleton className="order-1 aspect-[4/5] rounded-2xl md:order-2" />
          </div>

          {/* Details skeleton */}
          <div className="space-y-5">
            <div>
              <div className="flex gap-2">
                <Skeleton className="h-5 w-12 rounded-full" />
                <Skeleton className="h-5 w-20 rounded-full" />
              </div>
              <Skeleton className="mt-3 h-10 w-3/4 md:h-12" />
              <Skeleton className="mt-2 h-4 w-full" />
              <Skeleton className="mt-3 h-4 w-32" />
            </div>
            <Skeleton className="h-9 w-28" />
            <Skeleton className="h-20 w-full rounded-xl" />
            <div className="border-t border-border pt-5">
              <Skeleton className="h-3 w-20 mb-3" />
              <div className="flex gap-2">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-10 w-24 rounded-lg" />
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-12 w-12 rounded-lg" />
              <Skeleton className="h-12 flex-1 rounded-lg" />
              <Skeleton className="h-12 w-28 rounded-lg" />
              <Skeleton className="h-12 w-12 rounded-lg" />
            </div>
            <Skeleton className="h-20 w-full rounded-xl" />
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
    </>
  );
}
