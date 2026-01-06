
import React, { useState, useEffect, useRef } from 'react';
import { ArrowUp } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  useEffect(() => {
    if (isVisible) {
      gsap.to(buttonRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: 'power3.out',
        pointerEvents: 'auto',
        overwrite: 'auto'
      });
    } else {
      gsap.to(buttonRef.current, {
        opacity: 0,
        y: 20,
        scale: 0.8,
        duration: 0.4,
        ease: 'power3.in',
        pointerEvents: 'none',
        overwrite: 'auto'
      });
    }
  }, [isVisible]);

  const scrollToTop = () => {
    // Smooth scroll with premium easing
    gsap.to(window, {
      duration: 1.5,
      scrollTo: { y: 0 },
      ease: 'expo.inOut'
    });
    
    // Click feedback animation
    if (buttonRef.current) {
      gsap.fromTo(buttonRef.current, 
        { scale: 0.9 }, 
        { scale: 1, duration: 0.4, ease: 'elastic.out(1, 0.5)' }
      );
    }
  };

  const handleMouseEnter = () => {
    if (!buttonRef.current) return;
    
    // Button Hover
    gsap.to(buttonRef.current, {
      scale: 1.15,
      backgroundColor: '#d4af37', // Gold
      color: '#0a0a0a', // Obsidian
      borderColor: '#d4af37',
      boxShadow: '0 0 25px rgba(212, 175, 55, 0.5)',
      duration: 0.4,
      ease: 'power2.out'
    });

    // Icon Hover
    if (iconRef.current) {
      gsap.to(iconRef.current, {
        y: -3,
        duration: 0.3,
        yoyo: true,
        repeat: 1,
        ease: 'power1.inOut'
      });
    }
  };

  const handleMouseLeave = () => {
    if (!buttonRef.current) return;
    
    // Button Leave
    gsap.to(buttonRef.current, {
      scale: 1,
      backgroundColor: 'rgba(10, 10, 10, 0.6)', // Obsidian transparent
      color: '#d4af37', // Gold
      borderColor: 'rgba(212, 175, 55, 0.4)',
      boxShadow: 'none',
      duration: 0.4,
      ease: 'power2.out'
    });
    
    // Icon Reset
    if (iconRef.current) {
        gsap.to(iconRef.current, { y: 0, duration: 0.2 });
    }
  };

  return (
    <button
      ref={buttonRef}
      onClick={scrollToTop}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ opacity: 0, transform: 'translateY(20px) scale(0.8)', pointerEvents: 'none' }}
      className="fixed bottom-8 right-8 z-[90] w-12 h-12 flex items-center justify-center rounded-full border border-gold/40 bg-obsidian/60 backdrop-blur-md text-gold shadow-2xl outline-none"
      aria-label="Scroll to top"
    >
      <div ref={iconRef} className="flex items-center justify-center">
         <ArrowUp size={20} />
      </div>
    </button>
  );
};

export default ScrollToTop;
