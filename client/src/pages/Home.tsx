import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import HeroCarousel from '@/components/HeroCarousel';
import CollaborationSection from '@/components/CollaborationSection';
import NewsSection from '@/components/NewsSection';
import ServicesSection from '@/components/ServicesSection';
import GallerySection from '@/components/GallerySection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import LoginForm from '@/components/LoginForm';
import { useToast } from '@/hooks/use-toast';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const { toast } = useToast();

  const handleLogin = (username: string, password: string) => {
    if (username === 'user' && password === 'user') {
      setIsLoggedIn(true);
      setIsAdmin(false);
      toast({
        title: 'Welcome!',
        description: 'Logged in as User (View Only)',
      });
    } else if (username === 'admin' && password === 'admin123') {
      setIsLoggedIn(true);
      setIsAdmin(true);
      toast({
        title: 'Welcome!',
        description: 'Logged in as Admin (Full Access)',
      });
    } else {
      toast({
        title: 'Login Failed',
        description: 'Invalid username or password',
        variant: 'destructive',
      });
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    toast({
      title: 'Logged Out',
      description: 'You have been successfully logged out',
    });
  };

  if (!isLoggedIn) {
    return <LoginForm onLogin={handleLogin} />;
  }

  const heroSlides = [
    { id: '1', imageUrl: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1600&h=600&fit=crop' },
    { id: '2', imageUrl: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1600&h=600&fit=crop' },
    { id: '3', imageUrl: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=1600&h=600&fit=crop' },
  ];

  const collaborationLogos = [
    { id: '1', imageUrl: 'https://via.placeholder.com/200x100/22c55e/ffffff?text=Partner+1', name: 'Partner 1' },
    { id: '2', imageUrl: 'https://via.placeholder.com/200x100/22c55e/ffffff?text=Partner+2', name: 'Partner 2' },
    { id: '3', imageUrl: 'https://via.placeholder.com/200x100/22c55e/ffffff?text=Partner+3', name: 'Partner 3' },
    { id: '4', imageUrl: 'https://via.placeholder.com/200x100/22c55e/ffffff?text=Partner+4', name: 'Partner 4' },
    { id: '5', imageUrl: 'https://via.placeholder.com/200x100/22c55e/ffffff?text=Partner+5', name: 'Partner 5' },
  ];

  const newsItems = [
    {
      id: '1',
      title: 'SMARTRI Launches New Research Initiative',
      content: 'We are excited to announce our latest research initiative focused on sustainable palm oil production methods that minimize environmental impact while maximizing yield.',
      imageUrl: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop',
      date: '2025-09-28',
    },
    {
      id: '2',
      title: 'International Collaboration Summit 2025',
      content: 'SMARTRI hosted representatives from over 20 countries to discuss innovations in agricultural technology and sustainable farming practices.',
      imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop',
      date: '2025-09-25',
    },
    {
      id: '3',
      title: 'Advanced Laboratory Facilities Upgraded',
      content: 'Our state-of-the-art laboratory has been equipped with cutting-edge technology to enhance research capabilities in palm oil processing.',
      imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&h=300&fit=crop',
      date: '2025-09-20',
    },
  ];

  const services = [
    { id: '1', title: 'GoMeeting', link: '#', icon: 'calendar' },
    { id: '2', title: 'ITMonitor', link: '#', icon: 'cpu' },
    { id: '3', title: 'Digilib', link: '#', icon: 'bookopen' },
    { id: '4', title: 'GoMaintenance', link: '#', icon: 'wrench' },
    { id: '5', title: 'Efeedbox', link: '#', icon: 'inbox' },
    { id: '6', title: 'Customer Satisfaction', link: '#', icon: 'smile' },
    { id: '7', title: 'DataRequest', link: '#', icon: 'database' },
    { id: '8', title: 'SMARTRI Hotline', link: '#', icon: 'phone' },
    { id: '9', title: 'SmartCollab', link: '#', icon: 'users' },
    { id: '10', title: 'Climatology Data', link: '#', icon: 'cloud' },
    { id: '11', title: 'GIS Data', link: '#', icon: 'map' },
    { id: '12', title: 'Reports', link: '#', icon: 'barchart' },
    { id: '13', title: 'Archive', link: '#', icon: 'archive' },
    { id: '14', title: 'More Apps (editable)', link: '#', icon: 'layers' },
    { id: '15', title: 'Mobile App', link: '#', icon: 'smartphone' },
  ];

  const galleryCategories = [
    { id: '1', title: 'Field Operations' },
    { id: '2', title: 'Laboratory Research' },
    { id: '3', title: 'Company Events' },
    { id: '4', title: 'Facilities' },
  ];

  const galleryImages = [
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

  return (
    <div id="home" className="min-h-screen">
      <Header
        divisionName="SMARTRI Information Data Management Center"
        isAdmin={isAdmin}
        onLogout={handleLogout}
      />
      <main>
        <HeroCarousel slides={heroSlides} />
        <CollaborationSection logos={collaborationLogos} />
        <NewsSection newsItems={newsItems} />
        <ServicesSection services={services} />
        <GallerySection categories={galleryCategories} images={galleryImages} />
        <ContactSection
          mapEmbedUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322283!2d106.8195613!3d-6.1944491!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5d2e764b12d%3A0x3d2ad6e1e0e9bcc8!2sNational%20Monument!5e0!3m2!1sen!2sid!4v1234567890"
          phone="+62 21 1234 5678"
          email="info@smartri.com"
          address="Jl. Research Center No. 123, Jakarta 12345, Indonesia"
        />
      </main>
      <Footer />
    </div>
  );
}
