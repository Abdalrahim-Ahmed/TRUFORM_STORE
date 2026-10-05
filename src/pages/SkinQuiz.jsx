import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, ShieldCheck, ArrowLeft, ArrowRight, Droplets } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { generateRoutineRecommendation } from '../utils/recommendationEngine';

// ─── Quiz Data ────────────────────────────────────────
const QUIZ_STEPS = [
  {
    id: 1,
    key: 'skinType',
    title: 'إيه نوع بشرتك؟',
    subtitle: 'اختار أقرب وصف لإحساس بشرتك خلال اليوم بعد ساعة من الغسيل',
    options: [
      { value: 'oily',       label: 'دهنية',      icon: '⊙', desc: 'لمعان واضح وإفراز دهني' },
      { value: 'dry',        label: 'جافة',       icon: '◇', desc: 'شعور بالشد والتقشر' },
      { value: 'combination',label: 'مختلطة',     icon: '◑', desc: 'دهنية في الـ T-Zone وعادية في الخدود' },
      { value: 'sensitive',  label: 'حساسة',      icon: '⌒', desc: 'تحمر بسرعة وتتأثر بالعطور' },
      { value: 'not_sure',   label: 'مش متأكد',   icon: '?', desc: 'محتاج مساعدة في التشخيص' }
    ]
  },
  {
    id: 2,
    key: 'concern',
    title: 'إيه أكتر مشكلة بتواجهها؟',
    subtitle: 'اختار المشكلة الأكثر إزعاجاً لمنحها الأولوية في الروتين',
    options: [
      { value: 'acne',         label: 'حب الشباب',          icon: '🔴', desc: 'حبوب ومسام مسدودة' },
      { value: 'dryness',      label: 'الجفاف والتقشر',     icon: '💧', desc: 'بشرة مجهدة وباهتة' },
      { value: 'pigmentation', label: 'التصبغات والبقع',    icon: '☀️', desc: 'آثار حبوب وبقع شمس' },
      { value: 'pores',        label: 'المسام الواسعة',      icon: '🔍', desc: 'لمعان ومسام بارزة' },
      { value: 'redness',      label: 'الاحمرار والتهيج',   icon: '🩹', desc: 'تحمر وتسخن بسهولة' },
      { value: 'dullness',     label: 'بهتان البشرة',       icon: '🌙', desc: 'بشرة مجهدة تفتقر للنضارة' }
    ]
  },
  {
    id: 3,
    key: 'sensitive',
    title: 'هل بشرتك حساسة من المنتجات؟',
    subtitle: 'يساعدنا على اختيار المكونات الأمثل وتجنب المهيجات',
    options: [
      { value: 'yes',      label: 'نعم',        icon: '⚠️', desc: 'أتحسس من كثير من المنتجات' },
      { value: 'no',       label: 'لا',         icon: '🛡️', desc: 'بشرتي تتحمل معظم المنتجات' },
      { value: 'not_sure', label: 'مش متأكد',   icon: '🤔', desc: 'أحياناً بس مع منتجات معينة' }
    ]
  },
  {
    id: 4,
    key: 'goal',
    title: 'إيه هدفك الأساسي؟',
    subtitle: 'أول نتيجة عاوز تشوفها في الأسابيع الأولى',
    options: [
      { value: 'hydration',     label: 'ترطيب عميق',             icon: '🌊', desc: 'بشرة ممتلئة ومرنة' },
      { value: 'cleansing',     label: 'تنظيف وضبط الدهون',      icon: '🍃', desc: 'بشرة متوازنة طوال اليوم' },
      { value: 'acne_reduction',label: 'تقليل الحبوب والبثور',   icon: '🎯', desc: 'بشرة صافية وهادئة' },
      { value: 'even_tone',     label: 'توحيد لون البشرة',       icon: '💎', desc: 'تخلص من آثار الحبوب' },
      { value: 'overall_glow',  label: 'نضارة وإشراقة عامة',    icon: '✨', desc: 'بشرة حيوية ومشرقة' }
    ]
  },
  {
    id: 5,
    key: 'experience',
    title: 'مستوى خبرتك في العناية؟',
    subtitle: 'هنصمم الروتين يناسب وقتك ومستوى معرفتك',
    options: [
      { value: 'beginner',     label: 'مبتدئ',   icon: '🌱', desc: 'روتين بسيط 3 خطوات' },
      { value: 'intermediate', label: 'متوسط',   icon: '🌿', desc: 'عارف الأساسيات ومستعد لأكثر' },
      { value: 'advanced',     label: 'متقدم',   icon: '🔬', desc: 'معتاد على الأحماض والسيروم' }
    ]
  }
];

