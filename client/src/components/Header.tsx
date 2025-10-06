import { Link } from "wouter";
import { Menu, X, LogOut, User, ChevronDown, ExternalLink } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  logoUrl?: string;
  divisionName: string;
  isAdmin: boolean;
  onLogout: () => void;
  onOpenAdmin?: () => void;
  relatedLinks?: Array<{ id: string; title: string; url: string; target: string }>;
}

export default function Header({ logoUrl, divisionName, isAdmin, onLogout, onOpenAdmin, relatedLinks }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const menuItems = [
    { label: "Home", section: "home" },
    { label: "Our Collaboration", section: "collaboration" },
    { label: "News Update", section: "news" },
    { label: "Our Services & Web Application", section: "services" },
    { label: "Gallery", section: "gallery" },
    { label: "Contact", section: "contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-4">
            {logoUrl ? (
              <img src={logoUrl} alt="SMARTRI Logo" className="h-14 w-auto" />
            ) : (
              <div className="h-14 w-14 bg-primary rounded-md flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">S</span>
              </div>
            )}
            <div className="hidden md:block">
              <h1 className="text-lg font-bold text-foreground leading-tight">{divisionName}</h1>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-2">
            {menuItems.map((item) => (
              <Button
                key={item.section}
                variant="ghost"
                onClick={() => scrollToSection(item.section)}
                className="text-sm"
                data-testid={`nav-${item.section}`}
              >
                {item.label}
              </Button>
            ))}
            
            {/* Related Links Dropdown */}
            {relatedLinks && relatedLinks.length > 0 && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-sm flex items-center gap-1">
                    Related Links
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                  {relatedLinks.map((link) => (
                    <DropdownMenuItem key={link.id} asChild>
                      <a
                        href={link.url}
                        target={link.target}
                        rel={link.target === '_blank' ? 'noopener noreferrer' : undefined}
                        className="flex items-center gap-2 w-full"
                      >
                        <span className="flex-1">{link.title}</span>
                        {link.target === '_blank' && <ExternalLink className="h-3 w-3" />}
                      </a>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </nav>

          <div className="flex items-center gap-2">
            {isAdmin && (
              <div className="hidden md:flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={() => onOpenAdmin && onOpenAdmin()} data-testid="button-open-admin">
                  Edit
                </Button>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <User className="h-3 w-3" />
                  Admin
                </Badge>
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={onLogout}
              data-testid="button-logout"
              className="hidden md:flex"
            >
              <LogOut className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden"
              data-testid="button-menu-toggle"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t">
            <nav className="flex flex-col gap-2">
              {menuItems.map((item) => (
                <Button
                  key={item.section}
                  variant="ghost"
                  onClick={() => scrollToSection(item.section)}
                  className="justify-start"
                  data-testid={`nav-mobile-${item.section}`}
                >
                  {item.label}
                </Button>
              ))}
              
              {/* Related Links for Mobile */}
              {relatedLinks && relatedLinks.length > 0 && (
                <div className="border-t pt-2 mt-2">
                  <div className="px-4 py-2 text-sm font-medium text-muted-foreground">
                    Related Links
                  </div>
                  {relatedLinks.map((link) => (
                    <Button
                      key={link.id}
                      variant="ghost"
                      asChild
                      className="justify-start pl-6"
                    >
                      <a
                        href={link.url}
                        target={link.target}
                        rel={link.target === '_blank' ? 'noopener noreferrer' : undefined}
                        className="flex items-center gap-2"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <span className="flex-1">{link.title}</span>
                        {link.target === '_blank' && <ExternalLink className="h-3 w-3" />}
                      </a>
                    </Button>
                  ))}
                </div>
              )}
              
              {isAdmin && (
                <div className="flex items-center gap-2 px-4 py-2">
                  <Button variant="ghost" onClick={() => onOpenAdmin && onOpenAdmin()} className="justify-start">
                    Edit
                  </Button>
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    Admin
                  </Badge>
                </div>
              )}
              <Button
                variant="ghost"
                onClick={onLogout}
                className="justify-start"
                data-testid="button-logout-mobile"
              >
                <LogOut className="h-5 w-5 mr-2" />
                Logout
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
