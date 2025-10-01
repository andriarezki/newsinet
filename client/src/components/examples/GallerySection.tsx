import GallerySection from '../GallerySection';

export default function GallerySectionExample() {
  const categories = [
    { id: '1', title: 'Field Operations' },
    { id: '2', title: 'Laboratory Research' },
    { id: '3', title: 'Company Events' },
    { id: '4', title: 'Facilities' },
  ];

  const images = [
    { id: '1', imageUrl: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&h=400&fit=crop', categoryId: '1' },
    { id: '2', imageUrl: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&h=400&fit=crop', categoryId: '1' },
    { id: '3', imageUrl: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=600&h=400&fit=crop', categoryId: '1' },
    { id: '4', imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&h=400&fit=crop', categoryId: '2' },
    { id: '5', imageUrl: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&h=400&fit=crop', categoryId: '2' },
    { id: '6', imageUrl: 'https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=600&h=400&fit=crop', categoryId: '2' },
    { id: '7', imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop', categoryId: '3' },
    { id: '8', imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&h=400&fit=crop', categoryId: '3' },
    { id: '9', imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop', categoryId: '4' },
    { id: '10', imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop', categoryId: '4' },
  ];

  return <GallerySection categories={categories} images={images} />;
}
