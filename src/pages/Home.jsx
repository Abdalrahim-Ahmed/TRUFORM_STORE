import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Star,
  CheckCircle2,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Droplets,
  ShieldCheck,
  Sparkles,
  Leaf,
  ShoppingBag,
  Truck,
  RotateCcw,
  Tag,
  ArrowRight
} from 'lucide-react';
import { products } from '../data/products';
import { articles } from '../data/articles';
import { initialReviews } from '../data/reviews';
import ProductCard from '../components/ProductCard';
import { useApp } from '../context/AppContext';

// ─── Trust Pillars Data ────────────────────────────────
const trustPoints = [
  {
    icon: <Droplets className="w-5 h-5" />,
    title: 'ترطيب عميق وحماية للمسام',
    desc: 'تركيبات مبنية على علم الترطيب المتعدد الطبقات لحماية البشرة من الجفاف والحرارة.'
  },
  {
    icon: <ShieldCheck className="w-5 h-5" />,
    title: 'مكونات معملية موثقة وشفافة',
    desc: 'كل مكون فعال مذكور بتركيزه الدقيق ووظيفته البيولوجية دون غموض تسويقي.'
  },
  {
    icon: <Sparkles className="w-5 h-5" />,
    title: 'روتين مخصص باختبار ذكي',
    desc: 'اختبار دقيق يحلل طبيعة بشرتك ومشاكلها ويقترح أفضل روتين مخصص لك مجاناً.'
  },
  {
    icon: <Leaf className="w-5 h-5" />,
    title: 'طبيعي ومناسب للأجواء المصرية',
    desc: 'تركيبات خفيفة سريعة الامتصاص صُممت لتتحمل رطوبة الصيف وحرارته دون سد مسام.'
  }
];

// ─── Process Steps Data ────────────────────────────────
const processSteps = [
  { num: '01', title: 'Test & Analyze', ar: 'التشخيص', desc: 'اجري اختبار البشرة الذكي في دقيقتين' },
  { num: '02', title: 'Personalize', ar: 'التخصيص', desc: 'احصل على روتين صباحي ومسائي مخصص' },
  { num: '03', title: 'Nurture', ar: 'العناية', desc: 'طبق روتينك بثقة واستمتع بالتحسن' },
  { num: '04', title: 'Evolve', ar: 'التطور', desc: 'شاهد الفرق وتابع استجابة بشرتك' },
  { num: '05', title: 'Empathize', ar: 'المجتمع', desc: 'شارك تجربتك وساعد الآخرين' }
];

// ─── FAQs ──────────────────────────────────────────────
const faqs = [
  {
    q: 'هل منتجات TRUFORM مناسبة للبشرة الحساسة؟',
    a: 'نعم، جميع منتجاتنا خالية من العطور الصناعية القوية والكحول المحول والبارابين. نعتمد على مكونات مهدئة ومرممة مثل السيكا (Centella Asiatica) وخلاصة الشوفان والسيراميد الثلاثي.'
  },
  {
    q: 'إزاي أعرف المنتج والروتين المناسب لبشرتي؟',
    a: 'عن طريق اختبار البشرة الذكي المتاح مجاناً على الموقع! في 5 خطوات فقط هنحدد نوع بشرتك وأولوياتها ونرشح لك الروتين الأمثل مع شرح سبب كل اختيار.'
  },
  {
    q: 'متى يمكن ملاحظة نتائج ملموسة؟',
    a: 'الترطيب وتهدئة الاحمرار يظهران من الاستخدام الأول. أما علاج الحبوب وتفتيح التصبغات وتحسين مظهر المسام فيبدأ التحسن الملحوظ خلال 2 إلى 4 أسابيع من الاستخدام المنتظم.'
  },
  {
    q: 'كيف يتم الشحن والدفع؟',
    a: 'نوصل لجميع محافظات جمهورية مصر العربية خلال 48 إلى 72 ساعة. الشحن مجاني للطلبات فوق 500 ج.م، والدفع يتم نقدياً عند الاستلام بعد معاينة الشحنة والتأكد منها.'
  }
];

