import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  siteSettings?: { logoUrl?: string; divisionName?: string };
  setSiteSettings?: React.Dispatch<React.SetStateAction<{ logoUrl?: string; divisionName: string }>>;
  services?: Array<{ id: string; title: string; link: string; icon: string }>;
  setServices?: React.Dispatch<React.SetStateAction<Array<{ id: string; title: string; link: string; icon: string }>>>;
  relatedLinks?: Array<{ id: string; title: string; url: string; target: string }>;
  setRelatedLinks?: React.Dispatch<React.SetStateAction<Array<{ id: string; title: string; url: string; target: string }>>>;
  heroSlides?: Array<{ id: string; imageUrl: string }>;
  setHeroSlides?: React.Dispatch<React.SetStateAction<Array<{ id: string; imageUrl: string }>>>;
  collaborationLogos?: Array<{ id: string; name?: string; imageUrl: string }>;
  setCollaborationLogos?: React.Dispatch<React.SetStateAction<Array<{ id: string; name?: string; imageUrl: string }>>>;
  newsItems?: Array<any>;
  setNewsItems?: React.Dispatch<React.SetStateAction<Array<any>>>;
  galleryCategories?: Array<{ id: string; title: string }>;
  setGalleryCategories?: React.Dispatch<React.SetStateAction<Array<{ id: string; title: string }>>>;
  galleryImages?: Array<{ id: string; imageUrl: string; categoryId?: string }>;
  setGalleryImages?: React.Dispatch<React.SetStateAction<Array<{ id: string; imageUrl: string; categoryId?: string }>>>;
}

const TABS = [
  { key: 'siteSettings', label: 'Site Settings' },
  { key: 'heroSlides', label: 'Hero Slides' },
  { key: 'collaboration', label: 'Collaboration' },
  { key: 'news', label: 'News' },
  { key: 'services', label: 'Services & Apps' },
  { key: 'gallery', label: 'Gallery' },
  { key: 'relatedLinks', label: 'Related Links' }
];

