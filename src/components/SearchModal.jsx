import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Sparkles, BookOpen, ArrowLeft, ShoppingBag } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { products } from '../data/products';
import { articles } from '../data/articles';

export default function SearchModal() {
  const { isSearchOpen, setIsSearchOpen, addToCart } = useApp();
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isSearchOpen]);

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const normalizedQuery = query.trim().toLowerCase();

  const filteredProducts = normalizedQuery
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(normalizedQuery) ||
          p.nameEn.toLowerCase().includes(normalizedQuery) ||
          p.categoryAr.includes(normalizedQuery) ||
          p.mainBenefit.toLowerCase().includes(normalizedQuery) ||
          p.ingredients?.some((ing) => ing.name.toLowerCase().includes(normalizedQuery) || ing.nameAr.includes(normalizedQuery))
      )
    : [];

  const filteredArticles = normalizedQuery
    ? articles.filter(
        (a) =>
          a.title.toLowerCase().includes(normalizedQuery) ||
          a.category.includes(normalizedQuery) ||
          a.summary.toLowerCase().includes(normalizedQuery)
      )
    : [];

  const handleSelectProduct = (id) => {
    setIsSearchOpen(false);
    navigate(`/products/${id}`);
  };

  const handleSelectArticle = () => {
    setIsSearchOpen(false);
    navigate('/learn');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 md:pt-24 px-4 bg-teal-900/60 backdrop-blur-sm animate-fadeIn" dir="rtl">
      {/* Backdrop click */}
      <div className="fixed inset-0" onClick={() => setIsSearchOpen(false)} />

      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-soft-xl border border-teal-100 overflow-hidden z-10 flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-teal-100 bg-teal-50/50">
          <Search className="w-5 h-5 text-teal-600" />
          <input
            ref={inputRef}
            type="text"
            placeholder="ابحث عن منتج، مكون (مثل Niacinamide أو سيراميد)، أو مقال..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent border-none text-teal-800 placeholder:text-teal-400 focus:outline-none text-base md:text-lg font-medium"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-teal-400 hover:text-teal-700 hover:bg-teal-100"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="text-xs px-2.5 py-1 rounded-lg bg-teal-100 text-teal-700 hover:bg-teal-200 transition-colors font-medium"
          >
            ESC إغلاق
          </button>
        </div>

        {/* Results Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {!normalizedQuery && (
            <div className="text-center py-8 space-y-3">
              <Sparkles className="w-8 h-8 text-teal-500 mx-auto opacity-70" />
              <p className="text-teal-600 text-sm">
                جرّب البحث عن: <span className="font-semibold text-teal-800">"غسول"</span>،{' '}
                <span className="font-semibold text-teal-800">"نياسيناميد"</span>،{' '}
                <span className="font-semibold text-teal-800">"واقي شمس"</span>، أو{' '}
                <span className="font-semibold text-teal-800">"حب الشباب"</span>
              </p>
            </div>
          )}

          {normalizedQuery && filteredProducts.length === 0 && filteredArticles.length === 0 && (
            <div className="text-center py-10 space-y-2">
              <p className="text-teal-800 font-medium">لم نجد نتائج مطابقة لـ "{query}"</p>
              <p className="text-xs text-teal-500">
                يمكنك تجربة كتابة اسم المكون بالإنجليزية مثل (Cica, BHA, Niacinamide) أو تصفح قائمة المنتجات بالكامل.
              </p>
            </div>
          )}

          {/* Products List */}
          {filteredProducts.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-semibold text-teal-500 uppercase tracking-wider">
                <span>المنتجات المطابقة ({filteredProducts.length})</span>
                <span>اضغط للمشاهدة</span>
              </div>
              <div className="space-y-2">
                {filteredProducts.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => handleSelectProduct(p.id)}
                    className="flex items-center gap-4 p-3 rounded-2xl bg-white hover:bg-teal-50 border border-teal-100 hover:border-teal-300 cursor-pointer transition-all group shadow-2xs"
                  >
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-14 h-14 object-cover rounded-xl border border-teal-100"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 font-bold">
                          {p.categoryAr}
                        </span>
                        <span className="text-xs text-teal-400 font-latin">{p.nameEn}</span>
                      </div>
                      <h4 className="font-bold text-sm text-teal-800 group-hover:text-teal-600 transition-colors truncate mt-0.5">
                        {p.name}
                      </h4>
                      <p className="text-xs text-teal-600 truncate mt-0.5">{p.mainBenefit}</p>
                    </div>
                    <div className="text-left flex flex-col items-end gap-1 flex-shrink-0">
                      <span className="font-extrabold text-sm text-teal-800">{p.price} ج.م</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(p, 1, 'الحجم القياسي', true);
                          setIsSearchOpen(false);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-teal-700 hover:bg-teal-800 text-white text-[11px] font-bold shadow-teal flex items-center gap-1"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        <span>شراء</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Articles List */}
          {filteredArticles.length > 0 && (
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between text-xs font-semibold text-teal-500 uppercase tracking-wider">
                <span>مقالات توعوية ذات صلة ({filteredArticles.length})</span>
              </div>
              <div className="space-y-2">
                {filteredArticles.map((a) => (
                  <div
                    key={a.id}
                    onClick={handleSelectArticle}
                    className="flex items-center justify-between p-3.5 rounded-2xl bg-teal-50/50 hover:bg-teal-50 border border-teal-100 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-teal-100 text-teal-700">
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-bold text-xs sm:text-sm text-teal-800">{a.title}</h4>
                        <p className="text-[11px] text-teal-500 line-clamp-1">{a.summary}</p>
                      </div>
                    </div>
                    <ArrowLeft className="w-4 h-4 text-teal-400 flex-shrink-0 mr-2" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
