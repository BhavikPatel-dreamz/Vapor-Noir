import { Skeleton } from "@/components/ui/skeleton";

export default function ShopLoading() {
  return (
    <div className="min-h-screen">
      {/* Hero skeleton */}
      <section className="border-b border-border bg-card/20">
        <div className="container-x py-12 md:py-16">
          <Skeleton className="h-3 w-24 rounded-full" />
          <Skeleton className="mt-4 h-10 w-48 md:h-12 md:w-64 lg:h-14 lg:w-72" />
          <Skeleton className="mt-3 h-4 w-full max-w-xl" />

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="rounded-lg border border-border bg-card/40 px-4 py-3">
                <div className="flex items-center gap-2.5">
                  <Skeleton className="size-8 rounded-md" />
                  <div className="space-y-1.5">
                    <Skeleton className="h-2.5 w-16" />
                    <Skeleton className="h-3.5 w-12" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x py-10">
        {/* Breadcrumb skeleton */}
        <div className="mb-6 flex items-center gap-2">
          <Skeleton className="h-3 w-10" />
          <Skeleton className="h-3 w-3 rounded-full" />
          <Skeleton className="h-3 w-8" />
        </div>

        <div className="mb-6 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Skeleton className="h-8 w-20 rounded-full" />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Skeleton className="h-4 w-10" />
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-7 w-16 rounded-full" />
            ))}
          </div>
        </div>

        <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="group relative">
              <div className="block">
                <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-muted">
                  <Skeleton className="absolute inset-0 rounded-xl" />
                </div>
                <div className="mt-4 flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1 space-y-2">
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                  <Skeleton className="h-5 w-14" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
