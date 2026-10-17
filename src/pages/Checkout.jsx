import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  CheckCircle2,
  Truck,
  ShieldCheck,
  CreditCard,
  MapPin,
  Phone,
  User,
  Mail,
  FileText,
  ShoppingBag,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Package,
  RotateCcw
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const EGYPT_GOVERNORATES = [
  'القاهرة',
  'الجيزة',
  'الإسكندرية',
  'القليوبية',
  'الدقهلية',
  'الشرقية',
  'الغربية',
  'المنوفية',
  'دمياط',
  'بورسعيد',
  'الإسماعيلية',
  'السويس',
  'كفر الشيخ',
  'الفيوم',
  'بني سويف',
  'المنيا',
  'أسيوط',
  'سوهاج',
  'قنا',
  'الأقصر',
  'أسوان',
  'البحر الأحمر',
  'الوادي الجديد',
  'مطروح',
  'شمال سيناء',
  'جنوب سيناء'
];

export default function Checkout() {
  const {
    cart,
    cartSubtotal,
    cartTotal,
    discountAmount,
    discountCode,
    shippingFee,
    placeOrder,
    lastOrder,
    showToast
  } = useApp();

  const navigate = useNavigate();

  const [confirmedOrder, setConfirmedOrder] = useState(lastOrder || null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form Fields
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    alternatePhone: '',
    email: '',
    governorate: 'القاهرة',
    city: '',
    address: '',
    notes: '',
    paymentMethod: 'الدفع عند الاستلام'
  });

  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const errors = {};
    if (!formData.fullName.trim() || formData.fullName.trim().length < 3) {
      errors.fullName = 'من فضلك أدخل الاسم بالكامل (ثلاثي)';
    }
    const phoneClean = formData.phone.trim().replace(/\s+/g, '');
    if (!phoneClean || phoneClean.length < 10) {
      errors.phone = 'من فضلك أدخل رقم هاتف مصري صحيح (مثال: 01012345678)';
    }
    if (!formData.city.trim()) {
      errors.city = 'من فضلك أدخل الحي أو المنطقة';
    }
    if (!formData.address.trim() || formData.address.trim().length < 6) {
      errors.address = 'من فضلك أدخل العنوان بالتفصيل (الشارع، رقم العمارة، الشقة)';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      showToast('يرجى تصحيح الأخطاء الموضحة في النموذج للمتابعة.', 'warning');
      return;
    }

    if (cart.length === 0) {
      showToast('سلة المشتريات فارغة!', 'warning');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const order = placeOrder(formData);
      setIsSubmitting(false);
      if (order) {
        setConfirmedOrder(order);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 700);
  };

  // ==========================================
  // CONFIRMATION VIEW
  // ==========================================
  if (confirmedOrder) {
    return (
      <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8 animate-fadeIn">
        {/* Success Header */}
        <div className="text-center space-y-4 bg-gradient-to-b from-teal-50 to-white p-8 sm:p-10 rounded-3xl border border-teal-100 shadow-soft">
          <div className="w-16 h-16 rounded-full bg-teal-100 border border-teal-200 text-teal-700 flex items-center justify-center mx-auto shadow-teal">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <div className="space-y-1">
            <span className="text-xs font-semibold text-teal-600 bg-teal-100 px-3 py-1 rounded-full uppercase">
              تم استلام وتأكيد طلبك
            </span>
            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-teal-800">
              شكراً لثقتك في TRUFORM!
            </h1>
            <p className="text-teal-600 text-sm max-w-md mx-auto leading-relaxed">
              رقم طلبك هو{' '}
              <strong className="font-latin text-teal-800 font-extrabold px-2 py-0.5 bg-white border border-teal-200 rounded-lg">
                #{confirmedOrder.id}
              </strong>
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-teal-700 pt-2">
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-teal-100 font-medium">
              <Truck className="w-4 h-4 text-teal-600" />
              توصيل متوقع خلال 48-72 ساعة
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-teal-100 font-medium">
              <ShieldCheck className="w-4 h-4 text-teal-600" />
              معاينة المنتج قبل الدفع للمندوب
            </span>
          </div>
        </div>

        {/* Order Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Shipping & Contact Summary */}
          <div className="bg-white rounded-2xl p-6 border border-teal-100 shadow-soft space-y-4">
            <h3 className="font-bold text-sm text-teal-800 border-b border-teal-50 pb-2.5 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-teal-600" />
              بيانات الشحن والتوصيل
            </h3>
            <div className="space-y-2 text-xs text-teal-700 leading-relaxed">
              <div>
                <span className="text-teal-400 block text-[11px]">اسم العميل:</span>
                <span className="font-bold text-teal-800 text-sm">{confirmedOrder.customer.fullName}</span>
              </div>
              <div>
                <span className="text-teal-400 block text-[11px]">رقم الهاتف:</span>
                <span className="font-latin font-bold">{confirmedOrder.customer.phone}</span>
                {confirmedOrder.customer.alternatePhone && (
                  <span className="text-teal-500 mr-2 font-latin">({confirmedOrder.customer.alternatePhone})</span>
                )}
              </div>
              <div>
                <span className="text-teal-400 block text-[11px]">العنوان:</span>
                <span>{confirmedOrder.customer.governorate}، {confirmedOrder.customer.city}</span>
                <p className="font-medium text-teal-800 mt-0.5">{confirmedOrder.customer.address}</p>
              </div>
              {confirmedOrder.customer.notes && (
                <div>
                  <span className="text-teal-400 block text-[11px]">ملاحظات المندوب:</span>
                  <p className="italic text-teal-600">{confirmedOrder.customer.notes}</p>
                </div>
              )}
              <div className="pt-2 border-t border-teal-50">
                <span className="text-teal-400 block text-[11px]">طريقة الدفع:</span>
                <span className="font-bold text-teal-800">{confirmedOrder.paymentMethod}</span>
              </div>
            </div>
          </div>

          {/* Items & Total Summary */}
          <div className="bg-white rounded-2xl p-6 border border-teal-100 shadow-soft space-y-4">
            <h3 className="font-bold text-sm text-teal-800 border-b border-teal-50 pb-2.5 flex items-center gap-2">
              <Package className="w-4 h-4 text-teal-600" />
              المنتجات المطلوبة ({confirmedOrder.items.length})
            </h3>
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {confirmedOrder.items.map((item) => (
                <div key={item.id} className="flex items-center gap-3 text-xs">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-12 h-12 rounded-lg object-contain bg-teal-50 border border-teal-100 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-teal-800 truncate">{item.product.name}</h4>
                    <span className="text-teal-500 text-[11px]">
                      {item.selectedSize ? `${item.selectedSize} • ` : ''}الكمية: {item.quantity}
                    </span>
                  </div>
                  <span className="font-extrabold text-teal-800">
                    {(item.unitPrice ?? item.product.price) * item.quantity} ج.م
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-teal-100 space-y-1.5 text-xs text-teal-600">
              <div className="flex justify-between">
                <span>المجموع الفرعي:</span>
                <span className="font-bold text-teal-800">{confirmedOrder.subtotal} ج.م</span>
              </div>
              {confirmedOrder.discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>الخصم المطبق:</span>
                  <span>-{confirmedOrder.discountAmount} ج.م</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>الشحن والتوصيل:</span>
                <span className="font-bold text-teal-800">
                  {confirmedOrder.shippingFee === 0 ? 'مجاني 🚚' : `${confirmedOrder.shippingFee} ج.م`}
                </span>
              </div>
              <div className="flex justify-between text-sm sm:text-base font-extrabold text-teal-800 pt-2 border-t border-teal-100">
                <span>المبلغ المطلوب عند الاستلام:</span>
                <span className="text-lg text-teal-700">{confirmedOrder.total} ج.م</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            to="/products"
            className="px-6 py-3 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs sm:text-sm transition-colors shadow-teal flex items-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>تصفح المزيد من المنتجات</span>
          </Link>
          <Link
            to="/my-routine"
            className="px-6 py-3 rounded-xl bg-white border border-teal-200 text-teal-800 font-bold text-xs sm:text-sm hover:bg-teal-50 transition-colors"
          >
            <span>متابعة روتيني اليومي</span>
          </Link>
          <Link
            to="/"
            className="px-6 py-3 rounded-xl text-teal-600 hover:text-teal-800 text-xs sm:text-sm transition-colors font-medium"
          >
            العودة للرئيسية
          </Link>
        </div>
      </div>
    );
  }

  // ==========================================
  // EMPTY CART VIEW
  // ==========================================
  if (cart.length === 0) {
    return (
      <div className="py-20 px-4 text-center max-w-md mx-auto space-y-5">
        <div className="w-20 h-20 rounded-full bg-teal-50 flex items-center justify-center text-teal-400 mx-auto">
          <ShoppingBag className="w-10 h-10 stroke-[1.5]" />
        </div>
        <div className="space-y-1.5">
          <h2 className="font-heading font-extrabold text-2xl text-teal-800">
            سلة المشتريات فارغة
          </h2>
          <p className="text-xs sm:text-sm text-teal-600 leading-relaxed">
            لا توجد منتجات حالياً في سلة الشراء للمتابعة إلى الدفع. أضف منتجاتك المفضلة أولاً!
          </p>
        </div>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-sm shadow-teal transition-colors"
        >
          <span>تصفح كتالوج المنتجات</span>
          <ArrowLeft className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  // ==========================================
  // CHECKOUT FORM VIEW
  // ==========================================
  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-teal-500 font-medium">
        <Link to="/" className="hover:text-teal-800">
          الرئيسية
        </Link>
        <span>/</span>
        <Link to="/products" className="hover:text-teal-800">
          المنتجات
        </Link>
        <span>/</span>
        <span className="text-teal-800 font-bold">إتمام الطلب والشحن</span>
      </nav>

      {/* Page Header */}
      <div className="text-right space-y-1">
        <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-teal-800">
          إتمام الطلب والشحن
        </h1>
        <p className="text-xs sm:text-sm text-teal-500">
          أدخل بيانات التوصيل وسنقوم بتجهيز وشحن شحنتك فوراً. الدفع يتم عند الاستلام بعد المعاينة.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Right Column: Customer & Delivery Form (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* 1. Personal & Contact Information */}
            <div className="bg-white rounded-2xl p-6 border border-teal-100 shadow-soft space-y-4 text-right">
              <h3 className="font-bold text-sm text-teal-800 flex items-center gap-2 border-b border-teal-50 pb-3">
                <User className="w-4 h-4 text-teal-600" />
                بيانات التواصل والمستلم
              </h3>

              <div className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold text-teal-700 mb-1.5">
                    الاسم بالكامل (ثلاثي) <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-teal-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="مثال: ياسمين أحمد محمود"
                      className={`w-full pr-10 pl-3.5 py-2.5 rounded-xl bg-teal-50/50 border text-xs sm:text-sm text-teal-800 placeholder:text-teal-300 focus:outline-none focus:border-teal-500 ${
                        formErrors.fullName ? 'border-rose-400 bg-rose-50/30' : 'border-teal-100'
                      }`}
                    />
                  </div>
                  {formErrors.fullName && (
                    <p className="text-[11px] text-rose-600 mt-1">{formErrors.fullName}</p>
                  )}
                </div>

                {/* Phone Numbers */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-teal-700 mb-1.5">
                      رقم الهاتف الأساسي <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-teal-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="010XXXXXXXX"
                        className={`w-full pr-10 pl-3.5 py-2.5 rounded-xl bg-teal-50/50 border text-xs sm:text-sm text-teal-800 placeholder:text-teal-300 focus:outline-none focus:border-teal-500 font-latin ${
                          formErrors.phone ? 'border-rose-400 bg-rose-50/30' : 'border-teal-100'
                        }`}
                      />
                    </div>
                    {formErrors.phone && (
                      <p className="text-[11px] text-rose-600 mt-1">{formErrors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-teal-700 mb-1.5">
                      رقم هاتف إضافي (اختياري)
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-teal-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        name="alternatePhone"
                        value={formData.alternatePhone}
                        onChange={handleChange}
                        placeholder="011XXXXXXXX"
                        className="w-full pr-10 pl-3.5 py-2.5 rounded-xl bg-teal-50/50 border border-teal-100 text-xs sm:text-sm text-teal-800 placeholder:text-teal-300 focus:outline-none focus:border-teal-500 font-latin"
                      />
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-bold text-teal-700 mb-1.5">
                    البريد الإلكتروني (لتأكيد الطلب وتتبع الشحنة - اختياري)
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-teal-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@example.com"
                      className="w-full pr-10 pl-3.5 py-2.5 rounded-xl bg-teal-50/50 border border-teal-100 text-xs sm:text-sm text-teal-800 placeholder:text-teal-300 focus:outline-none focus:border-teal-500 font-latin"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Delivery Address */}
            <div className="bg-white rounded-2xl p-6 border border-teal-100 shadow-soft space-y-4 text-right">
              <h3 className="font-bold text-sm text-teal-800 flex items-center gap-2 border-b border-teal-50 pb-3">
                <MapPin className="w-4 h-4 text-teal-600" />
                عنوان التوصيل
              </h3>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Governorate */}
                  <div>
                    <label className="block text-xs font-bold text-teal-700 mb-1.5">
                      المحافظة <span className="text-rose-500">*</span>
                    </label>
                    <select
                      name="governorate"
                      value={formData.governorate}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-teal-50/50 border border-teal-100 text-xs sm:text-sm text-teal-800 focus:outline-none focus:border-teal-500 font-medium"
                    >
                      {EGYPT_GOVERNORATES.map((gov) => (
                        <option key={gov} value={gov}>
                          {gov}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* City / Area */}
                  <div>
                    <label className="block text-xs font-bold text-teal-700 mb-1.5">
                      المدينة / الحي / المنطقة <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="مثال: المعادي / التجمع الخامس"
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-teal-50/50 border text-xs sm:text-sm text-teal-800 placeholder:text-teal-300 focus:outline-none focus:border-teal-500 ${
                        formErrors.city ? 'border-rose-400 bg-rose-50/30' : 'border-teal-100'
                      }`}
                    />
                    {formErrors.city && (
                      <p className="text-[11px] text-rose-600 mt-1">{formErrors.city}</p>
                    )}
                  </div>
                </div>

                {/* Detailed Address */}
                <div>
                  <label className="block text-xs font-bold text-teal-700 mb-1.5">
                    العنوان بالتفصيل <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={2}
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="اسم الشارع، رقم العقار، رقم الشقة، أو علامة مميزة قريبة..."
                    className={`w-full p-3 rounded-xl bg-teal-50/50 border text-xs sm:text-sm text-teal-800 placeholder:text-teal-300 focus:outline-none focus:border-teal-500 resize-none ${
                      formErrors.address ? 'border-rose-400 bg-rose-50/30' : 'border-teal-100'
                    }`}
                  />
                  {formErrors.address && (
                    <p className="text-[11px] text-rose-600 mt-1">{formErrors.address}</p>
                  )}
                </div>

                {/* Delivery Notes */}
                <div>
                  <label className="block text-xs font-bold text-teal-700 mb-1.5">
                    ملاحظات للمندوب أو مواعيد التوصيل المفضلة (اختياري)
                  </label>
                  <input
                    type="text"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="مثال: يرجى الاتصال قبل الوصول بنصف ساعة / الاستلام بعد الساعة 3 عصراً"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-teal-50/50 border border-teal-100 text-xs text-teal-800 placeholder:text-teal-300 focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>
            </div>

            {/* 3. Payment Method */}
            <div className="bg-white rounded-2xl p-6 border border-teal-100 shadow-soft space-y-4 text-right">
              <h3 className="font-bold text-sm text-teal-800 flex items-center gap-2 border-b border-teal-50 pb-3">
                <CreditCard className="w-4 h-4 text-teal-600" />
                طريقة الدفع
              </h3>

              <div className="space-y-3">
                <label className="flex items-start gap-3 p-3.5 rounded-xl border border-teal-700 bg-teal-50/70 cursor-pointer transition-colors">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="الدفع عند الاستلام"
                    checked={formData.paymentMethod === 'الدفع عند الاستلام'}
                    onChange={handleChange}
                    className="mt-1 text-teal-700 focus:ring-teal-500"
                  />
                  <div className="flex-1 text-xs">
                    <span className="font-bold text-teal-800 block text-sm">
                      الدفع نقدياً عند الاستلام (Cash on Delivery)
                    </span>
                    <span className="text-teal-600 block mt-0.5 leading-relaxed">
                      ادفع للمندوب كاش بعد استلام طردك ومعاينة المنتجات والتأكد من سلامتها.
                    </span>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3.5 rounded-xl border border-teal-100 hover:bg-teal-50/40 cursor-pointer transition-colors">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="محفظة إلكترونية / إنستاباي عند الاستلام"
                    checked={formData.paymentMethod === 'محفظة إلكترونية / إنستاباي عند الاستلام'}
                    onChange={handleChange}
                    className="mt-1 text-teal-700 focus:ring-teal-500"
                  />
                  <div className="flex-1 text-xs">
                    <span className="font-bold text-teal-800 block text-sm">
                      محفظة إلكترونية (Vodafone Cash / InstaPay) عند الاستلام
                    </span>
                    <span className="text-teal-500 block mt-0.5 leading-relaxed">
                      تحويل فوري لرقم المندوب أو حساب TRUFORM الرسمي لحظة وصول المندوب لباب بيتك.
                    </span>
                  </div>
                </label>
              </div>

              <div className="p-3 rounded-xl bg-teal-50 text-teal-700 text-xs flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-teal-600 flex-shrink-0" />
                <span>
                  معاملة آمنة بنسبة 100% — لا يتطلب الموقع إدخال أي بيانات بطاقات ائتمانية.
                </span>
              </div>
            </div>
          </div>

          {/* Left Column: Order Summary (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            <div className="bg-white rounded-2xl p-6 border border-teal-100 shadow-soft space-y-5 sticky top-24">
              <div className="flex items-center justify-between border-b border-teal-50 pb-3">
                <h3 className="font-bold text-sm text-teal-800 flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-teal-600" />
                  ملخص الطلب ({cart.length} منتجات)
                </h3>
                <Link
                  to="/products"
                  className="text-xs text-teal-600 hover:text-teal-800 font-semibold"
                >
                  تعديل السلة
                </Link>
              </div>

              {/* Items List */}
              <div className="space-y-3 max-h-64 overflow-y-auto pr-1 divide-y divide-teal-50">
                {cart.map((item) => (
                  <div key={item.id} className="pt-3 first:pt-0 flex gap-3 items-center text-xs">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-14 h-14 rounded-xl object-contain bg-teal-50 border border-teal-100 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0 text-right">
                      <h4 className="font-bold text-teal-800 truncate">{item.product.name}</h4>
                      <p className="text-teal-400 text-[11px] mt-0.5">
                        {item.selectedSize || item.product.categoryAr} × {item.quantity}
                      </p>
                    </div>
                    <div className="text-left font-extrabold text-teal-800">
                      {(item.unitPrice ?? item.product.price) * item.quantity} ج.م
                    </div>
                  </div>
                ))}
              </div>

              {/* Pricing Breakdown */}
              <div className="pt-3 border-t border-teal-100 space-y-2 text-xs text-teal-600">
                <div className="flex justify-between">
                  <span>المجموع الفرعي:</span>
                  <span className="font-bold text-teal-800">{cartSubtotal} ج.م</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>خصم الكوبون ({discountCode}):</span>
                    <span>-{discountAmount} ج.م</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>الشحن والتوصيل:</span>
                  <span className="font-bold text-teal-800">
                    {shippingFee === 0 ? (
                      <span className="text-emerald-700 font-bold">شحن مجاني 🚚</span>
                    ) : (
                      `${shippingFee} ج.م`
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-base font-extrabold text-teal-800 pt-3 border-t border-teal-100">
                  <span>المبلغ الإجمالي للدفع:</span>
                  <span className="text-xl text-teal-700">{cartTotal} ج.م</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 px-6 rounded-xl font-extrabold text-sm text-white transition-all shadow-teal flex items-center justify-center gap-2 ${
                  isSubmitting
                    ? 'bg-teal-400 cursor-wait'
                    : 'bg-teal-700 hover:bg-teal-800'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>جاري تسجيل وتأكيد الطلب...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    <span>تأكيد الطلب الآن ({cartTotal} ج.م)</span>
                  </>
                )}
              </button>

              {/* Guarantees */}
              <div className="space-y-2 pt-2 border-t border-teal-50 text-[11px] text-teal-500">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 flex-shrink-0" />
                  <span>ضمان استرجاع مجاني خلال 14 يوماً في حالة وجود أي عيب.</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 flex-shrink-0" />
                  <span>منتجات معملية أصلية 100% مختبرة ومعتمدة من TRUFORM.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
