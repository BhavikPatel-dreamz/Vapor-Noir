export default function WishlistLoading() {
  return (
    <div className="container-x flex min-h-[60vh] items-center justify-center py-16">
      <div className="flex flex-col items-center gap-5">
        <div className="relative size-10">
          <div className="absolute inset-0 rounded-full border-2 border-border" />
          <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-primary border-r-primary/30" />
        </div>
        <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground animate-pulse">Loading wishlist…</p>
      </div>
    </div>
  );
}
