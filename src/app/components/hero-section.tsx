import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

interface HeroSectionProps {
  onCTAClick: () => void;
}

export function HeroSection({ onCTAClick }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1595330495302-e257debfa664?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwYmVhY2glMjBzY2VuZXxlbnwxfHx8fDE3NzA0NjMxMjZ8MA&ixlib=rb-4.1.0&q=80&w=1080')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
        <h1 className="text-5xl md:text-7xl mb-6 tracking-tight">
          Trabbrella
        </h1>
        <p className="text-xl md:text-2xl mb-4 opacity-90">
          Travel Beach Umbrella
        </p>
        <p className="text-lg md:text-xl mb-12 opacity-80 max-w-2xl mx-auto">
          The revolutionary beach umbrella that combines portability with
          innovative stability. No more struggling with traditional bases.
        </p>
        <Button
          size="lg"
          onClick={onCTAClick}
          className="bg-white text-black hover:bg-gray-100 text-lg px-8 py-6"
        >
          Discover Trabbrella
          <ArrowRight className="ml-2 size-5" />
        </Button>
      </div>
    </section>
  );
}
