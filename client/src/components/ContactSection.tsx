import { MapPin, Phone, Mail } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface ContactSectionProps {
  mapEmbedUrl: string;
  phone: string;
  email: string;
  address: string;
}

export default function ContactSection({ mapEmbedUrl, phone, email, address }: ContactSectionProps) {
  return (
    <section id="contact" className="py-16 md:py-20 bg-card">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <h2 className="text-4xl font-bold text-center mb-12 text-foreground">Contact Us</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            <Card className="h-full overflow-hidden">
              <div className="h-full min-h-[400px]">
                <iframe
                  src={mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: '400px' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="SMARTRI Location"
                />
              </div>
            </Card>
          </div>
          
          <div className="lg:col-span-2 space-y-4">
            <Card className="hover-elevate">
              <CardContent className="flex items-start gap-4 p-6">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Address</h3>
                  <p className="text-muted-foreground text-sm">{address}</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover-elevate">
              <CardContent className="flex items-start gap-4 p-6">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Phone</h3>
                  <p className="text-muted-foreground text-sm">{phone}</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover-elevate">
              <CardContent className="flex items-start gap-4 p-6">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Email</h3>
                  <p className="text-muted-foreground text-sm">{email}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
