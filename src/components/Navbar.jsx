import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, Heart, Menu, X, Droplets, CalendarCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { setIsSearchOpen, setIsCartOpen, cartCount, wishlistCount, routine } = useApp();
  const location = useLocation();

  const routineItemsCount = (routine?.morning?.length || 0) + (routine?.night?.length || 0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { to: '/',         label: 'الرئيسية',   end: true },
    { to: '/products', label: 'كل المنتجات' },
    { to: '/quiz',     label: 'اختبار البشرة' },
    { to: '/my-routine', label: 'روتيني اليومي' },
    { to: '/learn',    label: 'تعلم' },
    { to: '/reviews',  label: 'تجاربكم' },
    { to: '/about',    label: 'عنا' },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-soft border-b border-teal-100'
            : 'bg-white border-b border-teal-50'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-[72px]">

            {/* Right: Brand Name */}
            <Link to="/" className="flex items-center gap-2 flex-shrink-0 group">
              <img
                src="/truform-mark.png"
                alt=""
                aria-hidden="true"
                className="w-8 h-8 sm:w-9 sm:h-9 object-contain transition-transform group-hover:scale-105"
              />
              <span className="flex flex-col leading-none">
                <span className="font-latin text-lg sm:text-xl font-extrabold tracking-widest text-teal-800 transition-colors group-hover:text-teal-600">
                  TRUFORM
                </span>
                <span className="hidden sm:block mt-1 text-[8px] font-semibold tracking-wider text-teal-500">
                  NATURAL SKIN &amp; HAIR CARE
                </span>
              </span>
            </Link>

            {/* Center: Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.end}
                  className={({ isActive }) =>
                    `px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? 'text-teal-800 bg-teal-50 font-bold'
                        : 'text-teal-600 hover:text-teal-800 hover:bg-teal-50/60'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            {/* Left: Actions (Search, Wishlist, Cart, Quiz CTA) */}
            <div className="flex items-center gap-1 sm:gap-1.5">
              {/* Search */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 sm:p-2.5 rounded-xl text-teal-600 hover:text-teal-800 hover:bg-teal-50 transition-colors"
                aria-label="بحث في المنتجات"
                title="بحث"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist */}
              <Link
                to="/wishlist"
                className="p-2 sm:p-2.5 rounded-xl text-teal-600 hover:text-rose-600 hover:bg-rose-50/60 transition-colors relative"
                aria-label="قائمة المفضلة"
                title="المفضلة"
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-rose-500 text-white rounded-full text-[9px] flex items-center justify-center font-bold px-1 shadow-2xs">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Shopping Cart Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="p-2 sm:p-2.5 rounded-xl text-teal-600 hover:text-teal-800 hover:bg-teal-50 transition-colors relative"
                aria-label="سلة المشتريات"
                title="سلة المشتريات"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-teal-700 text-white rounded-full text-[9px] flex items-center justify-center font-bold px-1 shadow-teal animate-fadeIn">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Quiz CTA - Desktop */}
              <Link
                to="/quiz"
                className="hidden xl:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold transition-colors shadow-teal"
              >
                <Droplets className="w-3.5 h-3.5" />
                <span>اختبار البشرة</span>
              </Link>

              {/* Mobile toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 rounded-xl text-teal-600 hover:text-teal-800 hover:bg-teal-50 transition-colors"
                aria-label="القائمة"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-teal-100 bg-white px-4 pt-3 pb-5 space-y-1 animate-fadeIn shadow-soft-lg">
            {navLinks.map((link) => {
              const isActive = link.end
                ? location.pathname === link.to
                : location.pathname.startsWith(link.to);
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-teal-700 text-white font-semibold'
                      : 'text-teal-800 hover:bg-teal-50'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.to === '/my-routine' && routineItemsCount > 0 && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 font-bold">
                      {routineItemsCount} خطوات
                    </span>
                  )}
                </Link>
              );
            })}
            <div className="pt-3 border-t border-teal-50 flex gap-2">
              <button
                onClick={() => {
                  setMobileOpen(false);
                  setIsCartOpen(true);
                }}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-teal-50 text-teal-800 font-bold text-xs border border-teal-200"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>السلة ({cartCount})</span>
              </button>
              <Link
                to="/quiz"
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-teal-700 text-white font-bold text-xs"
              >
                <Droplets className="w-4 h-4" />
                <span>اختبار البشرة</span>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Bottom Navigation */}
      <nav className="sm:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-teal-100 shadow-soft-lg">
        <div className="flex items-center justify-around py-2 px-2">
          {[
            { to: '/', icon: '🏠', label: 'الرئيسية' },
            { to: '/products', icon: '🧴', label: 'المنتجات' },
            { to: '/quiz', icon: '💧', label: 'الاختبار' },
            { to: '/wishlist', icon: '🤍', label: 'المفضلة', badge: wishlistCount },
            { to: '/my-routine', icon: '📋', label: 'روتيني' },
          ].map(({ to, icon, label, badge }) => {
            const isActive = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`flex flex-col items-center gap-0.5 text-[10px] font-medium transition-colors relative ${
                  isActive ? 'text-teal-800 font-bold' : 'text-teal-500'
                }`}
              >
                <span className={`text-lg leading-none p-1 rounded-xl relative ${isActive ? 'bg-teal-50' : ''}`}>
                  {icon}
                  {badge > 0 && (
                    <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-rose-500 text-white rounded-full text-[8px] flex items-center justify-center font-bold">
                      {badge}
                    </span>
                  )}
                </span>
                <span>{label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
