/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Menu as MenuIcon, 
  X, 
  MapPin, 
  Phone, 
  Clock, 
  ChevronRight, 
  Instagram, 
  Facebook, 
  ExternalLink,
  ShoppingBag,
  Utensils,
  Flame,
  Award
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Constants & Data ---

const NAV_LINKS = [
  { name: 'Menu', href: '#menu' },
  { name: 'About', href: '#about' },
  { name: 'Hours', href: '#hours' },
  { name: 'Order Now', href: '#order', primary: true },
];

interface MenuItem {
  name: string;
  price: string;
  description?: string;
  sub?: string;
}

interface MenuCategory {
  id: string;
  title: string;
  description?: string;
  items: MenuItem[];
}

const MENU_CATEGORIES: MenuCategory[] = [
  {
    id: 'rice-platters',
    title: 'Rice Platters',
    description: 'All platters come with 2 sides: salad, fries, hummus, or chopped pita',
    items: [
      { name: 'Chicken Over Rice', price: '$14.99' },
      { name: 'Lamb Over Rice', price: '$14.99' },
      { name: 'Mix Over Rice', price: '$14.99', sub: 'Chicken + Lamb' },
      { name: 'Falafel Over Rice', price: '$14.99' },
    ],
  },
  {
    id: 'gyro',
    title: 'Gyro',
    items: [
      { name: 'Chicken Gyro', price: '' },
      { name: 'Lamb Gyro', price: '' },
      { name: 'Mix Meat Gyro', price: '' },
      { name: 'Falafel Gyro Combo', price: '' },
    ],
  },
  {
    id: 'sandwiches',
    title: 'Sandwiches & Heroes',
    items: [
      { name: 'Chopped Cheese on Hero', price: '$12.99', description: '10oz fresh ground beef, grilled onions, peppers, 2 cheeses, signature Munchies sauce' },
      { name: 'Crispy Chicken Sandwich', price: '' },
      { name: 'Philly Cheese Steak', price: '' },
    ],
  },
  {
    id: 'wings',
    title: 'Authentic Wings',
    description: '20+ bold flavors available',
    items: [
      { name: 'Boneless Wings', price: '$8.99' },
      { name: 'Buffalo Wings', price: '' },
      { name: 'Honey Garlic Wings', price: '' },
      { name: 'Mango Habanero Wings', price: '' },
      { name: 'Jamaican Jerk Wings', price: '' },
    ],
  },
  {
    id: 'tenders-wraps',
    title: 'Tenders & Wraps',
    items: [
      { name: 'Freshly Hand Breaded Chicken Tenders', price: '' },
      { name: 'Chicken Wrap', price: '' },
      { name: 'Lamb Wrap', price: '' },
    ],
  },
  {
    id: 'seafood',
    title: 'Seafood',
    items: [
      { name: 'Fried Fish', price: '' },
      { name: 'Fish Over Rice', price: '' },
      { name: 'Fish & Chips', price: '' },
      { name: '2pc Fish + 6pc Hand Breaded Shrimp', price: '' },
    ],
  },
  {
    id: 'sides',
    title: 'Sides',
    items: [
      { name: 'Mozzarella Sticks', price: '$6.49' },
      { name: 'Seasoned Fries', price: '' },
      { name: 'Fresh Hummus', price: '' },
      { name: 'Chopped Pita', price: '' },
      { name: 'Breaded Okra', price: '' },
    ],
  },
];

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white border-b-2 md:border-b-4 border-munchies-blue py-2' : 'bg-transparent pt-12 md:pt-14 pb-8'
      }`}
      id="main-nav"
    >
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center md:items-end">
        <a href="#" className="flex flex-col group">
          <span className={`font-black tracking-tighter leading-[0.8] font-display transition-all duration-500 uppercase ${
            isScrolled ? 'text-3xl md:text-4xl text-munchies-blue' : 'text-5xl md:text-7xl text-white drop-shadow-2xl'
          }`}>
            THE<br/>MUNCHIES
          </span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 pb-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`font-black uppercase tracking-widest text-xs transition-all ${
                link.primary 
                  ? 'bg-munchies-orange text-white px-8 py-3 skew-x-[-12deg] hover:bg-munchies-blue shadow-lg' 
                  : `${isScrolled ? 'text-gray-900' : 'text-white/90 underline decoration-2 decoration-munchies-orange underline-offset-4'}`
              }`}
            >
              <span className={link.primary ? 'skew-x-[12deg] block' : ''}>{link.name}</span>
            </a>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden pr-4"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Menu"
          id="mobile-menu-btn"
        >
          {isMobileMenuOpen ? (
            <X size={32} className={isScrolled ? 'text-gray-900' : 'text-white drop-shadow-lg'} />
          ) : (
            <MenuIcon size={32} className={isScrolled ? 'text-gray-900' : 'text-white drop-shadow-lg'} />
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute top-full left-0 w-full bg-white shadow-2xl md:hidden overflow-hidden"
            id="mobile-nav-overlay"
          >
            {/* Seamless Gradient Integration */}
            <div className="h-4 bg-gradient-to-b from-black/5 to-transparent"></div>
            
            <div className="p-6 flex flex-col gap-4">
              {NAV_LINKS.map((link, idx) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-lg font-black uppercase tracking-widest p-4 transition-all active:scale-95 ${
                    link.primary 
                      ? 'bg-munchies-orange text-white text-center shadow-lg skew-x-[-4deg]' 
                      : 'text-gray-900 border-b-2 border-gray-50 flex justify-between items-center'
                  }`}
                >
                  <span className={link.primary ? 'skew-x-[4deg]' : ''}>{link.name}</span>
                  {!link.primary && <ChevronRight size={18} className="text-munchies-orange" />}
                </motion.a>
              ))}
              
              <div className="mt-4 pt-6 border-t border-gray-100 flex flex-col gap-2">
                <p className="text-[10px] font-black uppercase text-munchies-blue tracking-[0.2em]">848 Nostrand Ave, Brooklyn</p>
                <p className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em]">Open Until 3:45 AM / 4:45 AM</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const MenuCard = ({ category }: { category: MenuCategory, key?: string | number }) => (
  <div className="bg-white p-2 transition-all group" id={`menu-cat-${category.id}`}>
    <div className="flex justify-between items-end mb-4 border-b-4 border-munchies-orange pb-2">
      <h3 className="text-2xl font-black text-munchies-blue uppercase tracking-tighter font-display">{category.title}</h3>
      {category.id === 'rice-platters' && <span className="font-black text-gray-400 text-sm">$14.99</span>}
    </div>
    {category.description && (
      <p className="text-[10px] uppercase font-black text-gray-400 mb-4 tracking-widest">{category.description}</p>
    )}
    <div className="space-y-4">
      {category.items.map((item, idx) => (
        <div key={idx} className="flex flex-col gap-0.5 group/item">
          <div className="flex justify-between items-baseline gap-4">
            <span className="font-black text-gray-900 text-lg group-hover/item:text-munchies-blue transition-colors uppercase tracking-tight">{item.name}</span>
            {item.price && <span className="font-black text-munchies-orange whitespace-nowrap text-lg italic">{item.price}</span>}
          </div>
          {item.description && (
            <p className="text-xs text-slate-500 leading-tight font-medium italic">{item.description}</p>
          )}
        </div>
      ))}
    </div>
  </div>
);

