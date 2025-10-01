import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CollaborationSectionProps {
  logos: { id: string; imageUrl: string; name: string }[];
}

export default function CollaborationSection({ logos }: CollaborationSectionProps) {
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerView = 4;

  const nextSlide = useCallback(() => {
    setStartIndex((prev) => (prev + 1) % logos.length);
  }, [logos.length]);

  const prevSlide = () => {
    setStartIndex((prev) => (prev - 1 + logos.length) % logos.length);
  };

  useEffect(() => {
    if (logos.length > itemsPerView) {
      const interval = setInterval(nextSlide, 3000);
      return () => clearInterval(interval);
    }
  }, [logos.length, nextSlide]);

  const visibleLogos = [...logos, ...logos].slice(startIndex, startIndex + itemsPerView);

  return (
    <section id="collaboration" className="py-16 md:py-20 bg-card">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <h2 className="text-4xl font-bold text-center mb-12 text-foreground">Our Collaboration</h2>
        
        <div className="relative">
          {logos.length > itemsPerView && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10"
                onClick={prevSlide}
                data-testid="button-prev-logo"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10"
                onClick={nextSlide}
                data-testid="button-next-logo"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </>
          )}

          <div className="overflow-hidden px-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {visibleLogos.map((logo, index) => (
                <div
                  key={`${logo.id}-${index}`}
                  className="flex items-center justify-center p-6 bg-background rounded-md hover-elevate transition-all"
                >
                  <img
                    src={logo.imageUrl}
                    alt={logo.name}
                    className="max-h-20 w-auto object-contain grayscale hover:grayscale-0 transition-all"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
