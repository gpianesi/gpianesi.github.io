import { Plane, Anchor, Umbrella, Package } from "lucide-react";

const features = [
  {
    icon: Plane,
    title: "Ultra Portable",
    description:
      "Designed for travelers. Lightweight construction and compact folding mechanism makes it easy to carry anywhere.",
  },
  {
    icon: Umbrella,
    title: "Easy Open Design",
    description:
      "Familiar umbrella-style opening mechanism, slightly larger size for better coverage and comfort.",
  },
  {
    icon: Anchor,
    title: "Pyramid Stability Base",
    description:
      "Revolutionary sheet-based anchoring system forms a pyramid shape. Fill with sand, or pebbles to give stability.",
  },
  {
    icon: Package,
    title: "Easy Setup",
    description:
      "Forget about sharp stakes or complicated installations. Simply anchor the sheet and fill it.",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-4">
            Developed for Beach Life
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Every detail designed to solve the problems of traditional beach
            umbrellas
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                  <Icon className="size-8 text-gray-900" />
                </div>
                <h3 className="text-xl mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
