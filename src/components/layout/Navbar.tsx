import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Heart, MessageSquare, FileText, Search, Pill, TestTube, Stethoscope } from "lucide-react";
import { cn } from "@/lib/utils";
import { UserMenu } from "@/components/auth/UserMenu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLinks = [
    { name: "Connect", path: "/survivors", icon: <Heart className="h-4 w-4 mr-2" /> },
    { name: "Community", path: "/community", icon: <MessageSquare className="h-4 w-4 mr-2" /> },
    { name: "Find Care", path: "/symptom-care-locator", icon: <Search className="h-4 w-4 mr-2" /> },
    { name: "Get Medication", path: "/get-medicines", icon: <Pill className="h-4 w-4 mr-2" /> },
    { name: "Lab Tests", path: "/lab-tests", icon: <TestTube className="h-4 w-4 mr-2" /> },
    { name: "Symptoms", path: "/symptoms", icon: <FileText className="h-4 w-4 mr-2" /> },
    { name: "For Doctors", path: "/doctor-registration", icon: <Stethoscope className="h-4 w-4 mr-2" /> },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-cancer-purple" fill="#E5DEFF" />
            <span className="text-xl font-bold text-foreground">CancerLink</span>
          </Link>
        </div>

        {/* Desktop navigation */}
        <div className="hidden md:flex md:items-center md:gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.icon}
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <UserMenu />
          <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile navigation */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300 ease-in-out border-b",
          isOpen ? "max-h-[400px] border-border" : "max-h-0 border-transparent"
        )}
      >
        <div className="container py-4 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="flex items-center py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {link.icon}
              {link.name}
            </Link>
          ))}
          <div className="flex flex-col gap-2 pt-2 border-t">
            <Link to="/login" onClick={() => setIsOpen(false)}>
              <Button variant="outline" className="w-full justify-start">
                <Heart className="h-4 w-4 mr-2" />
                Log in
              </Button>
            </Link>
            <Link to="/signup" onClick={() => setIsOpen(false)}>
              <Button className="w-full">Sign up</Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
