import { Skeleton } from "@/components/ui/skeleton";

export default function SearchLoading() {
  return (
    <div className="bg-white min-h-screen">
      <div className="container-x py-10">
        <div className="mx-auto max-w-2xl text-center">
          <Skeleton className="mx-auto h-4 w-16" />
          <Skeleton className="mx-auto mt-3 h-8 w-48" />
          <Skeleton className="mx-auto mt-2 h-4 w-64" />
        </div>

        <div className="mx-auto mt-6 max-w-xl">
          <Skeleton className="h-14 w-full" />
        </div>

        <div className="mt-8">
          <Skeleton className="mb-4 h-4 w-48" />
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
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
        </div>
      </div>
    </div>
  );
}
