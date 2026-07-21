import { Award, Leaf, ShieldCheck, Truck } from "lucide-react";

const values = [
  { icon: Award, title: "Craft-engineered", copy: "Every device is calibrated by hand at our workshop in Copenhagen." },
  { icon: Leaf, title: "Small-batch flavors", copy: "Our e-liquids are aged and bottled in numbered runs of 200." },
  { icon: ShieldCheck, title: "3-year warranty", copy: "Industry-leading coverage on every powered device we sell." },
  { icon: Truck, title: "Discreet shipping", copy: "Unmarked packaging, tracked delivery. Free over $75." },
];

export function ValueProps() {
  return (
    <section className="container-x py-16 md:py-24">
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {values.map((v) => (
          <div key={v.title} className="rounded-lg border border-border bg-card p-6">
            <v.icon className="size-6 text-primary" />
            <div className="mt-4 font-display text-xl">{v.title}</div>
            <p className="mt-2 text-sm text-muted-foreground">{v.copy}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
