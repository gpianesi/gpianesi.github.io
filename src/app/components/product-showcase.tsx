export function ProductShowcase() {
  return (
    <section className="py-24 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div className="order-2 md:order-1">
            <h3 className="text-3xl md:text-4xl mb-6">
              Familiar. Yet Revolutionary.
            </h3>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Open it like any umbrella you've used before. The slightly larger
              canopy provides generous shade coverage while maintaining the
              portability you need for your beach adventures.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              No learning curve. Just effortless sun protection that works.
            </p>
          </div>
          <div className="order-1 md:order-2">
            <div className="aspect-square rounded-lg overflow-hidden bg-gray-200">
              <img
                src="https://images.unsplash.com/photo-1692459163403-999bf6aee355?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFjaCUyMHVtYnJlbGxhJTIwbWluaW1hbHxlbnwxfHx8fDE3NzA0NjMxMjV8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Trabbrella beach umbrella"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="aspect-square rounded-lg overflow-hidden bg-gray-200">
              <img
                src="https://images.unsplash.com/photo-1627803589917-65023f4a0e70?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBiZWFjaCUyMGFjY2Vzc29yaWVzfGVufDF8fHx8MTc3MDQ2MzEyNnww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Pyramid base stability system"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div>
            <h3 className="text-3xl md:text-4xl mb-6">
              The Pyramid Advantage
            </h3>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Our patented pyramid base system uses the natural weight of sand
              to create rock-solid stability. The anchored sheet forms a
              pyramid structure that won't budge, even in coastal winds.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Safe, stable, and sandable. No sharp stakes to worry about.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
