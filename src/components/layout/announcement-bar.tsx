export function AnnouncementBar() {
  return (
    <div className="border-b border-border bg-muted/40">
      <div className="container-x flex h-9 items-center justify-center gap-6 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
        <span className="hidden sm:inline">Complimentary shipping over $75</span>
        <span className="hidden sm:inline">·</span>
        <span>3-year warranty on all devices</span>
        <span className="hidden sm:inline">·</span>
        <span className="hidden sm:inline">Ships from EU & US</span>
      </div>
    </div>
  );
}
