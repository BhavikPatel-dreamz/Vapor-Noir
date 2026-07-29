export default function Loading() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="flex flex-col items-center gap-5">
        <div className="relative size-10">
          <div className="absolute inset-0 rounded-full border-2 border-border" />
          <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-primary border-r-primary/30" />
        </div>
        <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground animate-pulse">Loading…</p>
      </div>
    </div>
  );
}
