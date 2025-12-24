
import React, { useState, useEffect, useRef } from 'react';
import { ArrowUp } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
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
        duration: 0.5,
        ease: 'back.out(1.7)',
        pointerEvents: 'auto'
      });
    } else {
      gsap.to(buttonRef.current, {
        opacity: 0,
        y: 20,
        scale: 0.8,
        duration: 0.4,
        ease: 'power2.in',
        pointerEvents: 'none'
      });
    }
  }, [isVisible]);

  const scrollToTop = () => {
    // Animate the scroll position using GSAP ScrollToPlugin
    gsap.to(window, {
      duration: 1.5,
      scrollTo: { y: 0 },
      ease: 'power4.inOut'
    });
    
    // Aesthetic click feedback
    gsap.to(buttonRef.current, {
      y: -10,
      duration: 0.2,
      yoyo: true,
      repeat: 1
    });
  };

  return (
    <button
      ref={buttonRef}
      onClick={scrollToTop}
      style={{ opacity: 0, transform: 'translateY(20px) scale(0.8)', pointerEvents: 'none' }}
      className="fixed bottom-8 right-8 z-[90] w-12 h-12 flex items-center justify-center rounded-full border border-gold/40 bg-obsidian/60 backdrop-blur-md text-gold hover:bg-gold hover:text-obsidian transition-colors duration-500 group shadow-2xl"
      aria-label="Scroll to top"
    >
      <ArrowUp size={20} className="group-hover:-translate-y-1 transition-transform duration-300" />
    </button>
  );
};

export default ScrollToTop;