// ─── Bundles / Offers Data ─────────────────────────────
const featuredBundles = [
  {
    id: 'bundle-hydration',
    title: 'باقة الترطيب الزجاجي المتكاملة',
    tag: 'الأكثر طلباً للترطيب',
    productIds: ['prod-1', 'prod-4', 'prod-6'],
    originalPrice: 930,
    price: 790,
    savings: 140,
    desc: 'غسول الشاي المنقي + سيروم الهيالورونيك 4D + جل السيكا المائي لبشرة مرتوية ونضرة طوال اليوم.'
  },
  {
    id: 'bundle-acne',
    title: 'باقة تنقية المسام ومحاربة الحبوب',
    tag: 'للبشرة الدهنية والمختلطة',
    productIds: ['prod-1', 'prod-3', 'prod-8'],
    originalPrice: 1020,
    price: 865,
    savings: 155,
    desc: 'غسول الزنك والشاي + سيروم النياسيناميد 10% + واقي الشمس غير المرئي لضبط الدهون ومنع الحبوب.'
  },
  {
    id: 'bundle-barrier',
    title: 'باقة ترميم الحاجز والبشرة الحساسة',
    tag: 'للبشرة الجافة والمتحسسة',
    productIds: ['prod-2', 'prod-7', 'prod-8'],
    originalPrice: 1025,
    price: 870,
    savings: 155,
    desc: 'غسول الشوفان اللطيف + كريم السيراميد المرمم + واقي شمس معدني لحماية فائقة من الجفاف والتهيج.'
  }
];

