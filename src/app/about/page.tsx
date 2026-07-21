import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About",
  description: "The story, craft and philosophy behind Vapor Noir.",
};

export default function AboutPage() {
  return (
    <div className="container-x py-16">
      <div className="mx-auto max-w-3xl text-center">
        <div className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">Our story</div>
        <h1 className="mt-3 font-display text-4xl tracking-tight md:text-5xl lg:text-6xl">
          Craft, not <span className="italic text-primary">commodity.</span>
        </h1>
        <p className="mt-6 text-muted-foreground">
          Vapor Noir started in a Copenhagen workshop in 2019 with a stubborn idea: that a device
          you use every day should feel like an heirloom. Six years later we still hand-calibrate
          every unit that leaves our doors.
        </p>
      </div>

      <div className="mt-16 grid gap-8 md:grid-cols-3">
        {[
          { n: "01", t: "Materials", c: "Aerospace aluminum, medical ceramic, vegetable-tanned leather. No plastic in the vapor path." },
          { n: "02", t: "Craft", c: "Every device is calibrated and tested by hand. Every e-liquid is aged for a minimum of 45 days." },
          { n: "03", t: "Responsibility", c: "We ship in recyclable packaging, offer lifetime repair, and never sell to those under 21." },
        ].map((s) => (
          <div key={s.n} className="rounded-xl border border-border bg-card p-6 md:p-8">
            <div className="font-display text-3xl text-primary">{s.n}</div>
            <div className="mt-2 font-display text-2xl">{s.t}</div>
            <p className="mt-3 text-sm text-muted-foreground">{s.c}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 grid overflow-hidden rounded-2xl border border-border lg:grid-cols-2">
        <div className="relative min-h-[240px] md:min-h-[380px]">
          <Image
            src="https://images.unsplash.com/photo-1567721913486-6585f069b332?w=1400&q=80&auto=format&fit=crop"
            alt="Our workshop"
            fill
            sizes="(min-width:1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-center gap-4 bg-card p-6 md:p-10 lg:p-14">
          <div className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">The workshop</div>
          <h2 className="font-display text-3xl leading-tight md:text-4xl">
            Nørrebro, Copenhagen — 12 makers, no shortcuts.
          </h2>
          <p className="text-muted-foreground">
            Our workshop occupies the top floor of a former textile mill. Come by appointment — we
            love showing people how the sausage is made.
          </p>
        </div>
      </div>
    </div>
  );
}
