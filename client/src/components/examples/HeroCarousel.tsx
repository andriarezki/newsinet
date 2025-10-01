import HeroCarousel from '../HeroCarousel';

export default function HeroCarouselExample() {
  const slides = [
    { id: '1', imageUrl: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1600&h=600&fit=crop' },
    { id: '2', imageUrl: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1600&h=600&fit=crop' },
    { id: '3', imageUrl: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=1600&h=600&fit=crop' },
  ];

  return <HeroCarousel slides={slides} />;
}