export default function Home() {
  const { addMultipleToCart, addToCart, setIsCartOpen } = useApp();
  const [featuredFilter, setFeaturedFilter] = useState('all');
  const [openFaq, setOpenFaq] = useState(null);

  const previewArticles = articles.slice(0, 3);
  const featuredReviews = initialReviews.slice(0, 3);

  // Filtered Products for Bestsellers Section
  const displayedProducts = products.filter((p) => {
    if (featuredFilter === 'sun') return p.category === 'sunscreen';
    if (featuredFilter === 'hydration') return p.concerns.includes('dryness');
    if (featuredFilter === 'acne') return p.concerns.includes('acne');
    if (featuredFilter === 'serum') return p.category === 'serum';
    return true;
  }).slice(0, 6);

  const handleAddBundle = (bundle) => {
    const bundleProducts = products.filter((p) => bundle.productIds.includes(p.id));
    addMultipleToCart(bundleProducts, true);
  };

  return (
    <div className="overflow-hidden pb-12">

      {/* ═══════════════════════════════
          1. HERO SECTION
      ═══════════════════════════════ */}
      <section className="relative bg-gradient-to-br from-teal-50 via-white to-teal-50 pt-10 pb-4 overflow-hidden border-b border-teal-100">
        <div className="absolute top-0 left-0 w-96 h-96 bg-teal-100/40 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-teal-100/30 rounded-full translate-x-1/3 translate-y-1/3 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">

            {/* Text Column */}
            <div className="space-y-6 pb-10 lg:pb-16 text-right order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-100 border border-teal-200 text-teal-800 text-xs font-bold">
                <Droplets className="w-3.5 h-3.5 text-teal-600" />
                منتجات معملية طبيعية 100%
              </div>

              <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-[52px] text-teal-800 leading-tight">
                افهم بشرتك،
                <br />
                <span className="text-teal-gradient">واختار روتينك بثقة</span>
              </h1>

              <p className="text-teal-700 text-base sm:text-lg leading-relaxed max-w-lg">
                اكتشف المنتجات المناسبة لاحتياجات بشرتك وشعرك، وافهم مكوناتها وطريقة استخدامها قبل ما تشتري مع خيارات الدفع عند الاستلام.
              </p>

              <div className="space-y-2.5 text-sm text-teal-800 font-medium">
                {[
                  'شفافية كاملة في كل مادة فعالة بدون مصطلحات مبهمة',
                  'تركيبات خفيفة صُممت خصيصاً لمناخ مصر والحر والرطوبة',
                  'تشخيص ذكي مجاني يحدد روتينك المناسب خلال دقيقتين'
                ].map((text, i) => (
                  <div key={i} className="flex items-center gap-2.5 justify-end">
                    <span>{text}</span>
                    <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0" />
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 justify-end pt-2">
                <Link
                  to="/products"
                  className="px-7 py-3.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-sm font-extrabold transition-all shadow-teal flex items-center gap-2 active:scale-[0.99]"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>تصفح المنتجات وتسوق الآن</span>
                </Link>

                <Link
                  to="/quiz"
                  className="px-6 py-3.5 rounded-xl border border-teal-200 bg-white hover:bg-teal-50 text-teal-800 text-sm font-bold transition-colors shadow-soft flex items-center gap-2"
                >
                  <Droplets className="w-4 h-4 text-teal-600" />
                  <span>اكتشف روتينك المخصص</span>
                </Link>
              </div>

              {/* Proof badges */}
              <div className="flex flex-wrap items-center gap-4 justify-end text-xs text-teal-600 pt-2 border-t border-teal-100">
                <div className="flex items-center gap-1.5">
                  <div className="flex text-teal-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-teal-400 text-teal-400" />
                    ))}
                  </div>
                  <span className="font-extrabold text-teal-800 text-sm">4.9 / 5</span>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-teal-100/70 text-teal-800 font-bold">
                  +12,000 عميل موثق
                </span>
                <span className="px-2.5 py-1 rounded-full bg-teal-100/70 text-teal-800 font-bold">
                  شحن لجميع المحافظات 🚚
                </span>
              </div>
            </div>

            {/* Image Column */}
            <div className="relative order-1 lg:order-2">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
                <div className="relative h-[380px] w-full overflow-hidden rounded-3xl bg-slate-50 sm:h-[460px] lg:min-w-0 lg:flex-1">
                  <img
                    src="/products/hyaluronic-acid-serum.png"
                    alt="TRUFORM Natural Skincare Products"
                    className="h-full w-full object-contain object-center p-4"
                  />
                </div>

                {/* Quick Shop Card */}
                <div className="rounded-2xl border border-white/90 p-3 shadow-soft-lg glass sm:p-4 lg:w-56 lg:shrink-0">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-teal-700 text-white shadow-teal">
                        <ShoppingBag className="w-5 h-5" />
                      </div>
                      <div className="min-w-0 text-right">
                        <div className="font-bold text-sm text-teal-800">عروض الشحن المجاني</div>
                        <div className="text-xs text-teal-600">على كل طلبية تبدأ من 500 ج.م</div>
                      </div>
                    </div>
                    <Link
                      to="/products"
                      className="shrink-0 rounded-xl bg-teal-700 px-3 py-2 text-xs font-bold text-white shadow-teal transition-colors hover:bg-teal-800"
                    >
                      تسوق الآن
                    </Link>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════
          2. QUICK CATEGORIES BROWSER
      ═══════════════════════════════ */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-4 mb-8">
            <div className="text-right">
              <span className="text-xs font-bold text-teal-600 uppercase tracking-widest block">
                تصفح المنتجات
              </span>
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-teal-800 mt-1">
                الفئات الأكثر طلباً في TRUFORM
              </h2>
            </div>
            <Link
              to="/products"
              className="text-xs sm:text-sm font-bold text-teal-700 hover:text-teal-900 flex items-center gap-1 transition-colors"
            >
              <span>عرض كل المنتجات</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
            {[
              {
                title: 'غسول الوجه',
                desc: 'تنظيف لطيف متوازن pH',
                icon: '🧴',
                cat: 'cleanser',
                img: '/products/gentle-hydrating-cleanser.png'
              },
              {
                title: 'السيروم العلاجي',
                desc: 'تركيزات عالية مركزة',
                icon: '🧪',
                cat: 'serum',
                img: '/products/hyaluronic-acid-serum.png'
              },
              {
                title: 'المرطبات المائية',
                desc: 'ترطيب عميق بدون لمعان',
                icon: '💧',
                cat: 'moisturizer',
                img: '/products/hydration-conditioner-tube.png'
              },
              {
                title: 'واقي الشمس',
                desc: 'SPF 50+ بدون طبقة بيضاء',
                icon: '☀️',
                cat: 'sunscreen',
                img: '/products/revitalizing-hair-body-oil.png'
              },
              {
                title: 'العلاج والتقشير',
                desc: 'BHA وتنظيف المسام',
                icon: '✨',
                cat: 'treatment',
                img: '/products/ultra-rich-face-cream-jar.png'
              }
            ].map((catItem, idx) => (
              <Link
                key={idx}
                to={`/products?category=${catItem.cat}`}
                className="group relative p-4 rounded-2xl bg-teal-50/70 border border-teal-100 hover:border-teal-300 hover:bg-teal-50 transition-all text-center flex flex-col items-center justify-between space-y-2 card-hover"
              >
                <div className="w-14 h-14 rounded-2xl bg-white border border-teal-100 flex items-center justify-center text-2xl shadow-2xs group-hover:scale-110 transition-transform">
                  {catItem.icon}
                </div>
                <div>
                  <h3 className="font-bold text-sm text-teal-800 group-hover:text-teal-600 transition-colors">
                    {catItem.title}
                  </h3>
                  <p className="text-[11px] text-teal-500 mt-0.5 leading-snug">{catItem.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════
          3. FEATURED PRODUCTS (BESTSELLERS)
      ═══════════════════════════════ */}
      <section className="py-14 bg-gradient-to-b from-teal-50/40 via-white to-teal-50/30 border-y border-teal-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="text-right">
              <span className="text-xs font-bold text-teal-600 uppercase tracking-widest block">
                تسوق الأكثر طلباً
              </span>
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-teal-800 mt-1">
                المنتجات الأكثر مبيعاً وحماية للبشرة
              </h2>
              <p className="text-xs sm:text-sm text-teal-500 mt-1">
                أعلى المنتجات تقييماً من عملائنا، جاهزة للشحن الفوري بضمان أصالة 100%.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 self-start sm:self-auto">
              {[
                { k: 'all', l: 'الكل' },
                { k: 'hydration', l: 'ترطيب عميق' },
                { k: 'acne', l: 'حب الشباب' },
                { k: 'sun', l: 'حماية شمس' },
                { k: 'serum', l: 'سيروم' }
              ].map((pill) => (
                <button
                  key={pill.k}
                  onClick={() => setFeaturedFilter(pill.k)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    featuredFilter === pill.k
                      ? 'bg-teal-700 text-white shadow-teal'
                      : 'bg-white border border-teal-100 text-teal-700 hover:bg-teal-50'
                  }`}
                >
                  {pill.l}
                </button>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>

          <div className="text-center pt-4">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-extrabold text-sm shadow-teal transition-all"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>عرض جميع المنتجات ({products.length} منتج)</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════
          4. SPECIAL OFFERS & BUNDLES
      ═══════════════════════════════ */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-bold">
              <Tag className="w-3.5 h-3.5 text-teal-600" />
              باقات وعروض حصرية
            </div>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-teal-800">
              باقات الروتين الكامل مع خصم إضافي
            </h2>
            <p className="text-xs sm:text-sm text-teal-500 leading-relaxed">
              وفر على المجموعات المتكاملة واحصل على روتين منسجم يعالج احتياجات بشرتك بضغطة واحدة.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredBundles.map((b) => (
              <div
                key={b.id}
                className="bg-gradient-to-b from-teal-50/60 to-white rounded-3xl p-6 border border-teal-100 shadow-soft hover:shadow-soft-lg transition-all flex flex-col justify-between space-y-5 card-hover"
              >
                <div className="space-y-3 text-right">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-teal-700 text-white font-bold">
                      {b.tag}
                    </span>
                    <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-100">
                      وفر {b.savings} ج.م
                    </span>
                  </div>

                  <h3 className="font-heading font-extrabold text-lg text-teal-800 leading-snug">
                    {b.title}
                  </h3>

                  <p className="text-xs text-teal-600 leading-relaxed">
                    {b.desc}
                  </p>

                  {/* Bundled Product Thumbnails */}
                  <div className="flex items-center gap-2 pt-1">
                    {b.productIds.map((pId) => {
                      const matched = products.find((p) => p.id === pId);
                      if (!matched) return null;
                      return (
                        <div
                          key={pId}
                          className="w-14 h-14 rounded-xl overflow-hidden bg-white border border-teal-100 shadow-2xs"
                          title={matched.name}
                        >
                          <img
                            src={matched.image}
                            alt={matched.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-4 border-t border-teal-100 space-y-3">
                  <div className="flex items-baseline justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-extrabold text-teal-800">{b.price}</span>
                      <span className="text-xs text-teal-500 font-bold">ج.م</span>
                      <span className="text-xs text-stone-400 line-through mr-1">
                        {b.originalPrice} ج.م
                      </span>
                    </div>
                    <span className="text-[11px] text-emerald-700 font-bold">شحن مجاني 🚚</span>
                  </div>

                  <button
                    onClick={() => handleAddBundle(b)}
                    className="w-full py-3 px-4 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs shadow-teal transition-all flex items-center justify-center gap-2 active:scale-[0.99]"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>أضف الباقة كاملة للسلة</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════
          5. TRUST PILLARS
      ═══════════════════════════════ */}
      <section className="py-16 bg-teal-50/50 border-t border-teal-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold text-teal-600 uppercase tracking-widest">لماذا TRUFORM</span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-teal-800 mt-2">
              الثقة مش كلمة، دي تجربة كاملة.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustPoints.map((point, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-teal-100 text-center space-y-4 card-hover shadow-2xs"
              >
                <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center mx-auto shadow-2xs">
                  {point.icon}
                </div>
                <h3 className="font-bold text-sm text-teal-800">{point.title}</h3>
                <p className="text-xs text-teal-600 leading-relaxed">{point.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════
          6. PROCESS SECTION (Dark Teal)
      ═══════════════════════════════ */}
      <section className="py-16 bg-teal-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-white"
              style={{
                left: `${(i % 5) * 25}%`,
                top: `${Math.floor(i / 5) * 30}%`
              }}
            />
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold text-teal-200 uppercase tracking-widest">منهجية التطوير</span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white mt-2">
              بنسمع، نفهم، ونتطور
            </h2>
            <p className="text-teal-200 text-sm mt-3 max-w-lg mx-auto leading-relaxed">
              كل منتج في TRUFORM مبني على فهم طبيعة بشرتك واحتياجاتها الحقيقية
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {processSteps.map((s, idx) => (
              <div key={idx} className="flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center">
                  <span className="font-latin font-bold text-sm text-teal-200">{s.num}</span>
                </div>
                <div>
                  <div className="font-latin font-semibold text-xs text-teal-200 tracking-wider">{s.title}</div>
                  <div className="font-bold text-sm text-white mt-0.5">{s.ar}</div>
                  <div className="text-xs text-teal-300 mt-1 leading-relaxed">{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════
          7. QUIZ BANNER
      ═══════════════════════════════ */}
      <section className="py-14 bg-teal-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-teal-100 shadow-soft flex flex-col lg:flex-row items-center gap-10">
            <div className="flex-1 text-right space-y-5">
              <div>
                <span className="text-xs font-semibold text-teal-600 uppercase tracking-widest">اختبار البشرة الذكي</span>
                <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-teal-800 mt-2 leading-snug">
                  خلّينا نفهم بشرتك سوا
                </h2>
                <p className="text-teal-600 text-sm mt-3 leading-relaxed max-w-lg">
                  5 أسئلة سريعة → تشخيص دقيق → روتين صباحي ومسائي مخصص لك مع إمكانية إضافة الروتين كاملاً إلى سلة الشراء بنقرة واحدة.
                </p>
              </div>
              <ul className="space-y-2 text-xs text-teal-700">
                {[
                  'تحديد نوع البشرة واحتياجاتها الدقيقة',
                  'خطوات مرتبة بالتسلسل ومحددة الكمية',
                  'شرح أسباب اختيار كل منتج لضمان الاطمئنان',
                  'مجاني 100% — يستغرق دقيقتين فقط'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 justify-end">
                    <span>{item}</span>
                    <span className="w-4 h-4 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center text-[10px] font-bold">✓</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/quiz"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-sm transition-colors shadow-teal"
              >
                <Droplets className="w-4 h-4" />
                <span>ابدأ اختبار البشرة الآن</span>
              </Link>
            </div>

            <div className="flex-shrink-0 w-full lg:w-72 xl:w-80">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-teal-100">
                <img
                  src="/products/whatsapp-2026-10-03-141407.jpeg"
                  alt="TRUFORM Skincare Quiz"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-teal-900/50 via-transparent to-transparent" />
                <div className="absolute bottom-4 right-4 left-4 text-center">
                  <span className="font-bold text-white text-base block">5 أسئلة فقط</span>
                  <span className="text-teal-200 text-xs">لروتين علاجي مخصص متكامل</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════
          8. LEARN PREVIEW
      ═══════════════════════════════ */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div className="text-right">
              <span className="text-xs font-semibold text-teal-600 uppercase tracking-widest">دليل تثقيفي</span>
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-teal-800 mt-1">
                كل ما تحتاج معرفته عن العناية ببشرتك
              </h2>
            </div>
            <Link
              to="/learn"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-teal-700 hover:text-teal-900 transition-colors"
            >
              <span>استكشف كل المقالات</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {previewArticles.map((article) => (
              <div
                key={article.id}
                className="bg-white rounded-2xl overflow-hidden border border-teal-100 hover:shadow-soft-md transition-all group flex flex-col"
              >
                <div className="aspect-[16/10] overflow-hidden bg-teal-50">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-800 font-semibold">
                      {article.category}
                    </span>
                    <span className="text-teal-400 flex items-center gap-1">
                      <BookOpen className="w-3 h-3" />
                      {article.readTime}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm text-teal-800 leading-snug group-hover:text-teal-600 transition-colors flex-1">
                    {article.title}
                  </h3>
                  <p className="text-xs text-teal-600 line-clamp-2 leading-relaxed">
                    {article.summary}
                  </p>
                  <Link
                    to="/learn"
                    className="text-xs font-bold text-teal-700 hover:text-teal-900 flex items-center gap-1 pt-1 transition-colors"
                  >
                    <span>اقرأ المقال</span>
                    <ArrowLeft className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════
          9. CUSTOMER REVIEWS
      ═══════════════════════════════ */}
      <section className="py-16 bg-teal-50/60 border-t border-teal-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div className="text-right">
              <span className="text-xs font-semibold text-teal-600 uppercase tracking-widest">تجارب حقيقية</span>
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-teal-800 mt-1">
                كلام عملائنا هو أكبر برهان
              </h2>
            </div>
            <Link
              to="/reviews"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-teal-700 hover:text-teal-900 transition-colors"
            >
              <span>كل التقييمات</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {featuredReviews.map((review) => (
              <div
                key={review.id}
                className="bg-white rounded-2xl p-5 border border-teal-100 space-y-3 card-hover shadow-2xs"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs px-2.5 py-1 rounded-full bg-teal-100 text-teal-800 font-semibold">
                    تجربة موثقة ✓
                  </span>
                  <div className="flex items-center gap-1 text-teal-400">
                    {[...Array(review.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-teal-400 text-teal-400" />
                    ))}
                    <span className="text-xs font-bold text-teal-800 mr-1">{review.rating}</span>
                  </div>
                </div>

                {review.title && (
                  <p className="text-xs font-bold text-teal-800 leading-snug">"{review.title}"</p>
                )}
                <p className="text-xs text-teal-600 leading-relaxed line-clamp-3">{review.content}</p>

                <div className="flex items-center justify-between border-t border-teal-50 pt-3">
                  <span className="text-[10px] text-teal-400">{review.skinTypeAr} • {review.date}</span>
                  <div className="flex items-center gap-1.5">
                    <span className="w-7 h-7 rounded-full bg-teal-700 text-white flex items-center justify-center text-[10px] font-bold">
                      {review.avatar || review.author?.slice(0, 1) || 'ع'}
                    </span>
                    <span className="text-xs font-semibold text-teal-800">{review.author}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════
          10. FAQ SECTION
      ═══════════════════════════════ */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
            <div className="text-right">
              <span className="text-xs font-semibold text-teal-600 uppercase tracking-widest">الأسئلة الشائعة</span>
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-teal-800 mt-2 mb-3">
                قبل ما تبدأ الشراء
              </h2>
              <p className="text-teal-600 text-xs sm:text-sm leading-relaxed">
                إجابات صريحة ومباشرة لكل ما يدور في ذهنك عن منتجاتنا والشحن وطرق الاستخدام.
              </p>
              <Link
                to="/products"
                className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-700 text-white text-xs font-bold hover:bg-teal-800 transition-colors shadow-teal"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>تصفح المتجر</span>
              </Link>
            </div>

            <div className="lg:col-span-2 space-y-3">
              {faqs.map((faq, idx) => (
                <div key={idx} className="bg-teal-50/50 rounded-2xl border border-teal-100 overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full flex items-center justify-between p-5 text-right hover:bg-teal-100/50 transition-colors"
                  >
                    <span className="font-bold text-xs sm:text-sm text-teal-800 flex-1">{faq.q}</span>
                    {openFaq === idx
                      ? <ChevronUp className="w-4 h-4 text-teal-500 flex-shrink-0 mr-3" />
                      : <ChevronDown className="w-4 h-4 text-teal-500 flex-shrink-0 mr-3" />
                    }
                  </button>
                  {openFaq === idx && (
                    <div className="px-5 pb-5 pt-2 text-xs sm:text-sm text-teal-700 leading-relaxed border-t border-teal-100 animate-fadeIn">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════
          11. FINAL SHOPPING CTA
      ═══════════════════════════════ */}
      <section className="py-20 bg-teal-gradient relative overflow-hidden text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-white" />
          <div className="absolute bottom-10 left-10 w-48 h-48 rounded-full bg-white" />
        </div>

        <div className="relative max-w-3xl mx-auto px-4 text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mx-auto shadow-soft">
            <ShoppingBag className="w-8 h-8 text-teal-200" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-semibold text-teal-200 uppercase tracking-widest block">
              تسوق بثقة وأمان كامل
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white leading-tight">
              روتين أبسط، حماية أوضح،
              <br />
              ونتائج تلاحظها في مرآتك
            </h2>
          </div>

          <p className="text-teal-200 text-xs sm:text-sm leading-relaxed max-w-lg mx-auto">
            اطلب منتجاتك الآن من TRUFORM مع ميزة الشحن السريع والدفع نقداً عند الاستلام وضمان استرجاع مجاني لمدة 14 يوماً.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              to="/products"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-white hover:bg-teal-50 text-teal-800 font-extrabold text-sm transition-colors shadow-soft-xl"
            >
              <ShoppingBag className="w-4 h-4 text-teal-700" />
              <span>تصفح وشراء المنتجات</span>
            </Link>
            <Link
              to="/quiz"
              className="inline-flex items-center gap-2.5 px-6 py-4 rounded-xl bg-teal-800/80 hover:bg-teal-800 text-white font-bold text-sm border border-teal-600 transition-colors"
            >
              <Droplets className="w-4 h-4" />
              <span>بدء اختبار البشرة</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
