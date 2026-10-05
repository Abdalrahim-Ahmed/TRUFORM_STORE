import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Sun,
  Moon,
  Check,
  RotateCcw,
  ShieldAlert,
  ArrowLeft,
  CalendarCheck,
  Info,
  ShoppingBag,
  Plus
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { generateRoutineRecommendation } from '../utils/recommendationEngine';

export default function Results() {
  const {
    quizResult,
    quizAnswers,
    applyQuizRoutineToMyRoutine,
    clearQuiz,
    addMultipleToCart,
    addToCart
  } = useApp();

  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'morning' | 'night'
  const [isSaved, setIsSaved] = useState(false);

  // If user navigated directly without taking the quiz, generate default recommendation
  const result =
    quizResult ||
    generateRoutineRecommendation(
      quizAnswers || {
        skinType: 'combination',
        concern: 'acne',
        sensitive: 'no',
        goal: 'acne_reduction',
        experience: 'beginner'
      }
    );

  const allRoutineProducts = [
    ...(result.morningRoutine?.map((s) => s.product) || []),
    ...(result.nightRoutine?.map((s) => s.product) || [])
  ];

  // Remove duplicate products between morning and night
  const uniqueRoutineProducts = allRoutineProducts.filter(
    (product, index, self) => index === self.findIndex((p) => p.id === product.id)
  );

  const routineTotalOriginal = uniqueRoutineProducts.reduce((sum, p) => sum + p.price, 0);

  const handleSaveRoutine = () => {
    applyQuizRoutineToMyRoutine();
    setIsSaved(true);
  };

  const handleAddAllToCart = () => {
    addMultipleToCart(uniqueRoutineProducts, true);
  };

  const handleRetakeQuiz = () => {
    clearQuiz();
    navigate('/quiz');
  };

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10 pb-20 sm:pb-12">
      {/* Header & Congratulations */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-100 text-teal-800 text-xs font-bold border border-teal-200 shadow-2xs">
          <Sparkles className="w-4 h-4 text-teal-600" />
          <span>تم تحليل نوع بشرتك واحتياجاتها بنجاح</span>
        </div>

        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-teal-800 tracking-tight">
          روتينك المقترح للعناية المتوازنة
        </h1>

        <p className="text-teal-600 text-sm sm:text-base leading-relaxed">
          صممنا هذا الروتين ليكون واضحاً وقابلاً للتطبيق يومياً، بمكونات تتكامل معاً دون تعارض لضمان أفضل نتيجة بأمان تام.
        </p>

        {/* User Skin Profile Summary Tags */}
        {result.summary && (
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="px-3.5 py-1.5 rounded-xl bg-white border border-teal-100 text-teal-700 font-bold shadow-soft">
              نوع البشرة: <span className="text-teal-900 font-extrabold">{result.summary.skinType}</span>
            </span>
            <span className="px-3.5 py-1.5 rounded-xl bg-white border border-teal-100 text-teal-700 font-bold shadow-soft">
              المشكلة الأساسية: <span className="text-teal-900 font-extrabold">{result.summary.concern}</span>
            </span>
            <span className="px-3.5 py-1.5 rounded-xl bg-white border border-teal-100 text-teal-700 font-bold shadow-soft">
              الهدف: <span className="text-teal-900 font-extrabold">{result.summary.goal}</span>
            </span>
            {result.summary.isSensitive && (
              <span className="px-3.5 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 font-bold">
                ⚠️ مراعاة البشرة الحساسة
              </span>
            )}
          </div>
        )}
      </div>

      {/* Routine Buy All Banner */}
      <div className="bg-gradient-to-r from-teal-800 to-teal-700 rounded-3xl p-6 sm:p-8 text-white shadow-soft-lg flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-right">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-teal-200 text-xs font-bold">
            <ShoppingBag className="w-3.5 h-3.5" />
            باقة الروتين المخصص الكامل
          </div>
          <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-white">
            احصل على روتينك بالكامل بضغطة واحدة
          </h3>
          <p className="text-xs sm:text-sm text-teal-200 max-w-lg leading-relaxed">
            يشمل {uniqueRoutineProducts.length} منتجات أساسية متوافقة مع بشرتك لشحن مجاني مباشر لباب بيتك مع الدفع عند الاستلام.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 flex-shrink-0">
          <div className="text-center md:text-left">
            <span className="text-xs text-teal-300 block">إجمالي المنتجات</span>
            <span className="text-2xl sm:text-3xl font-extrabold text-white">
              {routineTotalOriginal} <span className="text-xs font-semibold text-teal-200">ج.م</span>
            </span>
          </div>

          <button
            onClick={handleAddAllToCart}
            className="px-7 py-4 rounded-xl bg-white hover:bg-teal-50 text-teal-800 font-extrabold text-sm shadow-soft-xl transition-all flex items-center gap-2 active:scale-[0.99]"
          >
            <ShoppingBag className="w-4 h-4 text-teal-700" />
            <span>أضف الروتين كاملاً إلى السلة</span>
          </button>
        </div>
      </div>

      {/* Rationale / Confidence Box ("ليه اخترنا الروتين ده؟") */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-teal-100 shadow-soft space-y-3">
        <div className="flex items-center gap-2.5 text-teal-800 font-bold text-base">
          <Info className="w-5 h-5 text-teal-600" />
          <span>ليه اخترنا لك هذه التركيبة تحديداً؟</span>
        </div>
        <p className="text-teal-700 text-xs sm:text-sm leading-relaxed">
          {result.whyExplanation}
        </p>
      </div>

      {/* Routine Actions Bar (Tabs, Save Routine & Retake) */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-3xl bg-teal-50/70 border border-teal-100">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => setActiveTab('all')}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'all'
                ? 'bg-teal-700 text-white shadow-teal'
                : 'bg-white text-teal-700 hover:bg-teal-100/60'
            }`}
          >
            الروتين بالكامل
          </button>
          <button
            onClick={() => setActiveTab('morning')}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'morning'
                ? 'bg-teal-700 text-white shadow-teal'
                : 'bg-white text-teal-700 hover:bg-teal-100/60'
            }`}
          >
            <Sun className="w-4 h-4 text-amber-500" />
            <span>الصباح</span>
          </button>
          <button
            onClick={() => setActiveTab('night')}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'night'
                ? 'bg-teal-700 text-white shadow-teal'
                : 'bg-white text-teal-700 hover:bg-teal-100/60'
            }`}
          >
            <Moon className="w-4 h-4 text-teal-400" />
            <span>المساء</span>
          </button>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
          <button
            onClick={handleSaveRoutine}
            className={`w-full sm:w-auto px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-soft ${
              isSaved
                ? 'bg-emerald-600 text-white'
                : 'bg-teal-700 hover:bg-teal-800 text-white'
            }`}
          >
            {isSaved ? (
              <>
                <Check className="w-4 h-4" />
                <span>تم الحفظ في روتينك اليومي!</span>
              </>
            ) : (
              <>
                <CalendarCheck className="w-4 h-4" />
                <span>حفظ في جدول "روتيني اليومي"</span>
              </>
            )}
          </button>

          <button
            onClick={handleRetakeQuiz}
            className="p-2.5 rounded-xl bg-white hover:bg-teal-100/60 border border-teal-100 text-teal-600 transition-colors"
            title="إعادة إجراء الاختبار"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Routine Steps Showcase */}
      <div className="space-y-12">
        {/* Morning Routine Section */}
        {(activeTab === 'all' || activeTab === 'morning') && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-teal-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-100">
                  <Sun className="w-5 h-5" />
                </div>
                <div className="text-right">
                  <h3 className="font-bold text-xl text-teal-800">
                    الروتين الصباحي (Morning Routine)
                  </h3>
                  <p className="text-xs text-teal-500">
                    الهدف: تنظيف خفيف، ترطيب مائي، وحماية كاملة ضد الشمس والأتربة.
                  </p>
                </div>
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-teal-50 text-teal-700">
                {result.morningRoutine.length} خطوات أساسية
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {result.morningRoutine.map((step) => (
                <div
                  key={`m-${step.stepNumber}`}
                  className="bg-white rounded-2xl p-5 border border-teal-100 shadow-soft hover:shadow-soft-lg transition-all flex flex-col justify-between card-hover"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 font-bold border border-teal-100">
                        الخطوة {step.stepNumber}: {step.stepName}
                      </span>
                      <span className="text-[10px] text-teal-400">{step.frequency}</span>
                    </div>

                    <Link
                      to={`/products/${step.product.id}`}
                      className="block aspect-square rounded-xl overflow-hidden bg-teal-50"
                    >
                      <img
                        src={step.product.image}
                        alt={step.product.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </Link>

                    <div>
                      <Link to={`/products/${step.product.id}`}>
                        <h4 className="font-bold text-sm text-teal-800 hover:text-teal-600 line-clamp-1">
                          {step.product.name}
                        </h4>
                        <p className="text-[10px] text-teal-400 line-clamp-1">{step.product.nameEn}</p>
                      </Link>
                    </div>

                    <div className="p-3 rounded-xl bg-teal-50/60 border border-teal-100 text-xs space-y-1">
                      <span className="font-bold block text-[11px] text-teal-800">ليه اخترناه لك؟</span>
                      <p className="text-[11px] leading-relaxed text-teal-600">{step.reason}</p>
                    </div>

                    <p className="text-[11px] text-teal-600 leading-relaxed">
                      💡 <span className="font-bold">طريقة الاستخدام:</span> {step.instruction}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-teal-50 flex items-center justify-between gap-2">
                    <div>
                      <span className="text-base font-extrabold text-teal-800">
                        {step.product.price}
                      </span>
                      <span className="text-xs text-teal-400 mr-1">ج.م</span>
                    </div>

                    <button
                      onClick={() => addToCart(step.product, 1, 'الحجم القياسي', true)}
                      className="px-3 py-1.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs shadow-teal flex items-center gap-1 transition-colors"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>أضف للسلة</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Night Routine Section */}
        {(activeTab === 'all' || activeTab === 'night') && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-teal-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center">
                  <Moon className="w-5 h-5" />
                </div>
                <div className="text-right">
                  <h3 className="font-bold text-xl text-teal-800">
                    الروتين المسائي (Night Routine)
                  </h3>
                  <p className="text-xs text-teal-500">
                    الهدف: تنظيف عميق لشوائب اليوم، علاج مكثف وتجديد خلايا البشرة أثناء النوم.
                  </p>
                </div>
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-teal-50 text-teal-700">
                {result.nightRoutine.length} خطوات أساسية
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {result.nightRoutine.map((step) => (
                <div
                  key={`n-${step.stepNumber}`}
                  className="bg-white rounded-2xl p-5 border border-teal-100 shadow-soft hover:shadow-soft-lg transition-all flex flex-col justify-between card-hover"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 font-bold border border-teal-100">
                        الخطوة {step.stepNumber}: {step.stepName}
                      </span>
                      <span className="text-[10px] text-teal-400">{step.frequency}</span>
                    </div>

                    <Link
                      to={`/products/${step.product.id}`}
                      className="block aspect-square rounded-xl overflow-hidden bg-teal-50"
                    >
                      <img
                        src={step.product.image}
                        alt={step.product.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </Link>

                    <div>
                      <Link to={`/products/${step.product.id}`}>
                        <h4 className="font-bold text-sm text-teal-800 hover:text-teal-600 line-clamp-1">
                          {step.product.name}
                        </h4>
                        <p className="text-[10px] text-teal-400 line-clamp-1">{step.product.nameEn}</p>
                      </Link>
                    </div>

                    <div className="p-3 rounded-xl bg-teal-50/60 border border-teal-100 text-xs space-y-1">
                      <span className="font-bold block text-[11px] text-teal-800">ليه اخترناه لك؟</span>
                      <p className="text-[11px] leading-relaxed text-teal-600">{step.reason}</p>
                    </div>

                    <p className="text-[11px] text-teal-600 leading-relaxed">
                      💡 <span className="font-bold">طريقة الاستخدام:</span> {step.instruction}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-teal-50 flex items-center justify-between gap-2">
                    <div>
                      <span className="text-base font-extrabold text-teal-800">
                        {step.product.price}
                      </span>
                      <span className="text-xs text-teal-400 mr-1">ج.م</span>
                    </div>

                    <button
                      onClick={() => addToCart(step.product, 1, 'الحجم القياسي', true)}
                      className="px-3 py-1.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs shadow-teal flex items-center gap-1 transition-colors"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>أضف للسلة</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Routine Follow-up CTA & Medical Disclaimer */}
      <div className="space-y-4">
        <div className="p-6 rounded-3xl bg-teal-800 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-soft">
          <div className="space-y-1 text-center sm:text-right">
            <h4 className="font-bold text-lg text-white">هل تريد متابعة تطبيق هذا الروتين يومياً؟</h4>
            <p className="text-xs text-teal-200">
              قم بزيارة صفحة "روتينك اليومي" لوضع علامات الصح وتتبع التزامك خطوة بخطوة.
            </p>
          </div>
          <Link
            to="/my-routine"
            className="px-6 py-3 rounded-xl bg-white hover:bg-teal-50 text-teal-800 font-bold text-xs sm:text-sm shadow-soft transition-all shrink-0 flex items-center gap-2"
          >
            <CalendarCheck className="w-4 h-4 text-teal-700" />
            <span>فتح لوحة روتيني اليومي</span>
          </Link>
        </div>

        {/* Medical Disclaimer Banner */}
        <div className="p-4 rounded-2xl bg-teal-50/60 border border-teal-100 text-xs text-teal-700 flex items-start gap-2.5">
          <ShieldAlert className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <span className="font-bold text-teal-800">تنبيه إرشادي: </span>
            {result.disclaimer}
          </p>
        </div>
      </div>
    </div>
  );
}
