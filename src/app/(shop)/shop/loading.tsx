import { Skeleton } from "@/components/ui/skeleton";

export default function ShopLoading() {
  return (
    <div className="bg-white">
      <section className="border-b border-border bg-muted/50">
        <div className="container-x py-8">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="mt-3 h-8 w-48" />
          <Skeleton className="mt-2 h-4 w-full max-w-xl" />
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="border border-border bg-white px-4 py-3">
                <div className="flex items-center gap-2.5">
                  <Skeleton className="size-8" />
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

      <section className="container-x py-6">
        <div className="mb-4 flex items-center gap-2">
          <Skeleton className="h-3 w-10" />
          <Skeleton className="h-3 w-3" />
          <Skeleton className="h-3 w-8" />
        </div>

        <div className="flex items-center gap-2 mb-4">
          <Skeleton className="h-8 w-20" />
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-16" />
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="border border-border bg-white">
              <Skeleton className="aspect-square w-full" />
              <div className="p-3 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-4 w-16" />
              </div>
              <div className="border-t border-border p-3">
                <Skeleton className="h-9 w-full" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
