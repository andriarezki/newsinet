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
import AdminPanel from '@/components/AdminPanel';
import { useToast } from '@/hooks/use-toast';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Site content state that can be edited by admin
  const [siteSettings, setSiteSettings] = useState<any>({
    logoUrl: '',
    divisionName: 'SMARTRI Information Data Management Center'
  });
  
  const [heroSlides, setHeroSlides] = useState<any>([]);

  const [collaborationLogos, setCollaborationLogos] = useState<any>([]);

  const [newsItems, setNewsItems] = useState<any>([]);

  const [galleryCategories, setGalleryCategories] = useState<any>([]);

  const [galleryImages, setGalleryImages] = useState<any>([]);

  const [relatedLinks, setRelatedLinks] = useState<any>([]);

  const [services, setServices] = useState<any>([]);

  const { toast } = useToast();

  // Load all data from server APIs on component mount
  useEffect(() => {
    const loadAllData = async () => {
      try {
        setIsLoading(true);
        
        // Load all data from server APIs in parallel
        const [
          siteSettingsRes,
          heroSlidesRes,
          collaborationLogosRes,
          newsRes,
          servicesRes,
          galleryCategoriesRes,
          galleryImagesRes,
          contactInfoRes,
          pagesRes
        ] = await Promise.all([
          fetch('/api/site-settings', { credentials: 'include' }),
          fetch('/api/hero-slides', { credentials: 'include' }),
          fetch('/api/collaboration-logos', { credentials: 'include' }),
          fetch('/api/news', { credentials: 'include' }),
          fetch('/api/services', { credentials: 'include' }),
          fetch('/api/gallery-categories', { credentials: 'include' }),
          fetch('/api/gallery-images', { credentials: 'include' }),
          fetch('/api/contact-info', { credentials: 'include' }),
          fetch('/api/pages', { credentials: 'include' })
        ]);

        // Parse responses
        const siteSettingsData = await siteSettingsRes.json();
        const heroSlidesData = await heroSlidesRes.json();
        const collaborationLogosData = await collaborationLogosRes.json();
        const newsData = await newsRes.json();
        const servicesData = await servicesRes.json();
        const galleryCategoriesData = await galleryCategoriesRes.json();
        const galleryImagesData = await galleryImagesRes.json();
        const contactInfoData = await contactInfoRes.json();
        const pagesData = await pagesRes.json();

        // Set state with server data, or fallback to defaults
        setSiteSettings(siteSettingsData || {
          logoUrl: '',
          divisionName: 'SMARTRI Information Data Management Center'
        });

        setHeroSlides(heroSlidesData.length > 0 ? heroSlidesData : [
          { id: '1', imageUrl: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1600&h=600&fit=crop' },
          { id: '2', imageUrl: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1600&h=600&fit=crop' },
          { id: '3', imageUrl: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=1600&h=600&fit=crop' },
        ]);

        setCollaborationLogos(collaborationLogosData.length > 0 ? collaborationLogosData : [
          { id: '1', imageUrl: 'https://via.placeholder.com/200x100/22c55e/ffffff?text=Partner+1', name: 'Partner 1' },
          { id: '2', imageUrl: 'https://via.placeholder.com/200x100/22c55e/ffffff?text=Partner+2', name: 'Partner 2' },
          { id: '3', imageUrl: 'https://via.placeholder.com/200x100/22c55e/ffffff?text=Partner+3', name: 'Partner 3' },
          { id: '4', imageUrl: 'https://via.placeholder.com/200x100/22c55e/ffffff?text=Partner+4', name: 'Partner 4' },
          { id: '5', imageUrl: 'https://via.placeholder.com/200x100/22c55e/ffffff?text=Partner+5', name: 'Partner 5' },
        ]);

        setNewsItems(newsData.length > 0 ? newsData : [
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
        ]);

        setServices(servicesData.length > 0 ? servicesData : [
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
          { id: '14', title: 'More Apps', link: '#', icon: 'layers' },
          { id: '15', title: 'Mobile App', link: '#', icon: 'smartphone' },
        ]);

        setGalleryCategories(galleryCategoriesData.length > 0 ? galleryCategoriesData : [
          { id: '1', title: 'Field Operations' },
          { id: '2', title: 'Laboratory Research' },
          { id: '3', title: 'Company Events' },
          { id: '4', title: 'Facilities' },
        ]);

        setGalleryImages(galleryImagesData.length > 0 ? galleryImagesData : [
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
        ]);

        setRelatedLinks(pagesData.length > 0 ? pagesData : [
          { id: '1', title: 'Ministry of Agriculture', url: 'https://www.pertanian.go.id', target: '_blank' },
          { id: '2', title: 'Research Portal', url: 'https://research.smartri.org', target: '_blank' },
          { id: '3', title: 'Palm Oil Council', url: 'https://www.palmoilcouncil.org', target: '_blank' },
          { id: '4', title: 'Sustainability Report', url: '/sustainability', target: '_self' },
          { id: '5', title: 'Annual Publication', url: '/publications', target: '_self' },
        ]);

        setIsLoading(false);
      } catch (error) {
        console.error('Error loading data:', error);
        toast({
          title: "Error",
          description: "Failed to load data from server. Using default values.",
          variant: "destructive",
        });
        
        // Set defaults if server fails
        setIsLoading(false);
      }
    };

    loadAllData();
  }, [toast]);

  // Check login state from localStorage on mount and verify with server
  useEffect(() => {
    const checkLoginState = async () => {
      try {
        const loggedIn = localStorage.getItem('smartri_loggedIn') === 'true';
        const role = localStorage.getItem('smartri_role');
        
        if (loggedIn) {
          // Verify the session is still valid by making a test request
          const testResponse = await fetch('/api/site-settings', { 
            credentials: 'include' 
          });
          
          if (testResponse.ok) {
            setIsLoggedIn(true);
            setIsAdmin(role === 'admin');
          } else {
            // Session expired, clear localStorage
            localStorage.removeItem('smartri_loggedIn');
            localStorage.removeItem('smartri_role');
            setIsLoggedIn(false);
            setIsAdmin(false);
          }
        }
      } catch (error) {
        console.error('Error checking login state:', error);
        // Clear localStorage on error
        localStorage.removeItem('smartri_loggedIn');
        localStorage.removeItem('smartri_role');
        setIsLoggedIn(false);
        setIsAdmin(false);
      }
    };

    checkLoginState();
  }, []);

  const handleLogin = async (username: string, password: string) => {
    try {
      console.log('Attempting login with:', username);
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Important: include cookies/session
        body: JSON.stringify({ username, password }),
      });

      console.log('Login response status:', response.status);
      if (response.ok) {
        const result = await response.json();
        console.log('Login result:', result);
        if (result.ok) {
          setIsLoggedIn(true);
          setIsAdmin(result.role === 'admin');
          try {
            localStorage.setItem('smartri_loggedIn', 'true');
            localStorage.setItem('smartri_role', result.role);
          } catch (error) {
            console.error('Error saving login state:', error);
          }
          toast({
            title: 'Welcome!',
            description: `Logged in as ${result.role === 'admin' ? 'Admin (Full Access)' : 'User (View Only)'}`,
          });
        } else {
          throw new Error(result.message || 'Login failed');
        }
      } else {
        const errorText = await response.text();
        console.error('Login failed:', response.status, errorText);
        throw new Error('Login request failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: 'Login Failed',
        description: 'Invalid username or password',
        variant: 'destructive',
      });
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/logout', {
        method: 'POST',
        credentials: 'include', // Important: include cookies/session
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
    
    setIsLoggedIn(false);
    setIsAdmin(false);
    setShowAdminPanel(false);
    try {
      localStorage.removeItem('smartri_loggedIn');
      localStorage.removeItem('smartri_role');
    } catch (error) {
      console.error('Error clearing login state:', error);
    }
    toast({
      title: 'Logged Out',
      description: 'You have been successfully logged out',
    });
  };

  const handleOpenAdmin = () => {
    setShowAdminPanel(true);
  };

  const handleCloseAdmin = () => {
    setShowAdminPanel(false);
  };

  if (!isLoggedIn) {
    return <LoginForm onLogin={handleLogin} />;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Loading website content...</p>
        </div>
      </div>
    );
  }

  return (
    <div id="home" className="min-h-screen">
      <Header
        logoUrl={siteSettings.logoUrl}
        divisionName={siteSettings.divisionName}
        isAdmin={isAdmin}
        onLogout={handleLogout}
        onOpenAdmin={handleOpenAdmin}
        relatedLinks={relatedLinks}
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
      
      {/* Admin Panel */}
      {isAdmin && (
        <AdminPanel
          isOpen={showAdminPanel}
          onClose={handleCloseAdmin}
          siteSettings={siteSettings}
          setSiteSettings={setSiteSettings}
          heroSlides={heroSlides}
          setHeroSlides={setHeroSlides}
          collaborationLogos={collaborationLogos}
          setCollaborationLogos={setCollaborationLogos}
          newsItems={newsItems}
          setNewsItems={setNewsItems}
          galleryCategories={galleryCategories}
          setGalleryCategories={setGalleryCategories}
          galleryImages={galleryImages}
          setGalleryImages={setGalleryImages}
          relatedLinks={relatedLinks}
          setRelatedLinks={setRelatedLinks}
          services={services}
          setServices={setServices}
        />
      )}
    </div>
  );
}