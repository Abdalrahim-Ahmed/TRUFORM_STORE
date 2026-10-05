import React, { useState } from 'react';
import { BookOpen, X, ArrowLeft, Droplets } from 'lucide-react';
import { articles } from '../data/articles';
import { products } from '../data/products';
import { Link } from 'react-router-dom';

const categories = [
  { key: 'all',         label: 'الكل' },
  { key: 'basics',      label: 'أساسيات البشرة' },
  { key: 'ingredients', label: 'المكونات' },
  { key: 'how-to',      label: 'طريقة الاستخدام' },
  { key: 'skin-types',  label: 'أنواع البشرة' },
  { key: 'mistakes',    label: 'أخطاء شائعة' },
  { key: 'hair-body',   label: 'العناية بالشعر والجسم' }
];

export default function Learn() {
  const [selectedCat, setSelectedCat] = useState('all');
  const [activeArticle, setActiveArticle] = useState(null);

  const filtered =
    selectedCat === 'all'
      ? articles
      : articles.filter((a) => a.categoryKey === selectedCat);

  return (
    <div className="pb-20 sm:pb-8">

      {/* Header */}
      <div className="bg-gradient-to-br from-teal-50 to-white py-12 px-4 sm:px-6 lg:px-8 border-b border-teal-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-teal-700 flex items-center justify-center shadow-teal">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs font-semibold text-teal-600 bg-teal-100 px-3 py-1 rounded-full border border-teal-200">
              مركز التوعية بالبشرة
            </span>
          </div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-teal-800 mb-3">
            اتعلم عن بشرتك
          </h1>
          <p className="text-teal-500 text-sm leading-relaxed max-w-xl">
            محتوى علمي مبسط لمساعدتك تفهم مكونات منتجاتك وتختارها صح وتستخدمها بصح.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((c) => (
            <button
              key={c.key}
              onClick={() => setSelectedCat(c.key)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                selectedCat === c.key
                  ? 'bg-teal-700 text-white shadow-teal'
                  : 'bg-white border border-teal-100 text-teal-600 hover:bg-teal-50'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Results count */}
        <div className="text-xs text-teal-400">
          {filtered.length} مقال متاح
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((article) => (
            <div
              key={article.id}
              className="bg-white rounded-2xl overflow-hidden border border-teal-100 card-hover group flex flex-col"
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
                  <span className="px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-700 font-semibold">
                    {article.category}
                  </span>
                  <span className="text-teal-400 flex items-center gap-1">
                    <BookOpen className="w-3 h-3" />
                    {article.readTime}
                  </span>
                </div>
                <h3 className="font-bold text-sm text-teal-800 group-hover:text-teal-600 transition-colors leading-snug flex-1">
                  {article.title}
                </h3>
                <p className="text-xs text-teal-500 line-clamp-2 leading-relaxed">
                  {article.summary}
                </p>
                <button
                  onClick={() => setActiveArticle(article)}
                  className="w-full py-2.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-700 text-xs font-bold transition-colors flex items-center justify-center gap-1.5 border border-teal-100"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  اقرأ المقال
                </button>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="p-12 text-center bg-teal-50 rounded-2xl border border-teal-100">
            <Droplets className="w-10 h-10 text-teal-300 mx-auto mb-3" />
            <p className="font-bold text-teal-700">لا توجد مقالات في هذه الفئة حالياً</p>
            <button onClick={() => setSelectedCat('all')} className="mt-3 text-xs px-4 py-2 rounded-xl bg-teal-700 text-white font-bold">
              عرض الكل
            </button>
          </div>
        )}
      </div>

      {/* Article Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-teal-900/50 backdrop-blur-sm">
          <div className="relative w-full max-w-3xl bg-white rounded-2xl p-6 sm:p-10 shadow-soft-xl border border-teal-100 max-h-[90vh] overflow-y-auto space-y-6 text-right animate-slideUp">

            <div className="flex items-start justify-between gap-4 pb-4 border-b border-teal-100">
              <div className="space-y-2">
                <span className="text-xs px-2.5 py-1 rounded-full bg-teal-100 text-teal-700 font-semibold">
                  {activeArticle.category}
                </span>
                <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-teal-800 leading-snug">
                  {activeArticle.title}
                </h2>
              </div>
              <button
                onClick={() => setActiveArticle(null)}
                className="p-2 rounded-xl text-teal-400 hover:text-teal-700 hover:bg-teal-50 flex-shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="aspect-[21/9] rounded-2xl overflow-hidden bg-teal-50">
              <img src={activeArticle.image} alt={activeArticle.title} className="w-full h-full object-cover" />
            </div>

            <div className="text-xs sm:text-sm text-teal-700 leading-relaxed space-y-4 whitespace-pre-line">
              {activeArticle.content}
            </div>

            {activeArticle.relatedProducts && (
              <div className="pt-4 border-t border-teal-100 space-y-3">
                <h4 className="font-bold text-sm text-teal-800">منتجات مرتبطة بهذا المقال:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeArticle.relatedProducts.map((pId) => {
                    const matched = products.find((p) => p.id === pId);
                    if (!matched) return null;
                    return (
                      <Link key={matched.id} to={`/products/${matched.id}`}
                        onClick={() => setActiveArticle(null)}
                        className="flex items-center gap-3 p-3 rounded-xl bg-teal-50 hover:bg-teal-100 transition-colors border border-teal-100"
                      >
                        <img src={matched.image} alt={matched.name} className="w-12 h-12 rounded-xl object-cover" />
                        <div className="flex-1 min-w-0">
                          <h5 className="font-bold text-xs text-teal-800 truncate">{matched.name}</h5>
                          <span className="text-[11px] font-bold text-teal-600">{matched.price} ج.م</span>
                        </div>
                        <ArrowLeft className="w-4 h-4 text-teal-400" />
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="flex justify-end">
              <button onClick={() => setActiveArticle(null)}
                className="px-6 py-2.5 rounded-xl bg-teal-700 text-white font-bold text-xs hover:bg-teal-800 transition-colors">
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
