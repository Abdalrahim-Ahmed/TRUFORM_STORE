import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ChevronDown,
  Lightbulb,
  ShieldCheck,
  ShoppingBag,
  Droplets,
  Award
} from 'lucide-react';

export default function About() {
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const trustPillars = [
    {
      title: "100% شفافية المكونات (Ingredient Transparency)",
      desc: "كل مادة فعالة مكتوبة بتركيزها ودورها الدقيق على البشرة. لا نستخدم مصطلحات تسويقية مبهمة، ولا نخفي المواد الحافظة الآمنة.",
      icon: "🧪"
    },
    {
      title: "طريقة استخدام مرقمة ومبسطة (Clear Steps)",
      desc: "نعلم أن كثرة المنتجات تسبب حيرة. نحدد لك ترتيب كل خطوة، والكمية الصحيحة (بالقطرة أو حبة الحمص)، مع إرشادات واضحة.",
      icon: "📋"
    },
    {
      title: "تقييمات موثقة من بيئة مصر (Real Local Reviews)",
      desc: "نربط كل تقييم بنوع بشرة المقيم وظروفه (حر القاهرة، رطوبة الساحل، أو جفاف الصعيد) لتتأكد من ملاءمة المنتج لك شخصياً.",
      icon: "⭐"
    },
    {
      title: "محتوى توعوي قبل البيع (Educational Hub)",
      desc: "هدفنا الأول أن تفهم طبيعة بشرتك وتتجنب الأخطاء الشائعة، حتى لا تشتري إلا ما تحتاجه بشرتك حقاً.",
      icon: "📚"
    },
    {
      title: "توصيات مخصصة باختبار البشرة (Personalized Quiz)",
      desc: "نظام منطقي يمنعك من تجربة منتجات عشوائية، ويقترح عليك التركيبة التي تناسب أهدافك الخاصة.",
      icon: "✨"
    }
  ];

  const trustTimeline = [
    {
      step: "01",
      title: "أبحاث معملية تراعي المناخ المصري",
      desc: "تم تطوير تركيباتنا لتكون سريعة الامتصاص وخفيفة للغاية، لتتحمل رطوبة الصيف وحرارته بدون سد المسام أو اللمعان المزعج."
    },
    {
      step: "02",
      title: "استبعاد المكونات المثيرة للحساسية",
      desc: "استبعدنا العطور الاصطناعية، الكحول المحول، البارابين، والسيليكونات الثقيلة، لضمان أعلى مستويات الأمان حتى للبشرة المجهدة."
    },
    {
      step: "03",
      title: "اختبارات التوافق والاستقرار",
      desc: "خضعت المنتجات لاختبارات ثبات درجة الحرارة لضمان عدم تأكسد المواد الفعالة في ظروف التخزين المصرية."
    },
    {
      step: "04",
      title: "توصيل آمن والدفع عند الاستلام",
      desc: "نوفر شحناً سريعاً لكافة المحافظات مع ميزة معاينة المنتج والدفع عند الاستلام لضمان راحة بالك واطمئنانك التام."
    }
  ];

  const faqs = [
    {
      q: "منتجات TRUFORM مناسبة لمين؟",
      a: "منتجاتنا مصممة للرجال والنساء في مصر، ومناسبة لمختلف أنواع البشرة (الدهنية، الجافة، المختلطة، والحساسة). يمكنك إجراء اختبار البشرة الذكي لمعرفة المنتجات المتوافقة تماماً مع أهدافك."
    },
    {
      q: "إزاي أختار المنتج المناسب لبشرتي؟",
      a: "نوصي بالبدء بـ 'اختبار البشرة' (Skin Quiz) في الموقع. في دقيقتين فقط، سيطابق النظام نوع بشرتك والمشكلة التي تريد علاجها مع الروتين الأمثل، كما يمكنك استخدام فلاتر المنتجات في صفحة الكتالوج."
    },
    {
      q: "إزاي أستخدم المنتجات بطريقة صحيحة؟",
      a: "كل صفحة منتج تحتوي على قسم تفصيلي لطريقة الاستخدام (الصباح أو المساء، الترتيب في الروتين، والكمية المطلوبة)، مع فيديوهات توضيحية ونقاط إرشادية."
    },
    {
      q: "هل متاح الشحن لكافة المحافظات؟",
      a: "نعم، نوصل لجميع محافظات جمهورية مصر العربية خلال 48 إلى 72 ساعة، والشحن مجاني للطلبات فوق 500 ج.م مع خيار الدفع عند الاستلام."
    },
    {
      q: "هل يمكنني استرجاع أو استبدال المنتج؟",
      a: "بالتأكيد، نوفر سياسة استرجاع مجاني خلال 14 يوماً من تاريخ الاستلام في حالة وجود أي عيب أو مشكلة."
    }
  ];

  return (
    <div className="py-10 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16 pb-20 sm:pb-16">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-100 text-teal-800 text-xs font-bold border border-teal-200 shadow-2xs">
          <Droplets className="w-4 h-4 text-teal-600" />
          <span>عن TRUFORM Natural Skin &amp; Hair Care</span>
        </div>

        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-teal-800 tracking-tight">
          نصنع منتجات تفهم مناخنا،
          <br />
          <span className="text-teal-gradient">ونبني علاقة أساسها الثقة والشفافية</span>
        </h1>

        <p className="text-teal-600 text-sm sm:text-base leading-relaxed">
          انطلق براند TRUFORM كاستجابة حقيقية لتحديات العناية بالبشرة والشعر في مصر. لا نؤمن بالوعود التسويقية الخيالية، بل نعتمد على تركيبات علمية مدروسة ومكونات شفافة تمنحك النتائج التي تستحقها.
        </p>
      </div>

      {/* Trust Pillars Grid */}
      <div className="space-y-8">
        <div className="text-center space-y-1">
          <span className="text-xs font-bold text-teal-600 uppercase tracking-widest block">
            ركائزنا الخمس
          </span>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-teal-800">
            لماذا يثق بنا آلاف العملاء؟
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trustPillars.map((p, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-teal-100 shadow-soft hover:shadow-soft-lg transition-all space-y-3 card-hover text-right"
            >
              <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-2xl shadow-2xs">
                {p.icon}
              </div>
              <h3 className="font-bold text-base text-teal-800 leading-snug">{p.title}</h3>
              <p className="text-xs text-teal-600 leading-relaxed">{p.desc}</p>
            </div>
          ))}

          {/* Callout box in grid */}
          <div className="bg-teal-gradient text-white rounded-2xl p-6 shadow-soft flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <Sparkles className="w-6 h-6 text-teal-200" />
              <h3 className="font-bold text-lg text-white">منتجات صُنعت لظروف مصر</h3>
              <p className="text-xs text-teal-100 leading-relaxed">
                تركيبات خالية من الزيوت الثقيلة لمقاومة حرارة الصيف والتلوث الحضري وأشعة الشمس الساطعة.
              </p>
            </div>
            <Link
              to="/products"
              className="px-4 py-2.5 rounded-xl bg-white text-teal-800 font-bold text-xs self-start hover:bg-teal-50 transition-colors shadow-soft"
            >
              تصفح التشكيلة
            </Link>
          </div>
        </div>
      </div>

      {/* How We Build Trust Timeline */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-teal-100 shadow-soft space-y-8">
        <div className="space-y-1 text-center sm:text-right">
          <span className="text-xs font-bold text-teal-600 uppercase tracking-widest block">
            مسار التطوير المعملي
          </span>
          <h2 className="font-heading font-extrabold text-2xl text-teal-800">
            كيف نبني الجودة والأمان؟
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustTimeline.map((item, idx) => (
            <div key={idx} className="relative space-y-3 text-right">
              <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 font-bold text-sm flex items-center justify-center border border-teal-200">
                {item.step}
              </div>
              <h4 className="font-bold text-sm text-teal-800">{item.title}</h4>
              <p className="text-xs text-teal-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Accordion Section */}
      <section id="faq" className="space-y-6 max-w-4xl mx-auto">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-teal-800 bg-teal-100 px-3 py-1 rounded-full uppercase tracking-wider">
            كل ما يدور في ذهنك
          </span>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-teal-800">
            الأسئلة الشائعة (FAQ)
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-teal-100 overflow-hidden transition-all shadow-soft"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                  className="w-full p-5 text-right flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-teal-800 hover:text-teal-600 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-teal-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-teal-700' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-teal-600 leading-relaxed border-t border-teal-50 pt-3 animate-fadeIn">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Final Action */}
      <div className="p-8 sm:p-12 rounded-3xl bg-teal-800 text-white text-center space-y-4 shadow-soft">
        <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
          جاهز تبدأ رحلتك مع بشرة أكثر صحة ونضارة؟
        </h3>
        <p className="text-xs sm:text-sm text-teal-200 max-w-md mx-auto leading-relaxed">
          اكتشف روتينك المخصص خلال دقيقتين أو تصفح منتجاتنا الطبيعية واطلبها الآن مع الدفع عند الاستلام.
        </p>
        <div className="pt-2 flex flex-wrap justify-center gap-3">
          <Link
            to="/products"
            className="px-6 py-3.5 rounded-xl bg-white hover:bg-teal-50 text-teal-800 font-extrabold text-xs sm:text-sm shadow-soft transition-all flex items-center gap-2"
          >
            <ShoppingBag className="w-4 h-4 text-teal-700" />
            <span>تصفح وشراء المنتجات</span>
          </Link>
          <Link
            to="/quiz"
            className="px-6 py-3.5 rounded-xl bg-teal-700 hover:bg-teal-600 text-white font-bold text-xs sm:text-sm border border-teal-500 transition-all flex items-center gap-2"
          >
            <Droplets className="w-4 h-4" />
            <span>ابدأ اختبار البشرة ✨</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
