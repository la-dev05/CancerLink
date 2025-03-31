import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Heart, MessageSquare, FileText, Search, Pill, TestTube, Stethoscope, Video, ChevronLeft, ChevronRight, Home, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import { UserMenu } from "@/components/auth/UserMenu";
import { useNavScroll } from "@/hooks/useNavScroll";

const NAV_SCROLL_KEY = 'nav-scroll-position';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const { scrollRef, handleScroll } = useNavScroll();
  const location = useLocation();

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
    { name: "Online Consultation", path: "/online-consultation", icon: <Video className="h-4 w-4 mr-2" /> },
    { name: "Accommodations", path: "/accommodations", icon: <Home className="h-4 w-4 mr-2" /> },
    { name: "Cancer Insurance", path: "/cancer-insurance", icon: <Shield className="h-4 w-4 mr-2" /> },
    { name: "For Doctors", path: "/doctor-registration", icon: <Stethoscope className="h-4 w-4 mr-2" /> },
  ];

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const handleScrollDirection = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300; // Adjust this value to control scroll distance
      const targetScroll = scrollRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
      scrollRef.current.scrollTo({
        left: targetScroll,
        behavior: scrollRef.current.style.scrollBehavior as 'smooth' | 'auto'
      });
    }
  };

  const updateScrollProgress = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const scrollableWidth = scrollWidth - clientWidth;
      const maxTranslation = scrollTrackRef.current?.clientWidth || 0;
      const progress = (scrollLeft / scrollableWidth) * maxTranslation;
      
      requestAnimationFrame(() => {
        setScrollProgress(progress);
        localStorage.setItem(NAV_SCROLL_KEY, String(scrollLeft));
      });
    }
  };

  const handleThumbDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);

    const track = scrollTrackRef.current;
    const container = scrollRef.current;

    if (!track || !container) return;

    const trackRect = track.getBoundingClientRect();
    const scrollableWidth = container.scrollWidth - container.clientWidth;

    const handleMouseMove = (e: MouseEvent) => {
      const trackWidth = trackRect.width;
      const relativeX = e.clientX - trackRect.left;
      const progress = Math.max(0, Math.min(1, relativeX / trackWidth));
      container.scrollLeft = progress * scrollableWidth;
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      let isDown = false;
      let startX: number;
      let scrollLeft: number;

      const handleDragStart = (e: MouseEvent | TouchEvent) => {
        isDown = true;
        scrollContainer.classList.add('active');
        if (e instanceof MouseEvent) {
          startX = e.pageX - scrollContainer.offsetLeft;
        } else {
          startX = e.touches[0].pageX - scrollContainer.offsetLeft;
        }
        scrollLeft = scrollContainer.scrollLeft;
      };

      const handleDragEnd = () => {
        isDown = false;
        scrollContainer.classList.remove('active');
      };

      const handleDragMove = (e: MouseEvent | TouchEvent) => {
        if (!isDown) return;
        e.preventDefault();
        let x;
        if (e instanceof MouseEvent) {
          x = e.pageX - scrollContainer.offsetLeft;
        } else {
          x = e.touches[0].pageX - scrollContainer.offsetLeft;
        }
        const walk = (x - startX) * 2;
        scrollContainer.scrollLeft = scrollLeft - walk;
      };

      scrollContainer.addEventListener('mousedown', handleDragStart);
      scrollContainer.addEventListener('touchstart', handleDragStart);
      scrollContainer.addEventListener('mouseleave', handleDragEnd);
      scrollContainer.addEventListener('mouseup', handleDragEnd);
      scrollContainer.addEventListener('touchend', handleDragEnd);
      scrollContainer.addEventListener('mousemove', handleDragMove);
      scrollContainer.addEventListener('touchmove', handleDragMove);

      const handleScrollUpdate = () => {
        handleScroll();
        checkScroll();
        updateScrollProgress();
      };

      scrollContainer.addEventListener('scroll', handleScrollUpdate);
      handleScrollUpdate();

      return () => {
        scrollContainer.removeEventListener('mousedown', handleDragStart);
        scrollContainer.removeEventListener('touchstart', handleDragStart);
        scrollContainer.removeEventListener('mouseleave', handleDragEnd);
        scrollContainer.removeEventListener('mouseup', handleDragEnd);
        scrollContainer.removeEventListener('touchend', handleDragEnd);
        scrollContainer.removeEventListener('mousemove', handleDragMove);
        scrollContainer.removeEventListener('touchmove', handleDragMove);
        scrollContainer.removeEventListener('scroll', handleScrollUpdate);
      };
    }
  }, [handleScroll]);

  useEffect(() => {
    const savedScrollPosition = localStorage.getItem(NAV_SCROLL_KEY);
    if (savedScrollPosition && scrollRef.current) {
      requestAnimationFrame(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollLeft = Number(savedScrollPosition);
          updateScrollProgress();
        }
      });
    }
  }, [location.pathname]);

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
        <div className="hidden md:flex md:items-center relative max-w-[800px] flex-col">
          <div className="flex items-center relative w-full pt-1.5"> {/* Added pt-1.5 for top padding */}
            {/* Left scroll indicator */}
            <div 
              className={cn(
                "absolute left-0 z-10 transition-opacity duration-200",
                "flex items-center h-full cursor-pointer",
                canScrollLeft ? "opacity-100" : "opacity-0 pointer-events-none"
              )}
              onClick={() => handleScrollDirection('left')}
            >
              <ChevronLeft className="w-5 h-5 text-foreground/80 animate-pulse-subtle" />
            </div>

            <div 
              ref={scrollRef}
              className="flex items-center gap-6 overflow-x-auto px-4 py-1.5 no-scrollbar 
                      snap-x snap-mandatory scroll-smooth touch-pan-x w-full"
              style={{
                maskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)',
                WebkitMaskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)',
                paddingInline: '2rem',
                scrollbarWidth: 'none', // Hide scrollbar for Firefox
              }}
            >
              {navLinks.map((link, index) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={cn(
                    "flex items-center text-sm font-medium transition-all duration-300 transform",
                    "hover:scale-105 snap-center backdrop-blur-sm rounded-lg px-4 py-2",
                    "hover:shadow-lg hover:shadow-white/5 select-none whitespace-nowrap",
                    "hover:opacity-100 hover:bg-background/60"
                  )}
                >
                  {link.icon}
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Right scroll indicator */}
            <div 
              className={cn(
                "absolute right-0 z-10 transition-opacity duration-200",
                "flex items-center h-full cursor-pointer",
                canScrollRight ? "opacity-100" : "opacity-0 pointer-events-none"
              )}
              onClick={() => handleScrollDirection('right')}
            >
              <ChevronRight className="w-5 h-5 text-foreground/80 animate-pulse-subtle" />
            </div>
          </div>

          {/* Scroll indicator */}
          <div
            ref={scrollTrackRef}
            className="relative w-24 h-1 rounded-full mx-auto my-1 cursor-pointer bg-gray-300/30 
                     border border-gray-200/20 backdrop-blur-sm px-0.5" // Changed my-2 to my-1
            onMouseDown={handleThumbDrag}
            style={{ } as React.CSSProperties}
          >
            <div
              className={cn(
                "absolute h-full bg-cancer-purple/60 rounded-full",
                "transition-transform duration-75 ease-out transform-gpu",
                isDragging ? "scale-y-150" : ""
              )}
              style={{
                width: "20%",
                transform: `translateX(${Math.min(scrollProgress, scrollTrackRef.current?.clientWidth - 20 || 0)}px)`,
                willChange: 'transform'
              }}
            />
          </div>
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
          "md:hidden overflow-y-auto transition-all duration-300 ease-in-out border-b",
          isOpen ? "max-h-[80vh] border-border" : "max-h-0 border-transparent"
        )}
      >
        <div className="container py-4 space-y-4 overflow-y-auto touch-pan-y">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="flex items-center py-3 px-2 text-sm font-medium text-muted-foreground hover:text-foreground 
                        transition-colors rounded-md hover:bg-accent"
                onClick={() => setIsOpen(false)}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-2 pt-4 border-t sticky bottom-0 bg-background/95 backdrop-blur">
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
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none; /* Hide scrollbar for Chrome, Safari, and Edge */
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
