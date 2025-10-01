import { 
  Database, Globe, LineChart, FileText, Settings, 
  Cloud, Shield, Users, BarChart, Cpu,
  Layers, Search, Archive, BookOpen, Smartphone
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const iconMap = {
  database: Database,
  globe: Globe,
  linechart: LineChart,
  filetext: FileText,
  settings: Settings,
  cloud: Cloud,
  shield: Shield,
  users: Users,
  barchart: BarChart,
  cpu: Cpu,
  layers: Layers,
  search: Search,
  archive: Archive,
  bookopen: BookOpen,
  smartphone: Smartphone,
};

interface Service {
  id: string;
  title: string;
  link: string;
  icon: string;
}

interface ServicesSectionProps {
  services: Service[];
}

export default function ServicesSection({ services }: ServicesSectionProps) {
  return (
    <section id="services" className="py-16 md:py-20 bg-card">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <h2 className="text-4xl font-bold text-center mb-4 text-foreground">Our Services & Web Applications</h2>
        <p className="text-center text-muted-foreground mb-12">Comprehensive digital solutions for research and data management</p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {services.map((service) => {
            const IconComponent = iconMap[service.icon.toLowerCase() as keyof typeof iconMap] || Database;
            
            return (
              <Card 
                key={service.id} 
                className="hover-elevate active-elevate-2 cursor-pointer transition-all"
                onClick={() => {
                  if (service.link) {
                    console.log(`Navigate to: ${service.link}`);
                  }
                }}
                data-testid={`card-service-${service.id}`}
              >
                <CardContent className="flex flex-col items-center justify-center p-6 text-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <IconComponent className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-sm font-semibold text-foreground">{service.title}</h3>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
