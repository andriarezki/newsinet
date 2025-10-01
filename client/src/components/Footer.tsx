import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-bold mb-4">About SMARTRI</h3>
            <p className="text-primary-foreground/90 text-sm">
              SMARTRI Information Data Management Center is dedicated to advancing research and development 
              in the palm oil industry through innovative data management solutions.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#home" className="text-primary-foreground/90 hover:text-primary-foreground transition-colors">Home</a></li>
              <li><a href="#collaboration" className="text-primary-foreground/90 hover:text-primary-foreground transition-colors">Our Collaboration</a></li>
              <li><a href="#news" className="text-primary-foreground/90 hover:text-primary-foreground transition-colors">News Update</a></li>
              <li><a href="#services" className="text-primary-foreground/90 hover:text-primary-foreground transition-colors">Our Services</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Connect With Us</h3>
            <div className="flex gap-3">
              <a 
                href="#" 
                className="h-9 w-9 rounded-full bg-primary-foreground/10 flex items-center justify-center hover-elevate transition-all"
                data-testid="link-facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a 
                href="#" 
                className="h-9 w-9 rounded-full bg-primary-foreground/10 flex items-center justify-center hover-elevate transition-all"
                data-testid="link-twitter"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a 
                href="#" 
                className="h-9 w-9 rounded-full bg-primary-foreground/10 flex items-center justify-center hover-elevate transition-all"
                data-testid="link-linkedin"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a 
                href="#" 
                className="h-9 w-9 rounded-full bg-primary-foreground/10 flex items-center justify-center hover-elevate transition-all"
                data-testid="link-instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-primary-foreground/20 pt-8 text-center">
          <p className="text-sm text-primary-foreground/90">
            © {new Date().getFullYear()} SMARTRI Information Data Management Center. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
