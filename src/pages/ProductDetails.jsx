import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Star,
  Plus,
  Minus,
  Check,
  Play,
  ShieldCheck,
  Truck,
  Heart,
  RotateCcw,
  Share2,
  CheckCircle2,
  Sparkles,
  ShoppingBag,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import { products } from '../data/products';
import { useApp } from '../context/AppContext';
import ReviewCard from '../components/ReviewCard';
import VideoModal from '../components/VideoModal';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    addProductToRoutine,
    routine,
    reviews,
    addReview,
    quizResult,
    quizAnswers,
    addToCart,
    toggleWishlist,
    isInWishlist,
    showToast
  } = useApp();

  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('150 مل (الحجم القياسي)');

  // New Review Form State
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewCity, setNewReviewCity] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewSkinType, setNewReviewSkinType] = useState('oily');
  const [newReviewSkinTypeAr, setNewReviewSkinTypeAr] = useState('بشرة دهنية');
  const [newReviewTitle, setNewReviewTitle] = useState('');
  const [newReviewContent, setNewReviewContent] = useState('');

  // Find product by id or fallback to first
  const product = products.find((p) => p.id === id) || products[0];

  const isAlreadyInRoutine =
    routine?.morning?.some((i) => i.productId === product.id) ||
    routine?.night?.some((i) => i.productId === product.id);

  const isWishlisted = isInWishlist(product.id);

  // Filter reviews for this product
  const productReviews = reviews.filter((r) => r.productId === product.id);

  // Check if product is recommended in user's quiz
  const isRecommendedInQuiz =
    quizResult?.morningRoutine?.some((s) => s.product.id === product.id) ||
    quizResult?.nightRoutine?.some((s) => s.product.id === product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, true);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedSize, false);
    navigate('/checkout');
  };

  const handleAddToRoutine = () => {
    addProductToRoutine(product, 'both');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('تم نسخ رابط المنتج لمشاركته!', 'info');
    }
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewContent.trim()) {
      showToast('من فضلك اكتب اسمك وتفاصيل تجربتك مع المنتج.', 'warning');
      return;
    }

    addReview({
      author: newReviewAuthor.trim(),
      city: newReviewCity.trim() || 'القاهرة',
      rating: newReviewRating,
      skinType: newReviewSkinType,
      skinTypeAr: newReviewSkinTypeAr,
      productId: product.id,
      productName: product.name,
      title: newReviewTitle.trim() || 'تجربة استخدام ممتازة',
      content: newReviewContent.trim(),
      tags: ['مشتري موثق', 'تجربة واقعية']
    });

    // Reset Form
    setNewReviewAuthor('');
    setNewReviewCity('');
    setNewReviewTitle('');
    setNewReviewContent('');
    setShowReviewForm(false);
  };

  const sizeOptions = [
    '150 مل (الحجم القياسي)',
    '250 مل (حجم توفيري)'
  ];

  return (
    <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
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
        <span className="text-teal-800 font-bold truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main Product Hero / Purchase Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left (Image Gallery / Visual) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-square rounded-3xl overflow-hidden bg-teal-50 border border-teal-100 shadow-soft">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {/* Category Pill */}
            <span className="absolute top-4 right-4 text-xs px-3.5 py-1 rounded-full bg-white/95 text-teal-800 font-bold shadow-soft">
              {product.categoryAr}
            </span>

            {/* Wishlist Button */}
            <button
              onClick={() => toggleWishlist(product.id)}
              className={`absolute top-4 left-4 p-2.5 rounded-2xl shadow-soft transition-all ${
                isWishlisted
                  ? 'bg-rose-50 text-rose-600'
                  : 'bg-white/90 text-teal-400 hover:text-rose-500 hover:bg-white'
              }`}
              title={isWishlisted ? 'إزالة من المفضلة' : 'إضافة إلى المفضلة'}
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>
          </div>

          {/* Quick Badges below image */}
          <div className="grid grid-cols-2 gap-2.5 text-xs">
            {product.badges?.map((badge, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-teal-50/60 border border-teal-100 text-teal-800 flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                <span className="truncate font-medium">{badge}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right (Product Info & Purchase) */}
        <div className="lg:col-span-6 space-y-6 text-right">
          {/* Quiz Match Banner (if matched) */}
          {isRecommendedInQuiz && (
            <div className="p-3.5 rounded-2xl bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-teal-600" />
                تم ترشيح هذا المنتج لك بناءً على نتائج اختبار بشرتك!
              </span>
              <Link to="/results" className="underline text-teal-700 hover:text-teal-900">
                عرض الروتين
              </Link>
            </div>
          )}

          {/* Titles & Rating */}
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-700 font-bold">
                {product.categoryAr}
              </span>
              <button
                onClick={handleShare}
                className="p-2 rounded-xl text-teal-400 hover:text-teal-700 hover:bg-teal-50 transition-colors"
                title="مشاركة المنتج"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>

            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-teal-800 leading-snug">
              {product.name}
            </h1>
            <p className="text-xs sm:text-sm text-teal-400 font-medium">{product.nameEn}</p>

            <div className="flex items-center gap-3 pt-1">
              <div className="flex items-center gap-1 text-teal-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-teal-400" />
                ))}
              </div>
              <span className="font-bold text-sm text-teal-800">{product.rating}</span>
              <span className="text-xs text-teal-400">({product.reviewCount} تقييم موثق)</span>
            </div>
          </div>

          {/* Price & Stock */}
          <div className="py-3 border-y border-teal-100 flex items-baseline justify-between gap-2 flex-wrap">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-extrabold text-teal-800">
                {product.price}
              </span>
              <span className="text-sm font-bold text-teal-500">جنيه مصري (ج.م)</span>
            </div>
            <span className="text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md font-semibold">
              متوفر بالمخزون • شحن خلال 48 ساعة
            </span>
          </div>

          {/* Main Benefit Box */}
          <div className="p-4 rounded-2xl bg-teal-50/60 border border-teal-100 text-xs sm:text-sm text-teal-700 space-y-1">
            <span className="font-bold text-teal-800 block">الفائدة الأساسية:</span>
            <p className="leading-relaxed">{product.mainBenefit}</p>
          </div>

          {/* Option / Size Selector */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-teal-800">اختر الحجم:</label>
            <div className="grid grid-cols-2 gap-2.5">
              {sizeOptions.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setSelectedSize(opt)}
                  className={`p-3 rounded-xl text-xs font-bold border transition-all text-center ${
                    selectedSize === opt
                      ? 'border-teal-700 bg-teal-50 text-teal-800 shadow-2xs'
                      : 'border-teal-100 text-teal-600 hover:bg-teal-50/40'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Controls & Add to Cart */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3">
              {/* Quantity Selector */}
              <div className="flex items-center border border-teal-200 rounded-xl bg-white overflow-hidden p-1">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-2 hover:bg-teal-50 text-teal-700 transition-colors rounded-lg"
                  aria-label="تقليل الكمية"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 text-sm font-extrabold text-teal-800 min-w-[36px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-2 hover:bg-teal-50 text-teal-700 transition-colors rounded-lg"
                  aria-label="زيادة الكمية"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Primary: Add to Cart */}
              <button
                onClick={handleAddToCart}
                className="flex-1 py-3.5 px-6 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-extrabold text-sm shadow-teal transition-all flex items-center justify-center gap-2 active:scale-[0.99]"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>أضف إلى السلة ({product.price * quantity} ج.م)</span>
              </button>
            </div>

            {/* Direct Buy Now & Routine Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <button
                onClick={handleBuyNow}
                className="py-3 px-4 rounded-xl bg-teal-800 hover:bg-teal-900 text-white font-bold text-xs sm:text-sm transition-colors flex items-center justify-center gap-1.5 shadow-soft"
              >
                <span>اشتري الآن (دفع عند الاستلام)</span>
                <ArrowLeft className="w-4 h-4" />
              </button>

              <button
                onClick={handleAddToRoutine}
                className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-bold border transition-colors flex items-center justify-center gap-1.5 ${
                  isAlreadyInRoutine
                    ? 'bg-teal-50 border-teal-200 text-teal-700'
                    : 'bg-white border-teal-200 text-teal-700 hover:bg-teal-50'
                }`}
              >
                {isAlreadyInRoutine ? (
                  <>
                    <Check className="w-4 h-4 text-teal-600" />
                    <span>مضاف في روتينك</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    <span>أضف لجدول روتيني</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Delivery & Assurance Badges */}
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-teal-100 text-center text-[11px] text-teal-600">
            <div className="p-2.5 rounded-xl bg-teal-50/50">
              <Truck className="w-4 h-4 text-teal-600 mx-auto mb-1" />
              <span className="block font-bold text-teal-800">شحن سريع</span>
              <span className="text-[10px] text-teal-500">48-72 ساعة لكل مصر</span>
            </div>
            <div className="p-2.5 rounded-xl bg-teal-50/50">
              <RotateCcw className="w-4 h-4 text-teal-600 mx-auto mb-1" />
              <span className="block font-bold text-teal-800">استرجاع مجاني</span>
              <span className="text-[10px] text-teal-500">خلال 14 يوماً</span>
            </div>
            <div className="p-2.5 rounded-xl bg-teal-50/50">
              <ShieldCheck className="w-4 h-4 text-teal-600 mx-auto mb-1" />
              <span className="block font-bold text-teal-800">أصلي 100%</span>
              <span className="text-[10px] text-teal-500">مختبر معملياً</span>
            </div>
          </div>

          {/* Suitable For Checklist */}
          <div className="space-y-2 pt-2">
            <h4 className="font-bold text-xs text-teal-800">هذا المنتج مناسب لك إذا كنت:</h4>
            <div className="space-y-1.5">
              {product.suitableFor?.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-teal-600">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Personalized "Why Might This Product Be Suitable For You?" Section */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-teal-100 shadow-soft space-y-4">
        <div className="flex items-center gap-2.5">
          <Sparkles className="w-5 h-5 text-teal-600" />
          <h3 className="font-bold text-lg text-teal-800">
            لماذا قد يناسب هذا المنتج بشرتك؟
          </h3>
        </div>

        {quizAnswers ? (
          <div className="p-4 rounded-2xl bg-teal-50 border border-teal-100 text-xs sm:text-sm text-teal-700 leading-relaxed space-y-2">
            <p>
              بناءً على إجاباتك السابقة (نوع البشرة:{' '}
              <strong className="text-teal-800">{quizResult?.summary?.skinType || 'المختلطة'}</strong>، والهدف:{' '}
              <strong className="text-teal-800">{quizResult?.summary?.goal || 'العناية المتوازنة'}</strong>):
            </p>
            <p className="text-teal-800 font-medium">
              المنتج يتميز بتركيبة خفيفة خالية من الزيوت الثقيلة التي قد تسبب انسداداً للمسام، ويحتوي على مكونات مهدئة تناسب المناخ المصري المليء بالغبار والرطوبة.
            </p>
          </div>
        ) : (
          <div className="p-4 rounded-2xl bg-teal-50/60 border border-teal-100 text-xs sm:text-sm text-teal-600 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span>
              لم تقم بإجراء اختبار تشخيص البشرة بعد لمعرفة نسبة تطابق هذا المنتج مع بشرتك تحديداً.
            </span>
            <Link
              to="/quiz"
              className="px-4 py-2 rounded-xl bg-teal-700 text-white font-bold text-xs shrink-0 hover:bg-teal-800 transition-colors shadow-teal"
            >
              ابدأ الاختبار الآن (دقيقتين)
            </Link>
          </div>
        )}
      </section>

      {/* 3. Ingredient Transparency Section (Core Trust Element) */}
      <section className="space-y-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-teal-700" />
            <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">
              ميثاق الشفافية الكاملة
            </span>
          </div>
          <h2 className="font-heading font-extrabold text-2xl text-teal-800">
            شفافية المكونات (Ingredient Transparency)
          </h2>
          <p className="text-teal-600 text-xs sm:text-sm max-w-2xl leading-relaxed">
            لا نستخدم أسماء تسويقية وهمية. إليك التركيب العلمي الدقيق وما تفعله كل مادة فعالة على سطح وعمق بشرتك:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {product.ingredients?.map((ing, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-2xl border transition-all ${
                ing.isHero
                  ? 'bg-teal-50/70 border-teal-200 shadow-soft'
                  : 'bg-white border-teal-100'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="font-latin text-xs font-bold text-teal-800 tracking-wide">
                  {ing.name}
                </span>
                {ing.isHero && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-700 text-white font-bold">
                    مكون بطل
                  </span>
                )}
              </div>
              <h4 className="font-bold text-sm text-teal-800 mb-2">{ing.nameAr}</h4>
              <p className="text-xs text-teal-600 leading-relaxed">{ing.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. How To Use Section (Visual Step-by-Step) */}
      <section className="bg-gradient-to-br from-teal-50 to-white rounded-3xl p-6 sm:p-10 border border-teal-100 shadow-soft space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-teal-600 uppercase tracking-wider block">
              طريقة الاستخدام الصحيحة
            </span>
            <h3 className="font-heading font-extrabold text-2xl text-teal-800 mt-1">
              كيف تستخدم هذا المنتج للحصول على أقصى نتيجة؟
            </h3>
          </div>

          {product.videoDemo && (
            <button
              onClick={() => setIsVideoModalOpen(true)}
              className="px-5 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs shadow-teal transition-colors flex items-center gap-2 self-start sm:self-auto"
            >
              <Play className="w-4 h-4 fill-white text-white" />
              <span>فيديو توضيحي ({product.videoDemo.duration})</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          <div className="p-4 rounded-xl bg-white border border-teal-100 space-y-1.5">
            <span className="text-[11px] font-bold text-teal-400 block">التكرار والموعد</span>
            <p className="text-xs sm:text-sm font-bold text-teal-800">
              {product.usage?.frequency || 'يومياً'}
            </p>
            <p className="text-xs text-teal-500">
              {product.usage?.morning && 'صباحاً'} {product.usage?.morning && product.usage?.night && 'و'}{' '}
              {product.usage?.night && 'مساءً'}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-teal-100 space-y-1.5 md:col-span-2">
            <span className="text-[11px] font-bold text-teal-400 block">خطوات التطبيق بالتفصيل</span>
            <p className="text-xs sm:text-sm text-teal-700 leading-relaxed font-medium">
              {product.usage?.howTo}
            </p>
          </div>
        </div>

        {product.precautions && (
          <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 text-amber-900 text-xs flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
            <span>{product.precautions}</span>
          </div>
        )}
      </section>

      {/* 5. Product Reviews Section */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-teal-100 pb-4">
          <div>
            <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-teal-800">
              تجارب العملاء مع هذا المنتج ({productReviews.length})
            </h3>
            <p className="text-xs text-teal-500 mt-1">
              آراء حقيقية وموثقة من عملاء قاموا بتجربة المنتج فعلياً
            </p>
          </div>

          <button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="px-5 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs shadow-teal transition-colors self-start sm:self-auto"
          >
            {showReviewForm ? 'إلغاء' : 'أضف تقييمك وتجربتك'}
          </button>
        </div>

        {/* Add Review Form */}
        {showReviewForm && (
          <form
            onSubmit={handleSubmitReview}
            className="bg-white p-6 sm:p-8 rounded-2xl border border-teal-200 shadow-soft space-y-4 animate-fadeIn"
          >
            <h4 className="font-bold text-sm text-teal-800">اكتب تقييمك للمنتج:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-teal-700 mb-1">اسمك</label>
                <input
                  type="text"
                  required
                  placeholder="مثال: ياسمين"
                  value={newReviewAuthor}
                  onChange={(e) => setNewReviewAuthor(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-teal-50 border border-teal-100 text-xs focus:outline-none focus:border-teal-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-teal-700 mb-1">المحافظة</label>
                <input
                  type="text"
                  placeholder="مثال: القاهرة"
                  value={newReviewCity}
                  onChange={(e) => setNewReviewCity(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-teal-50 border border-teal-100 text-xs focus:outline-none focus:border-teal-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-teal-700 mb-1">نوع بشرتك</label>
                <select
                  value={newReviewSkinType}
                  onChange={(e) => {
                    setNewReviewSkinType(e.target.value);
                    const map = {
                      oily: 'بشرة دهنية',
                      dry: 'بشرة جافة',
                      combination: 'بشرة مختلطة',
                      sensitive: 'بشرة حساسة'
                    };
                    setNewReviewSkinTypeAr(map[e.target.value] || 'بشرة عادية');
                  }}
                  className="w-full p-2.5 rounded-xl bg-teal-50 border border-teal-100 text-xs focus:outline-none focus:border-teal-500"
                >
                  <option value="oily">دهنية</option>
                  <option value="dry">جافة</option>
                  <option value="combination">مختلطة</option>
                  <option value="sensitive">حساسة</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-teal-700 mb-1">التقييم</label>
                <select
                  value={newReviewRating}
                  onChange={(e) => setNewReviewRating(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl bg-teal-50 border border-teal-100 text-xs focus:outline-none focus:border-teal-500"
                >
                  <option value={5}>⭐⭐⭐⭐⭐ (5/5 ممتاز)</option>
                  <option value={4}>⭐⭐⭐⭐ (4/5 جيد جداً)</option>
                  <option value={3}>⭐⭐⭐ (3/5 متوسط)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-teal-700 mb-1">عنوان التقييم</label>
              <input
                type="text"
                placeholder="مثال: ترطيب ممتاز وخفيف على البشرة"
                value={newReviewTitle}
                onChange={(e) => setNewReviewTitle(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-teal-50 border border-teal-100 text-xs focus:outline-none focus:border-teal-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-teal-700 mb-1">تفاصيل تجربتك</label>
              <textarea
                rows={3}
                required
                placeholder="اكتب تجربتك مع المنتج، متى لاحظت النتائج وما الفرق الذي حدث لبشرتك..."
                value={newReviewContent}
                onChange={(e) => setNewReviewContent(e.target.value)}
                className="w-full p-3 rounded-xl bg-teal-50 border border-teal-100 text-xs focus:outline-none focus:border-teal-500 resize-none"
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowReviewForm(false)}
                className="px-4 py-2 rounded-xl bg-teal-100 text-teal-800 text-xs font-bold"
              >
                إلغاء
              </button>
              <button
                type="submit"
                className="px-6 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs transition-colors shadow-teal"
              >
                نشر التقييم الآن
              </button>
            </div>
          </form>
        )}

        {/* Reviews List */}
        {productReviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {productReviews.map((rev) => (
              <ReviewCard key={rev.id} review={rev} />
            ))}
          </div>
        ) : (
          <div className="p-8 rounded-2xl bg-teal-50/50 border border-teal-100 text-center text-xs text-teal-600">
            كن أول من يكتب تقييماً موثقاً لهذا المنتج!
          </div>
        )}
      </section>

      {/* Video Modal if active */}
      {isVideoModalOpen && product.videoDemo && (
        <VideoModal
          isOpen={isVideoModalOpen}
          onClose={() => setIsVideoModalOpen(false)}
          videoDemo={product.videoDemo}
          productName={product.name}
        />
      )}
    </div>
  );
}
