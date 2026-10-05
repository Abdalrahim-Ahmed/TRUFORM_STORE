import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingBag, Plus, Check, Eye, Heart } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function ProductCard({ product }) {
  const { addProductToRoutine, routine, addToCart, toggleWishlist, isInWishlist } = useApp();

  const isAlreadyInRoutine =
    routine?.morning?.some((i) => i.productId === product.id) ||
    routine?.night?.some((i) => i.productId === product.id);

  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1, 'الحجم القياسي', true);
  };

  const handleAddToRoutine = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addProductToRoutine(product, 'both');
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-teal-100 shadow-soft hover:shadow-soft-lg transition-all duration-300 flex flex-col justify-between relative card-hover">
      {/* Top badges & Wishlist */}
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-slate-50">
        <Link to={`/products/${product.id}`} className="block w-full h-full">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-contain object-center p-4 transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </Link>

        {/* Category Pill */}
        <div className="absolute top-2.5 start-2.5 z-10 flex flex-col gap-1">
          <span className="text-[10px] sm:text-xs px-2.5 py-0.5 rounded-full bg-white/95 text-teal-800 font-bold shadow-soft">
            {product.categoryAr}
          </span>
          {product.rating >= 4.9 && (
            <span className="text-[9px] px-2 py-0.5 rounded-full bg-teal-700 text-white font-bold shadow-teal">
              الأعلى تقييماً
            </span>
          )}
        </div>

        {/* Wishlist Heart Toggle */}
        <button
          onClick={handleToggleWishlist}
          className={`absolute top-2.5 end-2.5 z-10 rounded-xl p-2 shadow-soft transition-all ${
            isWishlisted
              ? 'bg-rose-50 text-rose-600'
              : 'bg-white/90 text-teal-400 hover:text-rose-500 hover:bg-white'
          }`}
          title={isWishlisted ? 'إزالة من المفضلة' : 'إضافة إلى المفضلة'}
          aria-label="المفضلة"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>

        {/* Quick View Overlay on hover */}
        <Link
          to={`/products/${product.id}`}
          className="absolute inset-0 bg-teal-900/15 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
        >
          <span className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-white/95 text-teal-800 shadow-soft flex items-center gap-1.5 backdrop-blur-xs">
            <Eye className="w-3.5 h-3.5 text-teal-600" />
            عرض كامل التفاصيل
          </span>
        </Link>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-1.5 text-right">
          {/* Rating */}
          <div className="flex items-center justify-between gap-1 text-xs">
            <div className="flex items-center gap-1 text-teal-400">
              <Star className="w-3.5 h-3.5 fill-teal-400 text-teal-400" />
              <span className="font-bold text-teal-800 text-xs">{product.rating}</span>
              <span className="text-teal-400 text-[10px]">({product.reviewCount})</span>
            </div>
            <span className="text-[10px] text-teal-500 font-medium">متوفر للشحن فوراً</span>
          </div>

          {/* Title */}
          <Link to={`/products/${product.id}`} className="block">
            <h3 className="font-bold text-sm sm:text-base text-teal-800 group-hover:text-teal-600 transition-colors leading-snug line-clamp-1">
              {product.name}
            </h3>
            <p className="text-[11px] text-teal-400 line-clamp-1 mt-0.5">{product.nameEn}</p>
          </Link>

          {/* Main Benefit */}
          <p className="text-xs text-teal-600 line-clamp-2 leading-relaxed">
            {product.mainBenefit}
          </p>

          {/* Skin Type tags */}
          <div className="flex flex-wrap gap-1 pt-1">
            {product.skinTypesAr.slice(0, 2).map((type, idx) => (
              <span
                key={idx}
                className="text-[10px] px-1.5 py-0.5 rounded-md bg-teal-50 text-teal-700 border border-teal-100"
              >
                {type}
              </span>
            ))}
          </div>
        </div>

        {/* Footer: Price & Primary "Add to Cart" + Supporting "Add to Routine" */}
        <div className="pt-3 border-t border-teal-50 space-y-2">
          <div className="flex items-center justify-between">
            <div className="text-right">
              <span className="text-[10px] text-teal-400 block leading-none">السعر</span>
              <span className="text-base sm:text-lg font-extrabold text-teal-800">
                {product.price}{' '}
                <span className="text-xs font-semibold text-teal-500">ج.م</span>
              </span>
            </div>

            {/* Routine supporting button */}
            <button
              onClick={handleAddToRoutine}
              className={`p-2 rounded-xl text-xs transition-colors flex items-center gap-1 ${
                isAlreadyInRoutine
                  ? 'bg-teal-50 text-teal-700'
                  : 'text-teal-500 hover:bg-teal-50 hover:text-teal-700'
              }`}
              title={isAlreadyInRoutine ? 'مضاف في روتينك' : 'أضف للروتين اليومي'}
            >
              {isAlreadyInRoutine ? (
                <>
                  <Check className="w-3.5 h-3.5 text-teal-600" />
                  <span className="text-[10px] font-bold">في الروتين</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5" />
                  <span className="text-[10px]">للروتين</span>
                </>
              )}
            </button>
          </div>

          {/* Primary CTA: Add to Cart */}
          <button
            onClick={handleAddToCart}
            className="w-full py-2.5 px-3 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs transition-all shadow-teal flex items-center justify-center gap-1.5 active:scale-[0.98]"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>أضف إلى السلة</span>
          </button>
        </div>
      </div>
    </div>
  );
}