export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-blue-100 selection:text-blue-600 overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden border-4 md:border-[16px] border-munchies-blue mx-2 md:mx-4 mt-2 md:mt-4" id="hero">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1561758033-d89a9ad46330?auto=format&fit=crop&q=80&w=2070" 
            alt="Delicious street food" 
            className="w-full h-full object-cover grayscale brightness-50"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-munchies-blue/30 mix-blend-multiply"></div>
        </div>

        <div className="container mx-auto px-4 md:px-8 relative z-10 pt-44 pb-16 md:pt-48 md:pb-24">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex flex-wrap items-center gap-3 mb-6 md:mb-8">
                <span className="bg-munchies-orange text-white px-3 md:px-5 py-1 md:py-1.5 font-black text-[10px] md:text-sm uppercase tracking-widest skew-x-[-12deg] shadow-xl">
                  Authentic Halal
                </span>
                <span className="text-white font-black text-xs md:text-xl tracking-tighter uppercase drop-shadow-lg">
                  Brooklyn, NY
                </span>
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-[120px] font-black text-white leading-[0.8] tracking-tighter mb-8 md:mb-12 font-display uppercase drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">
                BIG<br />PORTIONS.<br />
                <span className="text-munchies-orange italic">BOLD</span> FLAVORS.
              </h1>
              
              <div className="flex flex-col sm:flex-row gap-4 md:gap-6" id="order">
                <a 
                  href="https://www.doordash.com/store/the-munchies-brooklyn-22977770/12698324/" 
                  className="bg-black text-white px-6 md:px-12 py-4 md:py-6 font-black text-base md:text-xl text-center hover:bg-munchies-orange transition-all flex items-center justify-center gap-3 border-b-4 md:border-b-8 border-munchies-blue"
                >
                  <ShoppingBag className="w-5 h-5 md:w-7 md:h-7" />
                  ORDER ONLINE <span className="text-munchies-orange">→</span>
                </a>
                <div className="flex gap-2">
                   <div className="bg-white p-3 md:p-4 border-2 border-munchies-blue flex flex-col justify-center min-w-[140px] md:min-w-[180px]">
                     <p className="text-[8px] md:text-[10px] font-black uppercase text-munchies-blue tracking-widest">Late Night</p>
                     <p className="text-[9px] md:text-xs font-bold text-gray-900 leading-tight">SUN-THU: TILL 3:45 AM</p>
                     <p className="text-[9px] md:text-xs font-bold text-gray-900 leading-tight">FRI-SAT: TILL 4:45 AM</p>
                   </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 md:py-24 bg-white border-y-8 md:border-y-[16px] border-munchies-orange mx-2 md:mx-4 my-4 md:my-8" id="about">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
            <div className="relative order-2 lg:order-1">
              <img 
                src="https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&q=80&w=1444" 
                alt="Kitchen prep" 
                className="shadow-[12px_12px_0_0_#0033A0] md:shadow-[40px_40px_0_0_#0033A0] grayscale brightness-75 hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="order-1 lg:order-2">
              <div className="flex items-center gap-3 mb-6">
                <span className="bg-munchies-blue text-white px-4 py-1 font-black tracking-widest text-[10px] md:text-xs uppercase skew-x-[-12deg]">The Story</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 md:mb-8 tracking-tighter leading-none font-display">
                AUTHENTIC <br /><span className="text-munchies-blue underline decoration-4 md:decoration-8 decoration-munchies-orange">BROOKLYN</span> <br />SOUL.
              </h2>
              <div className="space-y-4 md:space-y-6 text-gray-800 text-lg md:text-xl leading-snug font-bold italic">
                <p>
                  Known for <span className="text-munchies-orange">huge portions</span> and bold flavors. We serve the heart of Crown Heights with fresh, hand-made food every single night.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 pt-6 md:pt-8">
                  <div className="border-l-4 md:border-l-8 border-munchies-blue pl-4 md:pl-6">
                    <h4 className="font-black text-munchies-blue mb-1 md:mb-2 text-xl md:text-2xl uppercase tracking-tighter">PROPER PORTIONS</h4>
                    <p className="text-xs md:text-sm font-medium not-italic text-slate-500">You'll never leave hungry. We pile the rice high and the meat higher.</p>
                  </div>
                  <div className="border-l-4 md:border-l-8 border-munchies-orange pl-4 md:pl-6">
                    <h4 className="font-black text-munchies-orange mb-1 md:mb-2 text-xl md:text-2xl uppercase tracking-tighter">ALWAYS FRESH</h4>
                    <p className="text-xs md:text-sm font-medium not-italic text-slate-500">Every platter and wing is made to order using 100% Halal ingredients.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section className="py-16 md:py-24 bg-white border-y-8 md:border-y-[16px] border-munchies-blue mx-2 md:mx-4" id="menu">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 border-b-4 md:border-b-8 border-gray-900 pb-6 md:pb-8">
            <h2 className="text-4xl md:text-9xl font-black text-gray-900 tracking-tighter font-display uppercase leading-none mb-4 md:mb-0">THE<br/>MENU</h2>
            <div className="max-w-md md:text-right">
              <p className="text-munchies-blue font-black uppercase tracking-widest text-[10px] md:text-xs mb-2">Order individual items or combos</p>
              <p className="text-gray-500 font-bold italic leading-tight text-sm md:text-base">
                All rice platters include your choice of 2 signature sides. Serving the best Halal in Crown Heights since day one.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 md:gap-x-12 gap-y-12 md:gap-y-16">
            {MENU_CATEGORIES.map((cat) => (
              <MenuCard key={cat.id} category={cat} />
            ))}
            
            {/* Special Categories Small Cards */}
            <div className="flex flex-col gap-12 border-l-4 border-slate-100 pl-8">
               <div className="group">
                  <h3 className="text-2xl font-black mb-4 text-munchies-blue uppercase tracking-tight font-display border-b-2 border-munchies-blue pb-1">
                    Salads
                  </h3>
                  <div className="space-y-3 font-bold uppercase tracking-tight italic">
                    <div className="flex justify-between border-b border-gray-100 pb-1">
                       <span>Halal Chicken Salad</span>
                    </div>
                    <div className="flex justify-between">
                       <span>Fresh Garden Salad</span>
                    </div>
                  </div>
               </div>
               <div className="group">
                  <h3 className="text-2xl font-black mb-4 text-munchies-orange uppercase tracking-tight font-display border-b-2 border-munchies-orange pb-1">
                    Desserts
                  </h3>
                  <div className="space-y-3 font-bold uppercase tracking-tight italic">
                    <div className="flex justify-between border-b border-gray-100 pb-1">
                       <span>Triple Layer Carrot Cake</span>
                    </div>
                    <div className="flex justify-between">
                       <span>NYC Cheesecake</span>
                    </div>
                  </div>
               </div>
               <div className="bg-munchies-blue p-6 text-white skew-x-[-4deg]">
                 <p className="text-[10px] font-black uppercase tracking-widest mb-1">Combos</p>
                 <p className="text-lg font-black italic">All combos include a fresh soda!</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Info & Location Section */}
      <section className="py-16 md:py-24 border-x-4 md:border-x-[16px] border-munchies-blue mx-2 md:mx-4" id="hours">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-munchies-blue p-8 md:p-12 text-white relative">
               <h3 className="text-3xl md:text-4xl font-black mb-8 md:mb-10 tracking-tighter uppercase font-display border-b-4 border-munchies-orange inline-block pb-1">Hours</h3>
               <div className="space-y-4 md:space-y-6">
                  <div className="flex justify-between items-center border-b border-white/20 pb-4">
                    <span className="font-black uppercase tracking-widest text-[10px] opacity-70">Mon – Thu</span>
                    <span className="font-black text-2xl md:text-3xl tracking-tighter">9AM – 3:45 AM</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/20 pb-4 text-munchies-orange">
                    <span className="font-black uppercase tracking-widest text-[10px]">Fri – Sat</span>
                    <span className="font-black text-2xl md:text-3xl tracking-tighter">9AM – 4:45 AM</span>
                  </div>
                  <div className="flex justify-between items-center pb-4">
                    <span className="font-black uppercase tracking-widest text-[10px] opacity-70">Sunday</span>
                    <span className="font-black text-2xl md:text-3xl tracking-tighter">9AM – 3:45 AM</span>
                  </div>
               </div>
               <div className="mt-12 md:mt-16 border-t-4 md:border-t-8 border-munchies-orange pt-6 md:pt-8">
                  <p className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] mb-3 md:mb-4">LATE NIGHT PICKUP</p>
                  <p className="text-3xl md:text-5xl font-black font-display tracking-tighter text-munchies-orange">(718) 869-3244</p>
               </div>
            </div>

            <div className="flex flex-col gap-8">
               <div className="bg-slate-50 border-4 border-munchies-blue p-8 md:p-12 flex-1 relative">
                  <h3 className="text-3xl md:text-4xl font-black mb-6 md:mb-8 tracking-tighter text-gray-900 uppercase font-display border-b-4 border-munchies-blue inline-block pb-1">Location</h3>
                  <p className="text-xl md:text-2xl font-black text-munchies-blue mb-8 md:mb-10 leading-tight">
                    848 Nostrand Ave,<br /> Brooklyn, NY 11225
                  </p>
                  <a 
                    href="https://www.google.com/maps/search/848+Nostrand+Ave,+Brooklyn,+NY+11225" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-black text-white px-6 md:px-8 py-4 font-black uppercase tracking-widest text-xs md:text-sm flex items-center justify-center gap-4 hover:bg-munchies-blue hover:translate-y-[-4px] transition-all"
                  >
                    Get Directions <span className="text-munchies-orange text-xl">→</span>
                  </a>
               </div>
               
               <div className="grid grid-cols-3 gap-3 md:gap-4">
                   <a href="#" className="bg-munchies-blue h-20 md:h-24 flex items-center justify-center text-white hover:bg-munchies-orange transition-all skew-x-[-12deg]">
                      <Instagram size={28} className="skew-x-[12deg] md:w-[36px] md:h-[36px]" />
                   </a>
                   <a href="#" className="bg-black h-20 md:h-24 flex items-center justify-center text-white hover:bg-munchies-orange transition-all skew-x-[-12deg]">
                      <Facebook size={28} className="skew-x-[12deg] md:w-[36px] md:h-[36px]" />
                   </a>
                   <a href="#" className="bg-munchies-orange h-20 md:h-24 flex items-center justify-center text-white hover:bg-munchies-blue transition-all skew-x-[-12deg]">
                      <ExternalLink size={28} className="skew-x-[12deg] md:w-[36px] md:h-[36px]" />
                   </a>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-12 md:py-20 text-white border-t-4 md:border-t-[16px] border-munchies-blue">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 md:gap-12">
            <div className="text-left">
              <span className="text-4xl sm:text-5xl md:text-[80px] font-black tracking-tighter leading-none font-display text-white transition-all uppercase">
                THE<br/>MUNCHIES
              </span>
              <p className="text-munchies-orange font-black uppercase tracking-widest text-[10px] mt-4 italic">
                Authentic Brooklyn Soul • 100% Halal
              </p>
            </div>
            
            <div className="flex flex-col items-start md:items-end gap-4 md:gap-6 md:text-right">
               <div className="flex flex-wrap gap-4 md:gap-8 font-black uppercase tracking-[0.2em] text-[10px]">
                 <a href="#menu" className="hover:text-munchies-orange transition-colors underline decoration-2 underline-offset-4">Menu</a>
                 <a href="#about" className="hover:text-munchies-orange transition-colors underline decoration-2 underline-offset-4">About</a>
                 <a href="#hours" className="hover:text-munchies-orange transition-colors underline decoration-2 underline-offset-4">Hours</a>
               </div>
               <p className="max-w-xs text-gray-500 font-bold text-[10px] md:text-sm">
                 The ultimate destination for Halal street food in the heart of Crown Heights.
               </p>
            </div>
          </div>
          
          <div className="mt-12 md:mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-gray-500 text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] text-center">
              © 2026 THE MUNCHIES BROOKLYN • NY
            </p>
            <div className="flex gap-4 items-center">
               <span className="bg-white text-black text-[10px] font-black px-3 py-1 uppercase tracking-widest skew-x-[-12deg]">Brooklyn Born</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
