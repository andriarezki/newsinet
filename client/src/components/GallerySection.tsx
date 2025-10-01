import { Card } from '@/components/ui/card';

interface GalleryImage {
  id: string;
  imageUrl: string;
  categoryId: string;
}

interface GalleryCategory {
  id: string;
  title: string;
}

interface GallerySectionProps {
  categories: GalleryCategory[];
  images: GalleryImage[];
}

export default function GallerySection({ categories, images }: GallerySectionProps) {
  return (
    <section id="gallery" className="py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <h2 className="text-4xl font-bold text-center mb-12 text-foreground">Gallery</h2>
        
        <div className="space-y-12">
          {categories.map((category) => {
            const categoryImages = images.filter(img => img.categoryId === category.id);
            
            if (categoryImages.length === 0) return null;
            
            return (
              <div key={category.id}>
                <h3 className="text-2xl font-semibold mb-6 text-foreground">{category.title}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryImages.map((image) => (
                    <Card 
                      key={image.id} 
                      className="overflow-hidden hover-elevate cursor-pointer transition-all"
                      onClick={() => console.log('Open lightbox:', image.imageUrl)}
                      data-testid={`card-gallery-${image.id}`}
                    >
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={image.imageUrl}
                          alt={`Gallery ${image.id}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
