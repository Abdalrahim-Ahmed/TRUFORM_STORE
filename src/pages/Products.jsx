import React, { useState, useMemo } from 'react';
import {
  Search,
  X,
  SlidersHorizontal,
  RotateCcw,
  ArrowUpDown,
  Droplets,
  Tag,
  Check
} from 'lucide-react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

export default function Products() {
  const [search, setSearch] = useState('');
  const [cat, setCat] = useState('all');
  const [skin, setSkin] = useState('all');
  const [concern, setConcern] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [sort, setSort] = useState('featured');
  const [mobileFilters, setMobileFilters] = useState(false);

  const categories = [
    { v: 'all', l: 'كل المنتجات' },
    { v: 'cleanser', l: 'غسول الوجه' },
    { v: 'serum', l: 'السيروم العلاجي' },
    { v: 'moisturizer', l: 'المرطبات المائية' },
    { v: 'sunscreen', l: 'واقي الشمس' },
    { v: 'treatment', l: 'علاج ومقشرات' }
  ];

  const skinTypes = [
    { v: 'all', l: 'كل أنواع البشرة' },
    { v: 'oily', l: 'بشرة دهنية' },
    { v: 'dry', l: 'بشرة جافة' },
    { v: 'combination', l: 'بشرة مختلطة' },
    { v: 'sensitive', l: 'بشرة حساسة' }
  ];

  const concerns = [
    { v: 'all', l: 'كل المشاكل' },
    { v: 'acne', l: 'حب الشباب' },
    { v: 'dryness', l: 'الجفاف والتقشر' },
    { v: 'pigmentation', l: 'التصبغات والبقع' },
    { v: 'pores', l: 'المسام واللمعان' },
    { v: 'redness', l: 'الاحمرار والتهيج' },
    { v: 'dullness', l: 'بهتان وفقدان النضارة' }
  ];

  const priceRanges = [
    { v: 'all', l: 'كل الأسعار' },
    { v: 'under-300', l: 'أقل من 300 ج.م' },
    { v: '300-350', l: '300 إلى 350 ج.م' },
    { v: 'over-350', l: 'أكثر من 350 ج.م' }
  ];

  const filtered = useMemo(() => {
    return products
      .filter((p) => {
        if (search.trim()) {
          const q = search.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q) || p.nameEn.toLowerCase().includes(q);
          const matchBenefit = p.mainBenefit.toLowerCase().includes(q);
          const matchCategory = p.categoryAr.includes(q);
          const matchIng = p.ingredients?.some((ing) => ing.name.toLowerCase().includes(q) || ing.nameAr.includes(q));
          if (!matchName && !matchBenefit && !matchCategory && !matchIng) return false;
        }
        if (cat !== 'all' && p.category !== cat) return false;
        if (skin !== 'all' && !p.skinTypes.includes(skin)) return false;
        if (concern !== 'all' && !p.concerns.includes(concern)) return false;
        if (priceRange === 'under-300' && p.price >= 300) return false;
        if (priceRange === '300-350' && (p.price < 300 || p.price > 350)) return false;
        if (priceRange === 'over-350' && p.price <= 350) return false;
        return true;
      })
      .sort((a, b) => {
        if (sort === 'rating') return b.rating - a.rating;
        if (sort === 'price-asc') return a.price - b.price;
        if (sort === 'price-desc') return b.price - a.price;
        return 0;
      });
  }, [search, cat, skin, concern, priceRange, sort]);

  const hasActive = search || cat !== 'all' || skin !== 'all' || concern !== 'all' || priceRange !== 'all';

  const reset = () => {
    setSearch('');
    setCat('all');
    setSkin('all');
    setConcern('all');
    setPriceRange('all');
    setSort('featured');
  };

  const FilterCheckbox = ({ label, active, onClick }) => (
    <button
      type="button"
      onClick={onClick}
      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors text-right ${
        active
          ? 'bg-teal-50 text-teal-800 font-bold border border-teal-200'
          : 'text-teal-700 hover:bg-teal-50/60'
      }`}
    >
      <span>{label}</span>
      <span
        className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${
          active ? 'bg-teal-700 border-teal-700 text-white' : 'border-teal-200'
        }`}
      >
        {active && <Check className="w-3 h-3 stroke-[3]" />}
      </span>
    </button>
  );

  const SidebarContent = () => (
    <div className="space-y-6">
      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-teal-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="ابحث بالاسم أو المكون..."
          className="w-full pr-10 pl-3.5 py-2.5 rounded-xl bg-white border border-teal-100 text-xs sm:text-sm text-teal-800 placeholder:text-teal-300 focus:outline-none focus:border-teal-500 shadow-2xs"
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            className="absolute left-3 top-1/2 -translate-y-1/2 p-1 text-teal-300 hover:text-teal-700"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Category Filter */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold text-teal-800">نوع المنتج</h4>
          <span className="text-[10px] text-teal-400">فئات</span>
        </div>
        <div className="space-y-1">
          {categories.map((c) => (
            <FilterCheckbox
              key={c.v}
              label={c.l}
              active={cat === c.v}
              onClick={() => setCat(c.v)}
            />
          ))}
        </div>
      </div>

      {/* Skin Type Filter */}
      <div className="space-y-2 pt-2 border-t border-teal-100">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold text-teal-800">نوع البشرة</h4>
          <span className="text-[10px] text-teal-400">تشخيص</span>
        </div>
        <div className="space-y-1">
          {skinTypes.map((st) => (
            <FilterCheckbox
              key={st.v}
              label={st.l}
              active={skin === st.v}
              onClick={() => setSkin(st.v)}
            />
          ))}
        </div>
      </div>

      {/* Concern Filter */}
      <div className="space-y-2 pt-2 border-t border-teal-100">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold text-teal-800">مشكلة البشرة</h4>
          <span className="text-[10px] text-teal-400">أهداف</span>
        </div>
        <div className="space-y-1">
          {concerns.map((cn) => (
            <FilterCheckbox
              key={cn.v}
              label={cn.l}
              active={concern === cn.v}
              onClick={() => setConcern(cn.v)}
            />
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="space-y-2 pt-2 border-t border-teal-100">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold text-teal-800">نطاق السعر</h4>
          <span className="text-[10px] text-teal-400">ج.م</span>
        </div>
        <div className="space-y-1">
          {priceRanges.map((pr) => (
            <FilterCheckbox
              key={pr.v}
              label={pr.l}
              active={priceRange === pr.v}
              onClick={() => setPriceRange(pr.v)}
            />
          ))}
        </div>
      </div>

      {hasActive && (
        <button
          onClick={reset}
          className="w-full flex items-center justify-center gap-1.5 text-xs font-bold text-rose-600 hover:text-rose-700 py-2.5 rounded-xl border border-rose-200 bg-rose-50/50 hover:bg-rose-50 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>إعادة ضبط كل الفلاتر</span>
        </button>
      )}
    </div>
  );

  return (
    <div className="pb-20 sm:pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-teal-50 via-white to-teal-50 py-10 sm:py-12 px-4 sm:px-6 lg:px-8 border-b border-teal-100">
        <div className="max-w-7xl mx-auto space-y-4">
          <div>
            <span className="text-xs font-bold text-teal-700 bg-teal-100 px-3 py-1 rounded-full uppercase tracking-wider">
              متجر TRUFORM الرسمي
            </span>
            <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-teal-800 mt-2">
              منتجات العناية الطبيعية بالبشرة
            </h1>
            <p className="text-teal-600 text-xs sm:text-sm mt-1 max-w-xl leading-relaxed">
              اكتشف تركيباتنا المبتكرة، صُممت بمكونات موثقة لتمنح بشرتك النضارة والحماية مع الشحن السريع لكافة أنحاء مصر.
            </p>
          </div>

          {/* Top Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none pt-2">
            {categories.map((c) => (
              <button
                key={c.v}
                onClick={() => setCat(c.v)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  cat === c.v
                    ? 'bg-teal-700 text-white shadow-teal'
                    : 'bg-white border border-teal-200 text-teal-700 hover:bg-teal-50'
                }`}
              >
                {c.l}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Catalog Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Desktop Sidebar (56w) */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 bg-white p-5 rounded-2xl border border-teal-100 shadow-soft">
              <SidebarContent />
            </div>
          </aside>

          {/* Products Content */}
          <div className="flex-1 min-w-0 space-y-6">
            {/* Top Toolbar */}
            <div className="flex items-center justify-between gap-3 flex-wrap bg-white p-3.5 rounded-2xl border border-teal-100 shadow-2xs">
              <div className="flex items-center gap-2">
                <span className="text-xs text-teal-600">
                  عرض <strong className="text-teal-800 text-sm font-extrabold">{filtered.length}</strong> من{' '}
                  <strong className="text-teal-800 text-sm font-extrabold">{products.length}</strong> منتج
                </span>
                {hasActive && (
                  <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-800 font-bold">
                    فلترة نشطة
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                {/* Mobile Filter Toggle */}
                <button
                  onClick={() => setMobileFilters(!mobileFilters)}
                  className="lg:hidden flex items-center gap-1.5 px-3 py-2 rounded-xl bg-teal-50 border border-teal-200 text-xs font-bold text-teal-800 hover:bg-teal-100 transition-colors"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>تصفية ({hasActive ? 'نشطة' : 'كل'})</span>
                </button>

                {/* Sort Dropdown */}
                <div className="flex items-center gap-1.5 text-xs">
                  <ArrowUpDown className="w-3.5 h-3.5 text-teal-500" />
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="py-2 px-3 rounded-xl bg-teal-50/60 border border-teal-100 text-xs font-bold text-teal-800 focus:outline-none focus:border-teal-500"
                  >
                    <option value="featured">الترتيب الافتراضي</option>
                    <option value="rating">الأعلى تقييماً</option>
                    <option value="price-asc">السعر: من الأقل للأعلى</option>
                    <option value="price-desc">السعر: من الأعلى للأقل</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Mobile Filters Accordion Panel */}
            {mobileFilters && (
              <div className="lg:hidden bg-white rounded-2xl p-5 border border-teal-200 shadow-soft animate-fadeIn">
                <div className="flex items-center justify-between pb-3 border-b border-teal-100 mb-4">
                  <h3 className="font-bold text-sm text-teal-800 flex items-center gap-2">
                    <SlidersHorizontal className="w-4 h-4 text-teal-600" />
                    تصفية المنتجات
                  </h3>
                  <button
                    onClick={() => setMobileFilters(false)}
                    className="p-1 rounded-lg text-teal-400 hover:text-teal-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <SidebarContent />
              </div>
            )}

            {/* Products Grid */}
            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-12 text-center border border-teal-100 shadow-soft space-y-4">
                <div className="w-16 h-16 rounded-full bg-teal-50 flex items-center justify-center mx-auto text-teal-300">
                  <Search className="w-8 h-8 stroke-[1.5]" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-lg text-teal-800">لم نجد أي منتج يطابق معايير البحث</h3>
                  <p className="text-xs text-teal-500 max-w-sm mx-auto leading-relaxed">
                    جرب إزالة بعض الفلاتر أو استخدام كلمات بحث مختلفة لاكتشاف مجموعتنا المتكاملة.
                  </p>
                </div>
                <button
                  onClick={reset}
                  className="px-6 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs shadow-teal transition-colors"
                >
                  إعادة ضبط الفلاتر
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
