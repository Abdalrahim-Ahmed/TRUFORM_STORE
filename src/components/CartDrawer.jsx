import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowLeft,
  Truck,
  Tag,
  CheckCircle,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function CartDrawer() {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    cartSubtotal,
    cartCount,
    discountCode,
    discountAmount,
    applyDiscount,
    removeDiscount,
    freeShippingThreshold,
    shippingFee,
    cartTotal
  } = useApp();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const freeShippingDiff = freeShippingThreshold - cartSubtotal;
  const freeShippingProgress = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    setCouponError('');
    const res = applyDiscount(couponInput);
    if (res.success) {
      setCouponInput('');
    } else {
      setCouponError(res.message);
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" dir="rtl">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-teal-900/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 left-0 max-w-full flex">
        <div className="w-screen max-w-md bg-white shadow-soft-xl flex flex-col z-10 animate-slideUp sm:animate-none">
          {/* Header */}
          <div className="px-5 py-4 border-b border-teal-100 flex items-center justify-between bg-teal-50/50">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-teal-700 text-white flex items-center justify-center shadow-teal">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-heading font-extrabold text-base text-teal-800">
                  سلة المشتريات
                </h2>
                <p className="text-xs text-teal-500">
                  {cartCount} {cartCount === 1 ? 'منتج' : 'منتجات'} في السلة
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-xl text-teal-400 hover:text-teal-700 hover:bg-teal-100/60 transition-colors"
              aria-label="إغلاق السلة"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          {cart.length > 0 && (
            <div className="px-5 py-3 bg-teal-50 border-b border-teal-100">
              <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
                {freeShippingDiff > 0 ? (
                  <span className="text-teal-700 flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-teal-600" />
                    أضف منتجات بقيمة <strong className="font-bold text-teal-800">{freeShippingDiff} ج.م</strong> للحصول على شحن مجاني
                  </span>
                ) : (
                  <span className="text-emerald-700 font-bold flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    تهانينا! حصلت على شحن مجاني لكافة المحافظات 🚚
                  </span>
                )}
                <span className="text-teal-500 text-[11px] font-bold">{freeShippingProgress}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-teal-200/60 overflow-hidden">
                <div
                  className="h-full bg-teal-600 rounded-full transition-all duration-500"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3.5 divide-y divide-teal-50">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 px-4 space-y-4">
                <div className="w-20 h-20 rounded-full bg-teal-50 flex items-center justify-center text-teal-300">
                  <ShoppingBag className="w-10 h-10 stroke-[1.5]" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-teal-800">سلتك فارغة حالياً</h3>
                  <p className="text-xs text-teal-500 max-w-xs mt-1 leading-relaxed">
                    استكشف منتجات TRUFORM الطبيعية واحمِ بشرتك بأفضل المكونات الفعالة.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate('/products');
                  }}
                  className="px-6 py-3 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs transition-colors shadow-teal flex items-center gap-2"
                >
                  <span>تصفح المنتجات الآن</span>
                  <ArrowLeft className="w-4 h-4" />
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="pt-3.5 first:pt-0 flex gap-3 items-center group">
                  {/* Thumbnail */}
                  <Link
                    to={`/products/${item.product.id}`}
                    onClick={() => setIsCartOpen(false)}
                    className="w-18 h-18 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-teal-50 border border-teal-100 flex-shrink-0"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </Link>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <Link
                      to={`/products/${item.product.id}`}
                      onClick={() => setIsCartOpen(false)}
                      className="font-bold text-xs sm:text-sm text-teal-800 hover:text-teal-600 transition-colors line-clamp-1"
                    >
                      {item.product.name}
                    </Link>

                    <div className="flex items-center gap-2 text-[11px] text-teal-500 mt-0.5">
                      <span>{item.product.categoryAr}</span>
                      {item.selectedSize && <span>• {item.selectedSize}</span>}
                    </div>

                    <div className="flex items-center justify-between gap-2 mt-2">
                      {/* Price */}
                      <div>
                        <span className="font-extrabold text-sm sm:text-base text-teal-800">
                          {item.product.price * item.quantity}
                        </span>
                        <span className="text-[10px] text-teal-500 mr-1">ج.م</span>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center border border-teal-200 rounded-lg bg-white overflow-hidden shadow-2xs">
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-teal-50 text-teal-600 transition-colors"
                          aria-label="تقليل الكمية"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2.5 text-xs font-bold text-teal-800 min-w-[24px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-teal-50 text-teal-600 transition-colors"
                          aria-label="زيادة الكمية"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        title="حذف من السلة"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Cart Footer Summary & Checkout */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-teal-100 bg-white space-y-4 shadow-soft">
              {/* Promo Code Input */}
              <div className="space-y-1">
                {discountCode ? (
                  <div className="flex items-center justify-between p-2 rounded-xl bg-teal-50 border border-teal-200 text-xs">
                    <span className="flex items-center gap-1.5 text-teal-800 font-bold">
                      <Tag className="w-3.5 h-3.5 text-teal-600" />
                      كود مفعّل: <span className="font-latin">{discountCode}</span> ({discountAmount} ج.م خصم)
                    </span>
                    <button
                      onClick={removeDiscount}
                      className="text-stone-400 hover:text-rose-600 text-xs px-1"
                    >
                      إلغاء
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-3.5 h-3.5 text-teal-400 absolute right-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="كود الخصم (جرب TRUFORM10)"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        className="w-full pr-8 pl-3 py-2 text-xs rounded-xl bg-teal-50/60 border border-teal-100 text-teal-800 placeholder:text-teal-400 focus:outline-none focus:border-teal-500 font-medium"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-3.5 py-2 rounded-xl bg-teal-800 text-white text-xs font-bold hover:bg-teal-700 transition-colors"
                    >
                      تطبيق
                    </button>
                  </form>
                )}
                {couponError && <p className="text-[11px] text-rose-600">{couponError}</p>}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-teal-600 pt-1">
                <div className="flex items-center justify-between">
                  <span>المجموع الفرعي:</span>
                  <span className="font-bold text-teal-800">{cartSubtotal} ج.م</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex items-center justify-between text-emerald-700 font-semibold">
                    <span>قيمة الخصم:</span>
                    <span>-{discountAmount} ج.م</span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span>الشحن والتوصيل:</span>
                  <span className="font-semibold text-teal-800">
                    {shippingFee === 0 ? (
                      <span className="text-emerald-700 font-bold">مجاني 🚚</span>
                    ) : (
                      `${shippingFee} ج.م`
                    )}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm sm:text-base font-extrabold text-teal-800 pt-2 border-t border-teal-100">
                  <span>الإجمالي النهائي:</span>
                  <span className="text-lg text-teal-700">{cartTotal} ج.م</span>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2 pt-1">
                <button
                  onClick={handleProceedToCheckout}
                  className="w-full py-3.5 px-4 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-extrabold text-sm transition-all shadow-teal flex items-center justify-center gap-2"
                >
                  <span>متابعة لإتمام الطلب (الدفع عند الاستلام)</span>
                  <ArrowLeft className="w-4 h-4" />
                </button>

                <div className="flex items-center justify-between text-[11px] text-teal-500 pt-1">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                    معاينة واستلام مضمون 100%
                  </span>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="hover:underline text-teal-600 font-semibold"
                  >
                    متابعة التسوق
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
