import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sun,
  Moon,
  Trash2,
  RotateCcw,
  Sparkles,
  Plus,
  Award,
  Check,
  ShoppingBag,
  ArrowLeft
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { products } from '../data/products';

export default function MyRoutine() {
  const {
    routine,
    toggleRoutineStep,
    removeProductFromRoutine,
    resetRoutineChecks,
    quizResult,
    applyQuizRoutineToMyRoutine,
    addToCart,
    addMultipleToCart
  } = useApp();

  const [activeTab, setActiveTab] = useState('all'); // 'all', 'morning', 'night'

  const morningItems = routine?.morning || [];
  const nightItems = routine?.night || [];

  const morningCompleted = morningItems.filter((i) => i.completed).length;
  const nightCompleted = nightItems.filter((i) => i.completed).length;

  const totalItems = morningItems.length + nightItems.length;
  const totalCompleted = morningCompleted + nightCompleted;
  const totalProgressPercent = totalItems > 0 ? Math.round((totalCompleted / totalItems) * 100) : 0;

  const isAllCompleted = totalItems > 0 && totalCompleted === totalItems;

  // Collect all unique products in routine
  const allRoutineProductIds = [
    ...morningItems.map((i) => i.productId),
    ...nightItems.map((i) => i.productId)
  ].filter(Boolean);

  const uniqueRoutineProducts = products.filter((p) =>
    allRoutineProductIds.includes(p.id)
  );

  const handleBuyRoutine = () => {
    addMultipleToCart(uniqueRoutineProducts, true);
  };

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10 pb-20 sm:pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-teal-100 pb-6">
        <div className="space-y-2 text-right">
          <span className="text-xs font-bold text-teal-800 bg-teal-100 px-3 py-1 rounded-full uppercase tracking-wider">
            متابعة العناية اليومية
          </span>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-teal-800">
            جدول روتينك اليومي
          </h1>
          <p className="text-teal-600 text-xs sm:text-sm max-w-xl leading-relaxed">
            البشرة الصحية تحتاج التزاماً وتكراراً يومياً. تابع خطواتك الصباحية والمسائية وضع علامة صح عند إتمام كل خطوة، واشترِ المنتجات الناقصة لتصل لباب بيتك.
          </p>
        </div>

        {/* Top Controls */}
        <div className="flex flex-wrap items-center gap-2.5 self-start md:self-auto">
          {uniqueRoutineProducts.length > 0 && (
            <button
              onClick={handleBuyRoutine}
              className="px-4 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs shadow-teal transition-all flex items-center gap-1.5"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>شراء منتجات الروتين ({uniqueRoutineProducts.length})</span>
            </button>
          )}

          {quizResult && (
            <button
              onClick={applyQuizRoutineToMyRoutine}
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-teal-50 border border-teal-200 text-teal-800 font-bold text-xs shadow-2xs transition-colors flex items-center gap-1.5"
              title="استعادة اقتراحات اختبار البشرة الأخيرة"
            >
              <Sparkles className="w-4 h-4 text-teal-600" />
              <span>استعادة روتين الاختبار</span>
            </button>
          )}

          <button
            onClick={resetRoutineChecks}
            className="px-3.5 py-2.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-700 font-bold text-xs transition-colors flex items-center gap-1.5"
            title="تفريغ علامات الصح ليوم جديد"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>إعادة ضبط اليوم</span>
          </button>
        </div>
      </div>

      {/* Daily Progress Tracker Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-teal-100 shadow-soft space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <span className="text-xs font-bold text-teal-500">معدل إنجاز اليوم:</span>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-2xl sm:text-3xl text-teal-800">
                {totalCompleted} من أصل {totalItems} خطوة مكتملة
              </h3>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-800 font-bold">
                {totalProgressPercent}%
              </span>
            </div>
          </div>

          {isAllCompleted ? (
            <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold flex items-center gap-2 shadow-2xs">
              <Award className="w-5 h-5 text-emerald-600" />
              <span>أحسنتِ! أكملتِ روتين اليوم بالكامل بنجاح 🌿</span>
            </div>
          ) : (
            <span className="text-xs text-teal-500">
              استمر! كل خطوة تمنح بشرتك النقاء والحماية
            </span>
          )}
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-teal-100 h-3 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              isAllCompleted ? 'bg-emerald-600' : 'bg-teal-700'
            }`}
            style={{ width: `${totalProgressPercent}%` }}
          />
        </div>
      </div>

      {/* Routine Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-teal-100 pb-3 overflow-x-auto">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
            activeTab === 'all'
              ? 'bg-teal-700 text-white shadow-teal'
              : 'bg-white text-teal-700 hover:bg-teal-50'
          }`}
        >
          الكل ({totalCompleted}/{totalItems})
        </button>

        <button
          onClick={() => setActiveTab('morning')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'morning'
              ? 'bg-amber-600 text-white shadow-soft'
              : 'bg-white text-teal-700 hover:bg-teal-50'
          }`}
        >
          <Sun className="w-4 h-4 text-amber-500" />
          <span>الروتين الصباحي ({morningCompleted}/{morningItems.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('night')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'night'
              ? 'bg-teal-800 text-white shadow-soft'
              : 'bg-white text-teal-700 hover:bg-teal-50'
          }`}
        >
          <Moon className="w-4 h-4 text-teal-300" />
          <span>الروتين المسائي ({nightCompleted}/{nightItems.length})</span>
        </button>
      </div>

      {/* Routine Sections */}
      <div className="space-y-12">
        {/* Morning List */}
        {(activeTab === 'all' || activeTab === 'morning') && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sun className="w-5 h-5 text-amber-500" />
                <h3 className="font-bold text-xl text-teal-800">الروتين الصباحي</h3>
              </div>
              <span className="text-xs text-teal-500 font-semibold">
                {morningCompleted} / {morningItems.length} مكتمل
              </span>
            </div>

            {morningItems.length > 0 ? (
              <div className="space-y-3">
                {morningItems.map((step, idx) => {
                  const matchedProduct = products.find((p) => p.id === step.productId);
                  return (
                    <div
                      key={step.id || `m-${idx}`}
                      className={`p-4 sm:p-5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                        step.completed
                          ? 'bg-teal-50/50 border-teal-200 opacity-90'
                          : 'bg-white border-teal-100 shadow-soft hover:shadow-soft-lg'
                      }`}
                    >
                      <div className="flex items-start sm:items-center gap-4">
                        {/* Checkbox */}
                        <button
                          onClick={() => toggleRoutineStep(step.id, 'morning')}
                          className={`w-7 h-7 rounded-xl border-2 flex items-center justify-center shrink-0 transition-colors mt-0.5 sm:mt-0 ${
                            step.completed
                              ? 'border-teal-700 bg-teal-700 text-white'
                              : 'border-teal-300 bg-white hover:border-teal-600'
                          }`}
                          title="تعليم كمنجز"
                        >
                          {step.completed && <Check className="w-4 h-4 stroke-[3]" />}
                        </button>

                        {/* Product Image */}
                        {matchedProduct?.image && (
                          <img
                            src={matchedProduct.image}
                            alt={step.name}
                            className="w-12 h-12 rounded-xl object-cover border border-teal-100 shrink-0 hidden sm:block"
                          />
                        )}

                        {/* Details */}
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200">
                              الخطوة {step.stepNumber || idx + 1}
                            </span>
                            <h4
                              className={`font-bold text-sm ${
                                step.completed
                                  ? 'line-through text-teal-400'
                                  : 'text-teal-800'
                              }`}
                            >
                              {step.name}
                            </h4>
                          </div>
                          <p className="text-xs text-teal-600 mt-1 leading-relaxed">
                            {step.instruction}
                          </p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2.5 self-end sm:self-auto shrink-0">
                        {matchedProduct && (
                          <button
                            onClick={() => addToCart(matchedProduct, 1, 'الحجم القياسي', true)}
                            className="px-3 py-1.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold shadow-teal flex items-center gap-1 transition-colors"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>شراء</span>
                          </button>
                        )}

                        {step.productId && (
                          <Link
                            to={`/products/${step.productId}`}
                            className="text-xs font-bold text-teal-700 hover:text-teal-900 px-2 py-1"
                          >
                            التفاصيل
                          </Link>
                        )}

                        <button
                          onClick={() => removeProductFromRoutine(step.id, 'morning')}
                          className="p-1.5 text-stone-400 hover:text-rose-600 rounded-lg transition-colors"
                          title="حذف من الروتين"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-6 rounded-2xl bg-white border border-teal-100 text-center space-y-2">
                <p className="text-xs text-teal-500">لا توجد خطوات صباحية مضافة حالياً.</p>
                <Link to="/products" className="text-xs font-bold text-teal-700 underline">
                  تصفح المنتجات وأضف للروتين
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Night List */}
        {(activeTab === 'all' || activeTab === 'night') && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Moon className="w-5 h-5 text-teal-600" />
                <h3 className="font-bold text-xl text-teal-800">الروتين المسائي</h3>
              </div>
              <span className="text-xs text-teal-500 font-semibold">
                {nightCompleted} / {nightItems.length} مكتمل
              </span>
            </div>

            {nightItems.length > 0 ? (
              <div className="space-y-3">
                {nightItems.map((step, idx) => {
                  const matchedProduct = products.find((p) => p.id === step.productId);
                  return (
                    <div
                      key={step.id || `n-${idx}`}
                      className={`p-4 sm:p-5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                        step.completed
                          ? 'bg-teal-50/50 border-teal-200 opacity-90'
                          : 'bg-white border-teal-100 shadow-soft hover:shadow-soft-lg'
                      }`}
                    >
                      <div className="flex items-start sm:items-center gap-4">
                        {/* Checkbox */}
                        <button
                          onClick={() => toggleRoutineStep(step.id, 'night')}
                          className={`w-7 h-7 rounded-xl border-2 flex items-center justify-center shrink-0 transition-colors mt-0.5 sm:mt-0 ${
                            step.completed
                              ? 'border-teal-800 bg-teal-800 text-white'
                              : 'border-teal-300 bg-white hover:border-teal-600'
                          }`}
                          title="تعليم كمنجز"
                        >
                          {step.completed && <Check className="w-4 h-4 stroke-[3]" />}
                        </button>

                        {/* Product Image */}
                        {matchedProduct?.image && (
                          <img
                            src={matchedProduct.image}
                            alt={step.name}
                            className="w-12 h-12 rounded-xl object-cover border border-teal-100 shrink-0 hidden sm:block"
                          />
                        )}

                        {/* Details */}
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-teal-50 text-teal-800 border border-teal-200">
                              الخطوة {step.stepNumber || idx + 1}
                            </span>
                            <h4
                              className={`font-bold text-sm ${
                                step.completed
                                  ? 'line-through text-teal-400'
                                  : 'text-teal-800'
                              }`}
                            >
                              {step.name}
                            </h4>
                          </div>
                          <p className="text-xs text-teal-600 mt-1 leading-relaxed">
                            {step.instruction}
                          </p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2.5 self-end sm:self-auto shrink-0">
                        {matchedProduct && (
                          <button
                            onClick={() => addToCart(matchedProduct, 1, 'الحجم القياسي', true)}
                            className="px-3 py-1.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold shadow-teal flex items-center gap-1 transition-colors"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>شراء</span>
                          </button>
                        )}

                        {step.productId && (
                          <Link
                            to={`/products/${step.productId}`}
                            className="text-xs font-bold text-teal-700 hover:text-teal-900 px-2 py-1"
                          >
                            التفاصيل
                          </Link>
                        )}

                        <button
                          onClick={() => removeProductFromRoutine(step.id, 'night')}
                          className="p-1.5 text-stone-400 hover:text-rose-600 rounded-lg transition-colors"
                          title="حذف من الروتين"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-6 rounded-2xl bg-white border border-teal-100 text-center space-y-2">
                <p className="text-xs text-teal-500">لا توجد خطوات مسائية مضافة حالياً.</p>
                <Link to="/products" className="text-xs font-bold text-teal-700 underline">
                  تصفح المنتجات وأضف للروتين
                </Link>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom CTA to add more products */}
      <div className="p-6 sm:p-8 rounded-3xl bg-teal-50 border border-teal-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-right">
          <h4 className="font-bold text-base text-teal-800">
            عايز تضيف منتج أو تجدد الروتين؟
          </h4>
          <p className="text-xs text-teal-600">
            يمكنك تصفح كتالوج المنتجات وإضافة أي منتج للروتين وللسلة بضغطة واحدة، أو إعادة اختبار البشرة.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to="/products"
            className="px-5 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs shadow-teal transition-colors flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>تصفح المنتجات</span>
          </Link>
          <Link
            to="/quiz"
            className="px-4 py-2.5 rounded-xl bg-white hover:bg-teal-50 text-teal-800 font-bold text-xs border border-teal-200 transition-colors"
          >
            اختبار البشرة
          </Link>
        </div>
      </div>
    </div>
  );
}