// ─── Component ────────────────────────────────────────
export default function SkinQuiz() {
  const navigate = useNavigate();
  const { saveQuizResult, quizAnswers } = useApp();

  const [stepIdx, setStepIdx] = useState(0);
  const [answers, setAnswers] = useState(
    quizAnswers || { skinType: '', concern: '', sensitive: '', goal: '', experience: '' }
  );
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);

  const step     = QUIZ_STEPS[stepIdx];
  const selected = answers[step.key];
  const progress = Math.round(((stepIdx + 1) / QUIZ_STEPS.length) * 100);

  const select = (val) => setAnswers((p) => ({ ...p, [step.key]: val }));

  const next = () => {
    if (!selected) return;
    if (stepIdx < QUIZ_STEPS.length - 1) {
      setStepIdx((p) => p + 1);
    } else {
      finish();
    }
  };

  const back = () => {
    if (stepIdx > 0) setStepIdx((p) => p - 1);
  };

  const finish = (final = answers) => {
    setAnalyzing(true);
    setTimeout(() => setAnalysisStep(1), 600);
    setTimeout(() => setAnalysisStep(2), 1300);
    setTimeout(() => setAnalysisStep(3), 2000);
    setTimeout(() => {
      const result = generateRoutineRecommendation(final);
      saveQuizResult(final, result);
      navigate('/results');
    }, 2800);
  };

  const analysisLabels = [
    'تحليل نوع البشرة ومستوى الحساسية',
    'مطابقة المكونات الفعالة المناسبة',
    'تجهيز الروتين الصباحي والمسائي'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-teal-50 py-10 px-4 sm:px-6 pb-24 sm:pb-10">

      {/* Header */}
      <div className="max-w-2xl mx-auto text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-100 border border-teal-200 text-teal-700 text-xs font-semibold mb-4">
          <Droplets className="w-3.5 h-3.5" />
          اختبار البشرة الذكي
        </div>
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-teal-800">
          خلّينا نفهم بشرتك سوا
        </h1>
        <p className="text-teal-500 text-sm mt-2">
          مفيش إجابة صح أو غلط — اختار الأقرب لواقعك.
        </p>
      </div>

      <div className="max-w-2xl mx-auto">

        {/* ── Analyzing Screen ── */}
        {analyzing ? (
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-teal-100 shadow-soft text-center space-y-6 animate-fadeIn">
            {/* Spinner */}
            <div className="relative w-20 h-20 mx-auto">
              <div className="w-20 h-20 rounded-full border-4 border-teal-100 border-t-teal-600 animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Droplets className="w-7 h-7 text-teal-400 animate-pulse" />
              </div>
            </div>

            <div>
              <h2 className="font-heading font-extrabold text-2xl text-teal-800">بنحلل إجاباتك...</h2>
              <p className="text-teal-400 text-xs mt-1">بنطابق بشرتك مع أفضل التركيبات الطبيعية</p>
            </div>

            <div className="max-w-sm mx-auto space-y-3 text-right">
              {analysisLabels.map((label, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 rounded-xl border text-xs flex items-center justify-between transition-all duration-500 ${
                    analysisStep > idx
                      ? 'bg-teal-50 border-teal-200 text-teal-800 font-semibold'
                      : 'bg-teal-50/30 border-teal-100 text-teal-300'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className={`w-4 h-4 flex-shrink-0 ${analysisStep > idx ? 'text-teal-600' : 'text-teal-200'}`} />
                    {label}
                  </span>
                  <span className="text-[10px] font-normal">
                    {analysisStep > idx ? '✓ مكتمل' : 'جارٍ...'}
                  </span>
                </div>
              ))}
            </div>
          </div>

        ) : (
          /* ── Quiz Card ── */
          <div className="bg-white rounded-3xl border border-teal-100 shadow-soft overflow-hidden">

            {/* Progress header */}
            <div className="px-6 sm:px-10 pt-7 pb-5 border-b border-teal-50">
              <div className="flex items-end justify-between mb-3">
                <div className="flex items-baseline gap-1">
                  <span className="font-latin font-black text-4xl text-teal-800 leading-none">
                    {String(step.id).padStart(2, '0')}
                  </span>
                  <span className="text-teal-300 text-sm font-medium">
                    /{String(QUIZ_STEPS.length).padStart(2, '0')}
                  </span>
                </div>
                <span className="text-xs text-teal-400">الخطوة {step.id} من {QUIZ_STEPS.length}</span>
              </div>
              {/* Progress bar */}
              <div className="w-full bg-teal-100 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-teal-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="px-6 sm:px-10 py-7 space-y-7">
              {/* Question */}
              <div className="text-right space-y-1.5">
                <span className="text-xs font-bold text-teal-400 font-latin">
                  0{step.id}
                </span>
                <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-teal-800">
                  {step.title}
                </h2>
                <p className="text-teal-400 text-xs sm:text-sm leading-relaxed">
                  {step.subtitle}
                </p>
              </div>

              {/* Options Grid */}
              <div className={`grid gap-3 ${
                step.options.length <= 3
                  ? 'grid-cols-1 sm:grid-cols-3'
                  : step.options.length === 5
                  ? 'grid-cols-2 sm:grid-cols-5'
                  : 'grid-cols-2 sm:grid-cols-3'
              }`}>
                {step.options.map((opt) => {
                  const isSelected = selected === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => select(opt.value)}
                      className={`relative p-4 rounded-2xl text-center transition-all duration-200 border flex flex-col items-center gap-2 ${
                        isSelected
                          ? 'bg-teal-700 border-teal-700 text-white shadow-teal'
                          : 'bg-teal-50 border-teal-100 text-teal-700 hover:border-teal-300 hover:bg-teal-100/80'
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                          <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                        </div>
                      )}
                      <span className={`text-xl leading-none ${isSelected ? '' : 'grayscale-0'}`}>
                        {opt.icon}
                      </span>
                      <span className="text-xs sm:text-sm font-bold leading-tight">{opt.label}</span>
                      {opt.desc && (
                        <span className={`text-[10px] leading-tight ${isSelected ? 'text-teal-200' : 'text-teal-400'}`}>
                          {opt.desc}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between pt-2 border-t border-teal-50">
                <div>
                  {stepIdx > 0 ? (
                    <button
                      type="button"
                      onClick={back}
                      className="flex items-center gap-1.5 text-sm font-medium text-teal-400 hover:text-teal-700 transition-colors"
                    >
                      <ArrowRight className="w-4 h-4" />
                      رجوع
                    </button>
                  ) : (
                    <span className="text-xs text-teal-300">رجوع</span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={next}
                  disabled={!selected}
                  className={`flex items-center gap-2 px-8 py-3 rounded-xl text-sm font-bold transition-all ${
                    selected
                      ? 'bg-teal-700 hover:bg-teal-800 text-white shadow-teal cursor-pointer'
                      : 'bg-teal-100 text-teal-300 cursor-not-allowed'
                  }`}
                >
                  <span>{stepIdx === QUIZ_STEPS.length - 1 ? 'تحليل النتائج' : 'التالي'}</span>
                  <ArrowLeft className="w-4 h-4" />
                </button>
              </div>

              {/* Trust note */}
              <div className="text-center text-[11px] text-teal-400 flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
                <span>إجاباتك محفوظة محلياً فقط لتقديم توصيات أدق لك</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
