import { Link } from "wouter";
import { Menu, X, LogOut, User } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface HeaderProps {
  logoUrl?: string;
  divisionName: string;
  isAdmin: boolean;
  onLogout: () => void;
}

export default function Header({ logoUrl, divisionName, isAdmin, onLogout }: HeaderProps) {
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
          </nav>

          <div className="flex items-center gap-2">
            {isAdmin && (
              <Badge variant="secondary" className="hidden md:flex items-center gap-1">
                <User className="h-3 w-3" />
                Admin
              </Badge>
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
              {isAdmin && (
                <div className="flex items-center gap-2 px-4 py-2">
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
