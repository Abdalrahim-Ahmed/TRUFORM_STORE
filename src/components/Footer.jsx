import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Droplets, MapPin, Phone, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { showToast, setIsCartOpen } = useApp();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('من فضلك أدخل بريد إلكتروني صحيح.', 'warning');
      return;
    }
    setSubscribed(true);
    showToast('أهلاً بك في مجتمع TRUFORM! ', 'success');
    setEmail('');
  };

  return (
    <footer className="bg-teal-800 text-white pb-20 sm:pb-0">
      {/* Top Value Banner */}
      <div className="border-b border-teal-700 bg-teal-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center sm:text-right">
            <div className="flex items-center justify-center sm:justify-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-700/60 flex items-center justify-center flex-shrink-0 text-teal-300">
                <Truck className="w-5 h-5" />
              </div>
              <div className="text-right">
                <h4 className="font-bold text-xs text-white">شحن سريع لكافة المحافظات</h4>
                <p className="text-[11px] text-teal-300">شحن مجاني على الطلبات فوق 500 ج.م</p>
              </div>
            </div>

            <div className="flex items-center justify-center sm:justify-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-700/60 flex items-center justify-center flex-shrink-0 text-teal-300">
                <RotateCcw className="w-5 h-5" />
              </div>
              <div className="text-right">
                <h4 className="font-bold text-xs text-white">ضمان استرجاع 14 يوماً</h4>
                <p className="text-[11px] text-teal-300">استبدال أو استرجاع سهل بدون تعقيد</p>
              </div>
            </div>

            <div className="flex items-center justify-center sm:justify-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-700/60 flex items-center justify-center flex-shrink-0 text-teal-300">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="text-right">
                <h4 className="font-bold text-xs text-white">منتجات أصلية ومختبرة</h4>
                <p className="text-[11px] text-teal-300">شفافية كاملة في كل مادة فعالة</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand Info & Mark */}
          <div className="space-y-4">
            <Link to="/" className="inline-flex items-center gap-2 p-2 rounded-2xl bg-white shadow-soft leading-none">
              <img src="/truform-mark.png" alt="" aria-hidden="true" className="w-8 h-8 object-contain" />
              <span className="flex flex-col">
                <span className="font-latin text-lg font-extrabold tracking-widest text-teal-800">TRUFORM</span>
                <span className="mt-1 text-[8px] font-semibold tracking-wider text-teal-500">NATURAL SKIN &amp; HAIR CARE</span>
              </span>
            </Link>

            <p className="text-teal-200 text-xs leading-relaxed">
              TRUFORM علامة مصرية رائدة للعناية الطبيعية الموثقة بالبشرة والشعر. نعتمد على تركيبات فعالة تناسب الأجواء المصرية دون وعود وهمية.
            </p>

            <div className="space-y-2 text-xs text-teal-300 pt-1">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-teal-400 flex-shrink-0" />
                <span> الاسكندريه, مصر</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-teal-400 flex-shrink-0" />
                <span className="font-latin">01020304050</span>
              </div>
            </div>
          </div>

          {/* Shopping & Catalog Links */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 tracking-wide">
              التسوق والمنتجات
            </h4>
            <ul className="space-y-2.5 text-xs text-teal-200">
              <li>
                <Link to="/products" className="hover:text-white transition-colors">
                  كل المنتجات
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="hover:text-white transition-colors">
                  قائمة المفضلة 
                </Link>
              </li>
              <li>
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="hover:text-white transition-colors text-right"
                >
                  سلة المشتريات
                </button>
              </li>
              <li>
                <Link to="/checkout" className="hover:text-white transition-colors">
                  إتمام الطلب
                </Link>
              </li>
              <li>
                <Link to="/results" className="hover:text-white transition-colors">
                  الروتين الموصى به
                </Link>
              </li>
            </ul>
          </div>

          {/* Skin Guidance & Support */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 tracking-wide">
              العناية والتوعية
            </h4>
            <ul className="space-y-2.5 text-xs text-teal-200">
              <li>
                <Link to="/quiz" className="hover:text-white transition-colors text-teal-100 font-bold">
                  اختبار البشرة الذكي 
                </Link>
              </li>
              <li>
                <Link to="/my-routine" className="hover:text-white transition-colors">
                  جدول روتيني اليومي
                </Link>
              </li>
              <li>
                <Link to="/learn" className="hover:text-white transition-colors">
                  دليل العناية بالبشرة
                </Link>
              </li>
              <li>
                <Link to="/reviews" className="hover:text-white transition-colors">
                  تجارب العملاء الحقيقية
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  عن TRUFORM وميثاق الجودة
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter & Promo */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wide">
              انضم لمجتمع TRUFORM
            </h4>
            <p className="text-xs text-teal-200 leading-relaxed">
              اشترك واحصل على كود خصم <strong className="font-latin text-white">TRUFORM10</strong> فورياً في أول طلب.
            </p>

            {subscribed ? (
              <div className="p-3.5 rounded-xl bg-teal-700/70 border border-teal-600 text-teal-100 text-xs flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>تم الاشتراك بنجاح! كودك: TRUFORM10</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="بريدك الإلكتروني..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-teal-700/60 border border-teal-600 text-white placeholder:text-teal-400 text-xs focus:outline-none focus:border-teal-300 transition-colors"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-white font-bold text-xs transition-colors shadow-soft"
                >
                  اشتراك والحصول على الخصم
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-teal-700 bg-teal-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-teal-300">
          <p>© 2026 TRUFORM Natural Skin &amp; Hair Care — صُنع بحب في مصر 🇪🇬</p>
          <div className="flex items-center gap-4 text-teal-300">
            <span>الدفع عند الاستلام</span>
            <span>•</span>
            <span>فحص الشحنة قبل الاستلام</span>
            <span>•</span>
            <span>استرجاع مجاني 14 يوماً</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