export default function AdminPanel({ 
  isOpen, 
  onClose, 
  siteSettings, 
  setSiteSettings,
  services,
  setServices,
  relatedLinks,
  setRelatedLinks,
  heroSlides,
  setHeroSlides,
  collaborationLogos,
  setCollaborationLogos,
  newsItems,
  setNewsItems,
  galleryCategories,
  setGalleryCategories,
  galleryImages,
  setGalleryImages
}: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState(TABS[0].key);
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);
  
  // Local state for editing
  const [localSettings, setLocalSettings] = useState(siteSettings || { logoUrl: '', divisionName: '' });
  const [localServices, setLocalServices] = useState(services || []);
  const [localRelatedLinks, setLocalRelatedLinks] = useState(relatedLinks || []);
  const [localHeroSlides, setLocalHeroSlides] = useState(heroSlides || []);
  const [localCollaborationLogos, setLocalCollaborationLogos] = useState(collaborationLogos || []);
  const [localNewsItems, setLocalNewsItems] = useState(newsItems || []);
  const [localGalleryCategories, setLocalGalleryCategories] = useState(galleryCategories || []);
  const [localGalleryImages, setLocalGalleryImages] = useState(galleryImages || []);

  const handleLogoUpload = async (file: File) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await fetch('/api/upload', {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });
      
      if (response.ok) {
        const result = await response.json();
        setLocalSettings({ ...localSettings, logoUrl: result.url });
        toast({
          title: 'Success!',
          description: 'Logo uploaded to server successfully.',
        });
      } else {
        const reader = new FileReader();
        reader.onload = () => {
          setLocalSettings({ ...localSettings, logoUrl: reader.result as string });
          toast({
            title: 'Success!',
            description: 'Logo processed successfully.',
          });
        };
        reader.readAsDataURL(file);
      }
    } catch (error) {
      const reader = new FileReader();
      reader.onload = () => {
        setLocalSettings({ ...localSettings, logoUrl: reader.result as string });
        toast({
          title: 'Success!',
          description: 'Logo processed successfully.',
        });
      };
      reader.readAsDataURL(file);
    } finally {
      setUploading(false);
    }
  };

  const handleImageUpload = async (file: File): Promise<string | null> => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await fetch('/api/upload', {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });
      
      if (response.ok) {
        const result = await response.json();
        return result.url;
      } else {
        // Fallback to base64
        const reader = new FileReader();
        return new Promise((resolve) => {
          reader.onload = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        });
      }
    } catch (error) {
      // Fallback to base64
      const reader = new FileReader();
      return new Promise((resolve) => {
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });
    }
  };

  const saveSiteSettings = async () => {
    try {
      const response = await fetch('/api/site-settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(localSettings),
      });
      
      if (response.ok) {
        if (setSiteSettings) {
          setSiteSettings({
            divisionName: localSettings.divisionName || '',
            logoUrl: localSettings.logoUrl
          });
        }
        toast({
          title: 'Saved!',
          description: 'Site settings saved successfully.',
        });
      } else {
        throw new Error('Failed to save');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save site settings.',
        variant: 'destructive',
      });
    }
  };

  const saveServices = async () => {
    try {
      console.log('Saving services:', localServices);
      const response = await fetch('/api/services', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Important: include cookies/session
        body: JSON.stringify(localServices),
      });
      
      console.log('Response status:', response.status);
      if (response.ok) {
        const result = await response.json();
        console.log('Save result:', result);
        if (setServices) {
          setServices(localServices);
        }
        toast({
          title: 'Saved!',
          description: 'Services saved successfully.',
        });
      } else {
        const errorText = await response.text();
        console.error('Save failed:', response.status, errorText);
        throw new Error('Failed to save');
      }
    } catch (error) {
      console.error('Save error:', error);
      toast({
        title: 'Error',
        description: 'Failed to save services.',
        variant: 'destructive',
      });
    }
  };

  const saveRelatedLinks = async () => {
    try {
      const response = await fetch('/api/pages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(localRelatedLinks),
      });
      
      if (response.ok) {
        if (setRelatedLinks) {
          setRelatedLinks(localRelatedLinks);
        }
        toast({
          title: 'Saved!',
          description: 'Related links saved successfully.',
        });
      } else {
        throw new Error('Failed to save');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save related links.',
        variant: 'destructive',
      });
    }
  };

  const saveHeroSlides = async () => {
    try {
      const response = await fetch('/api/hero-slides', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(localHeroSlides),
      });
      
      if (response.ok) {
        if (setHeroSlides) {
          setHeroSlides(localHeroSlides);
        }
        toast({
          title: 'Saved!',
          description: 'Hero slides saved successfully.',
        });
      } else {
        throw new Error('Failed to save');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save hero slides.',
        variant: 'destructive',
      });
    }
  };

  const saveCollaborationLogos = async () => {
    try {
      const response = await fetch('/api/collaboration-logos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(localCollaborationLogos),
      });
      
      if (response.ok) {
        if (setCollaborationLogos) {
          setCollaborationLogos(localCollaborationLogos);
        }
        toast({
          title: 'Saved!',
          description: 'Collaboration logos saved successfully.',
        });
      } else {
        throw new Error('Failed to save');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save collaboration logos.',
        variant: 'destructive',
      });
    }
  };

  const saveNewsItems = async () => {
    try {
      const response = await fetch('/api/news', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(localNewsItems),
      });
      
      if (response.ok) {
        if (setNewsItems) {
          setNewsItems(localNewsItems);
        }
        toast({
          title: 'Saved!',
          description: 'News items saved successfully.',
        });
      } else {
        throw new Error('Failed to save');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save news items.',
        variant: 'destructive',
      });
    }
  };

  const saveGallery = async () => {
    try {
      const [categoriesResponse, imagesResponse] = await Promise.all([
        fetch('/api/gallery-categories', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(localGalleryCategories),
        }),
        fetch('/api/gallery-images', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(localGalleryImages),
        })
      ]);
      
      if (categoriesResponse.ok && imagesResponse.ok) {
        if (setGalleryCategories && setGalleryImages) {
          setGalleryCategories(localGalleryCategories);
          setGalleryImages(localGalleryImages);
        }
        toast({
          title: 'Saved!',
          description: 'Gallery saved successfully.',
        });
      } else {
        throw new Error('Failed to save');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save gallery.',
        variant: 'destructive',
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-start justify-center p-6" onClick={onClose}>
      <Card className="w-full max-w-5xl mt-8 max-h-[85vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <CardHeader>
          <CardTitle>Admin Panel - Edit Site Content</CardTitle>
        </CardHeader>
        <CardContent className="overflow-auto">
          <div className="flex gap-4">
            {/* Sidebar Navigation */}
            <div className="w-48 flex-shrink-0">
              <nav className="flex flex-col gap-1">
                {TABS.map((tab) => (
                  <button 
                    key={tab.key} 
                    className={`text-left p-2 rounded transition-colors ${
                      activeTab === tab.key ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                    }`} 
                    onClick={() => setActiveTab(tab.key)}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Main Content Area */}
            <div className="flex-1">
              <div className="mb-4">
                <h3 className="text-lg font-semibold">
                  {TABS.find((x) => x.key === activeTab)?.label}
                </h3>
              </div>

              {/* Site Settings Tab */}
              {activeTab === 'siteSettings' && (
                <div className="space-y-6">
                  <div>
                    <Label>Division Name</Label>
                    <Input 
                      value={localSettings.divisionName || ''} 
                      onChange={(e) => setLocalSettings({
                        ...localSettings,
                        divisionName: e.target.value
                      })} 
                      placeholder="Enter division name"
                    />
                  </div>

                  <div>
                    <Label>Logo Upload</Label>
                    <div className="space-y-2">
                      {localSettings.logoUrl && (
                        <div className="flex items-center gap-2">
                          <img 
                            src={localSettings.logoUrl} 
                            alt="Current logo" 
                            className="h-16 w-auto border rounded"
                          />
                          <span className="text-sm text-muted-foreground">Current logo</span>
                        </div>
                      )}
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            handleLogoUpload(file);
                          }
                        }}
                        disabled={uploading}
                      />
                      {uploading && (
                        <p className="text-sm text-blue-600">Uploading...</p>
                      )}
                      <p className="text-xs text-muted-foreground">
                        Upload a new logo image. Supported formats: JPG, PNG, GIF. Max size: 10MB.
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-4 border-t">
                    <Button variant="outline" onClick={() => setLocalSettings(siteSettings || { logoUrl: '', divisionName: '' })}>
                      Reset Changes
                    </Button>
                    <Button onClick={saveSiteSettings} className="bg-green-600 hover:bg-green-700">
                      Save Site Settings
                    </Button>
                  </div>
                </div>
              )}

              {/* Services Tab */}
              {activeTab === 'services' && (
                <div className="space-y-6 h-full flex flex-col">
                  <div className="flex-1 min-h-0">
                    <div className="flex items-center justify-between mb-4">
                      <Label>Services & Web Applications</Label>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          const newService = {
                            id: String(Date.now()),
                            title: 'New Service',
                            link: '#',
                            icon: 'database'
                          };
                          setLocalServices([...localServices, newService]);
                        }}
                      >
                        Add Service
                      </Button>
                    </div>
                    
                    <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                      {localServices.map((service, index) => (
                        <div key={service.id} className="p-3 border rounded space-y-2">
                          <div className="flex items-center gap-2">
                            <Input
                              value={service.title}
                              onChange={(e) => {
                                const updated = localServices.map((s, i) => 
                                  i === index ? { ...s, title: e.target.value } : s
                                );
                                setLocalServices(updated);
                              }}
                              placeholder="Service title"
                              className="flex-1"
                            />
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => {
                                const updated = localServices.filter((_, i) => i !== index);
                                setLocalServices(updated);
                              }}
                            >
                              Remove
                            </Button>
                          </div>
                          <div className="flex items-center gap-2">
                            <Input
                              value={service.link}
                              onChange={(e) => {
                                const updated = localServices.map((s, i) => 
                                  i === index ? { ...s, link: e.target.value } : s
                                );
                                setLocalServices(updated);
                              }}
                              placeholder="https://example.com or #"
                              className="flex-1"
                            />
                            <select
                              value={service.icon}
                              onChange={(e) => {
                                const updated = localServices.map((s, i) => 
                                  i === index ? { ...s, icon: e.target.value } : s
                                );
                                setLocalServices(updated);
                              }}
                              className="p-2 border rounded text-sm w-32"
                            >
                              <option value="calendar">Calendar</option>
                              <option value="cpu">CPU</option>
                              <option value="database">Database</option>
                              <option value="users">Users</option>
                              <option value="cloud">Cloud</option>
                              <option value="archive">Archive</option>
                              <option value="smartphone">Mobile</option>
                              <option value="map">Map</option>
                              <option value="layers">Layers</option>
                              <option value="inbox">Inbox</option>
                              <option value="wrench">Wrench</option>
                              <option value="smile">Smile</option>
                              <option value="phone">Phone</option>
                              <option value="bookopen">Book</option>
                              <option value="barchart">Bar Chart</option>
                            </select>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-4 border-t bg-white sticky bottom-0">
                    <Button variant="outline" onClick={() => setLocalServices(services || [])}>
                      Reset Changes
                    </Button>
                    <Button onClick={saveServices} className="bg-green-600 hover:bg-green-700">
                      Save Services
                    </Button>
                  </div>
                </div>
              )}

              {/* Hero Slides Tab */}
              {activeTab === 'heroSlides' && (
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <Label>Hero Slides</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const imageUrl = await handleImageUpload(file);
                              if (imageUrl) {
                                const newSlide = {
                                  id: String(Date.now()),
                                  imageUrl
                                };
                                setLocalHeroSlides([...localHeroSlides, newSlide]);
                              }
                              e.target.value = '';
                            }
                          }}
                          className="w-auto"
                        />
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            const newSlide = {
                              id: String(Date.now()),
                              imageUrl: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200&h=600&fit=crop'
                            };
                            setLocalHeroSlides([...localHeroSlides, newSlide]);
                          }}
                        >
                          Add Sample
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {localHeroSlides.map((slide, index) => (
                        <div key={slide.id} className="flex items-center gap-3 p-3 border rounded">
                          <img 
                            src={slide.imageUrl} 
                            alt={`Slide ${index + 1}`}
                            className="h-20 w-32 object-cover border rounded"
                          />
                          <Input
                            value={slide.imageUrl}
                            onChange={(e) => {
                              const updated = localHeroSlides.map((s, i) => 
                                i === index ? { ...s, imageUrl: e.target.value } : s
                              );
                              setLocalHeroSlides(updated);
                            }}
                            placeholder="Image URL"
                            className="flex-1"
                          />
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => {
                              const updated = localHeroSlides.filter((_, i) => i !== index);
                              setLocalHeroSlides(updated);
                            }}
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-4 border-t">
                    <Button variant="outline" onClick={() => setLocalHeroSlides(heroSlides || [])}>
                      Reset Changes
                    </Button>
                    <Button onClick={saveHeroSlides} className="bg-green-600 hover:bg-green-700">
                      Save Hero Slides
                    </Button>
                  </div>
                </div>
              )}

              {/* Collaboration Tab */}
              {activeTab === 'collaboration' && (
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <Label>Collaboration Partners</Label>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          const newLogo = {
                            id: String(Date.now()),
                            name: `Partner ${localCollaborationLogos.length + 1}`,
                            imageUrl: 'https://via.placeholder.com/200x100/22c55e/ffffff?text=New+Partner'
                          };
                          setLocalCollaborationLogos([...localCollaborationLogos, newLogo]);
                        }}
                      >
                        Add Partner
                      </Button>
                    </div>
                    
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {localCollaborationLogos.map((logo, index) => (
                        <div key={logo.id} className="flex items-center gap-3 p-3 border rounded">
                          <img 
                            src={logo.imageUrl} 
                            alt={logo.name}
                            className="h-16 w-24 object-cover border rounded"
                          />
                          <div className="flex-1 space-y-2">
                            <Input
                              value={logo.name || ''}
                              onChange={(e) => {
                                const updated = localCollaborationLogos.map((l, i) => 
                                  i === index ? { ...l, name: e.target.value } : l
                                );
                                setLocalCollaborationLogos(updated);
                              }}
                              placeholder="Partner name"
                            />
                            <div className="flex gap-2">
                              <Input
                                value={logo.imageUrl}
                                onChange={(e) => {
                                  const updated = localCollaborationLogos.map((l, i) => 
                                    i === index ? { ...l, imageUrl: e.target.value } : l
                                  );
                                  setLocalCollaborationLogos(updated);
                                }}
                                placeholder="Image URL"
                                className="flex-1"
                              />
                              <Input
                                type="file"
                                accept="image/*"
                                onChange={async (e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    const imageUrl = await handleImageUpload(file);
                                    if (imageUrl) {
                                      const updated = localCollaborationLogos.map((l, i) => 
                                        i === index ? { ...l, imageUrl } : l
                                      );
                                      setLocalCollaborationLogos(updated);
                                    }
                                  }
                                  e.target.value = '';
                                }}
                                className="w-32"
                              />
                            </div>
                          </div>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => {
                              const updated = localCollaborationLogos.filter((_, i) => i !== index);
                              setLocalCollaborationLogos(updated);
                            }}
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-4 border-t">
                    <Button variant="outline" onClick={() => setLocalCollaborationLogos(collaborationLogos || [])}>
                      Reset Changes
                    </Button>
                    <Button onClick={saveCollaborationLogos} className="bg-green-600 hover:bg-green-700">
                      Save Collaboration
                    </Button>
                  </div>
                </div>
              )}

              {/* News Tab */}
              {activeTab === 'news' && (
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <Label>News Articles</Label>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          const newArticle = {
                            id: String(Date.now()),
                            title: 'New Article',
                            content: 'Article content goes here...',
                            imageUrl: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop',
                            date: new Date().toISOString().split('T')[0]
                          };
                          setLocalNewsItems([...localNewsItems, newArticle]);
                        }}
                      >
                        Add Article
                      </Button>
                    </div>
                    
                    <div className="space-y-4 max-h-96 overflow-y-auto">
                      {localNewsItems.map((article, index) => (
                        <div key={article.id} className="p-4 border rounded space-y-3">
                          <div className="flex items-start gap-3">
                            <img 
                              src={article.imageUrl} 
                              alt={article.title}
                              className="h-20 w-32 object-cover border rounded flex-shrink-0"
                            />
                            <div className="flex-1 space-y-2">
                              <Input
                                value={article.title}
                                onChange={(e) => {
                                  const updated = localNewsItems.map((a, i) => 
                                    i === index ? { ...a, title: e.target.value } : a
                                  );
                                  setLocalNewsItems(updated);
                                }}
                                placeholder="Article title"
                              />
                              <Input
                                type="date"
                                value={article.date}
                                onChange={(e) => {
                                  const updated = localNewsItems.map((a, i) => 
                                    i === index ? { ...a, date: e.target.value } : a
                                  );
                                  setLocalNewsItems(updated);
                                }}
                              />
                            </div>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => {
                                const updated = localNewsItems.filter((_, i) => i !== index);
                                setLocalNewsItems(updated);
                              }}
                            >
                              Remove
                            </Button>
                          </div>
                          <Textarea
                            value={article.content}
                            onChange={(e) => {
                              const updated = localNewsItems.map((a, i) => 
                                i === index ? { ...a, content: e.target.value } : a
                              );
                              setLocalNewsItems(updated);
                            }}
                            placeholder="Article content"
                            rows={3}
                          />
                          <Input
                            value={article.imageUrl}
                            onChange={(e) => {
                              const updated = localNewsItems.map((a, i) => 
                                i === index ? { ...a, imageUrl: e.target.value } : a
                              );
                              setLocalNewsItems(updated);
                            }}
                            placeholder="Image URL"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-4 border-t">
                    <Button variant="outline" onClick={() => setLocalNewsItems(newsItems || [])}>
                      Reset Changes
                    </Button>
                    <Button onClick={saveNewsItems} className="bg-green-600 hover:bg-green-700">
                      Save News
                    </Button>
                  </div>
                </div>
              )}

              {/* Services Tab */}
              {activeTab === 'services' && (
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <Label>Services & Web Applications</Label>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          const newService = {
                            id: String(Date.now()),
                            title: 'New Service',
                            link: '#',
                            icon: 'database'
                          };
                          setLocalServices([...localServices, newService]);
                        }}
                      >
                        Add Service
                      </Button>
                    </div>
                    
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {localServices.map((service, index) => (
                        <div key={service.id} className="p-3 border rounded space-y-2">
                          <div className="flex items-center gap-2">
                            <Input
                              value={service.title}
                              onChange={(e) => {
                                const updated = localServices.map((s, i) => 
                                  i === index ? { ...s, title: e.target.value } : s
                                );
                                setLocalServices(updated);
                              }}
                              placeholder="Service title"
                              className="flex-1"
                            />
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => {
                                const updated = localServices.filter((_, i) => i !== index);
                                setLocalServices(updated);
                              }}
                            >
                              Remove
                            </Button>
                          </div>
                          <div className="flex items-center gap-2">
                            <Input
                              value={service.link}
                              onChange={(e) => {
                                const updated = localServices.map((s, i) => 
                                  i === index ? { ...s, link: e.target.value } : s
                                );
                                setLocalServices(updated);
                              }}
                              placeholder="https://example.com or #"
                              className="flex-1"
                            />
                            <select
                              value={service.icon}
                              onChange={(e) => {
                                const updated = localServices.map((s, i) => 
                                  i === index ? { ...s, icon: e.target.value } : s
                                );
                                setLocalServices(updated);
                              }}
                              className="p-2 border rounded text-sm w-32"
                            >
                              <option value="calendar">Calendar</option>
                              <option value="cpu">CPU</option>
                              <option value="database">Database</option>
                              <option value="users">Users</option>
                              <option value="cloud">Cloud</option>
                              <option value="archive">Archive</option>
                              <option value="smartphone">Mobile</option>
                              <option value="map">Map</option>
                              <option value="layers">Layers</option>
                              <option value="inbox">Inbox</option>
                            </select>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-4 border-t">
                    <Button variant="outline" onClick={() => setLocalServices(services || [])}>
                      Reset Changes
                    </Button>
                    <Button onClick={saveServices} className="bg-green-600 hover:bg-green-700">
                      Save Services
                    </Button>
                  </div>
                </div>
              )}

              {/* Gallery Tab */}
              {activeTab === 'gallery' && (
                <div className="space-y-6">
                  <div>
                    <Label>Gallery Categories</Label>
                    <div className="space-y-2 mb-4">
                      {localGalleryCategories.map((category, index) => (
                        <div key={category.id} className="flex items-center gap-2">
                          <Input
                            value={category.title}
                            onChange={(e) => {
                              const updated = localGalleryCategories.map((c, i) => 
                                i === index ? { ...c, title: e.target.value } : c
                              );
                              setLocalGalleryCategories(updated);
                            }}
                            placeholder="Category name"
                            className="flex-1"
                          />
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => {
                              const updated = localGalleryCategories.filter((_, i) => i !== index);
                              setLocalGalleryCategories(updated);
                            }}
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const newCategory = {
                            id: String(Date.now()),
                            title: 'New Category'
                          };
                          setLocalGalleryCategories([...localGalleryCategories, newCategory]);
                        }}
                      >
                        Add Category
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label>Gallery Images</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2 max-h-96 overflow-y-auto">
                      {localGalleryImages.map((image, index) => (
                        <div key={image.id} className="space-y-2">
                          <img 
                            src={image.imageUrl} 
                            alt={`Gallery ${index + 1}`}
                            className="w-full h-32 object-cover border rounded"
                          />
                          <select
                            value={image.categoryId || ''}
                            onChange={(e) => {
                              const updated = localGalleryImages.map((img, i) => 
                                i === index ? { ...img, categoryId: e.target.value } : img
                              );
                              setLocalGalleryImages(updated);
                            }}
                            className="w-full p-1 border rounded text-sm"
                          >
                            <option value="">Select category</option>
                            {localGalleryCategories.map(cat => (
                              <option key={cat.id} value={cat.id}>{cat.title}</option>
                            ))}
                          </select>
                          <Button
                            variant="destructive"
                            size="sm"
                            className="w-full"
                            onClick={() => {
                              const updated = localGalleryImages.filter((_, i) => i !== index);
                              setLocalGalleryImages(updated);
                            }}
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                      <div className="border-2 border-dashed border-muted-foreground/25 rounded p-4 flex flex-col items-center justify-center space-y-2">
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (file && localGalleryCategories.length > 0) {
                              const imageUrl = await handleImageUpload(file);
                              if (imageUrl) {
                                const newImage = {
                                  id: String(Date.now()),
                                  imageUrl,
                                  categoryId: localGalleryCategories[0].id
                                };
                                setLocalGalleryImages([...localGalleryImages, newImage]);
                              }
                              e.target.value = '';
                            }
                          }}
                          className="w-full"
                        />
                        <p className="text-xs text-muted-foreground text-center">
                          Upload new image
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-4 border-t">
                    <Button variant="outline" onClick={() => {
                      setLocalGalleryCategories(galleryCategories || []);
                      setLocalGalleryImages(galleryImages || []);
                    }}>
                      Reset Changes
                    </Button>
                    <Button onClick={saveGallery} className="bg-green-600 hover:bg-green-700">
                      Save Gallery
                    </Button>
                  </div>
                </div>
              )}

              {/* Related Links Tab */}
              {activeTab === 'relatedLinks' && (
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <Label>Related Links</Label>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          const newLink = {
                            id: String(Date.now()),
                            title: 'New Link',
                            url: 'https://example.com',
                            target: '_blank'
                          };
                          setLocalRelatedLinks([...localRelatedLinks, newLink]);
                        }}
                      >
                        Add Link
                      </Button>
                    </div>
                    
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {localRelatedLinks.map((link, index) => (
                        <div key={link.id} className="p-3 border rounded space-y-2">
                          <div className="flex items-center gap-2">
                            <Input
                              value={link.title}
                              onChange={(e) => {
                                const updated = localRelatedLinks.map((l, i) => 
                                  i === index ? { ...l, title: e.target.value } : l
                                );
                                setLocalRelatedLinks(updated);
                              }}
                              placeholder="Link title"
                              className="flex-1"
                            />
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => {
                                const updated = localRelatedLinks.filter((_, i) => i !== index);
                                setLocalRelatedLinks(updated);
                              }}
                            >
                              Remove
                            </Button>
                          </div>
                          <div className="flex items-center gap-2">
                            <Input
                              value={link.url}
                              onChange={(e) => {
                                const updated = localRelatedLinks.map((l, i) => 
                                  i === index ? { ...l, url: e.target.value } : l
                                );
                                setLocalRelatedLinks(updated);
                              }}
                              placeholder="https://example.com"
                              className="flex-1"
                            />
                            <select
                              value={link.target}
                              onChange={(e) => {
                                const updated = localRelatedLinks.map((l, i) => 
                                  i === index ? { ...l, target: e.target.value } : l
                                );
                                setLocalRelatedLinks(updated);
                              }}
                              className="p-2 border rounded text-sm"
                            >
                              <option value="_blank">New Tab</option>
                              <option value="_self">Same Tab</option>
                            </select>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-4 border-t">
                    <Button variant="outline" onClick={() => setLocalRelatedLinks(relatedLinks || [])}>
                      Reset Changes
                    </Button>
                    <Button onClick={saveRelatedLinks} className="bg-green-600 hover:bg-green-700">
                      Save Related Links
                    </Button>
                  </div>
                </div>
              )}

              {/* Global Actions */}
              <div className="flex justify-end gap-2 mt-6 pt-4 border-t">
                <Button variant="outline" onClick={onClose}>
                  Close Panel
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}