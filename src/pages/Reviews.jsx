import React, { useState, useMemo } from 'react';
import { Star, MessageSquarePlus, X, Droplets } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { reviewStats } from '../data/reviews';
import { products } from '../data/products';

export default function Reviews() {
  const { reviews, addReview } = useApp();
  const [filter, setFilter] = useState('all');
  const [productFilter, setProductFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form state
  const [author, setAuthor] = useState('');
  const [city, setCity] = useState('');
  const [skinType, setSkinType] = useState('oily');
  const [skinTypeAr, setSkinTypeAr] = useState('بشرة دهنية');
  const [productId, setProductId] = useState(products[0]?.id || 'prod-1');
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const filterOptions = [
    { k: 'all', l: 'الكل' }, { k: '5star', l: '5 ⭐' }, { k: '4star', l: '4 ⭐' },
    { k: 'oily', l: 'دهنية' }, { k: 'dry', l: 'جافة' }, { k: 'sensitive', l: 'حساسة' }
  ];

  const filteredReviews = useMemo(() => {
    return reviews.filter((r) => {
      if (productFilter !== 'all' && r.productId !== productFilter) return false;
      if (filter === '5star') return r.rating === 5;
      if (filter === '4star') return r.rating === 4;
      if (filter === 'oily') return r.skinType === 'oily';
      if (filter === 'dry') return r.skinType === 'dry';
      if (filter === 'sensitive') return r.skinType === 'sensitive';
      return true;
    });
  }, [reviews, filter, productFilter]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!author.trim() || !content.trim()) return;
    const matchedProd = products.find((p) => p.id === productId);
    addReview({
      author: author.trim(),
      city: city.trim() || 'القاهرة',
      rating,
      skinType,
      skinTypeAr,
      productId,
      productName: matchedProd?.name || 'منتج TRUFORM',
      title: title.trim() || 'تجربة استخدام واقعية',
      content: content.trim(),
      tags: ['مشتري موثق', 'تجربة مصرية']
    });
    setAuthor(''); setCity(''); setTitle(''); setContent('');
    setIsModalOpen(false);
  };

  return (
    <div className="pb-20 sm:pb-8">

      {/* Header */}
      <div className="bg-gradient-to-br from-teal-50 to-white py-12 px-4 sm:px-6 lg:px-8 border-b border-teal-100">
        <div className="max-w-7xl mx-auto text-center max-w-2xl">
          <span className="text-xs font-semibold text-teal-500 uppercase tracking-widest">تجارب موثقة</span>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-teal-800 mt-2">
            تجارب حقيقية من عملائنا
          </h1>
          <p className="text-teal-500 text-sm mt-3 leading-relaxed">
            قصص وتجارب ناس فعلاً ساعدناهم يتخذوا قرارات أفضل لبشرتهم.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">

        {/* Stats Card */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-teal-100 shadow-soft">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            {/* Bars */}
            <div className="lg:col-span-2 space-y-3">
              {reviewStats.breakdown.map((b) => (
                <div key={b.stars} className="flex items-center gap-3 text-xs">
                  <div className="flex items-center gap-0.5 shrink-0 w-24 justify-end">
                    {[...Array(b.stars)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-teal-400 text-teal-400" />
                    ))}
                  </div>
                  <div className="flex-1 bg-teal-100 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-teal-500 h-full rounded-full transition-all"
                      style={{ width: `${b.percentage}%` }}
                    />
                  </div>
                  <span className="w-8 text-teal-400 shrink-0 text-left">{b.percentage}%</span>
                </div>
              ))}
            </div>

            {/* Score */}
            <div className="flex flex-col items-center text-center gap-4">
              <div>
                <div className="text-5xl font-extrabold text-teal-800">{reviewStats.averageRating}</div>
                <div className="flex justify-center gap-0.5 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-teal-400 text-teal-400" />
                  ))}
                </div>
                <p className="text-xs text-teal-400 mt-1">{reviewStats.totalReviews} تقييم موثق</p>
              </div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold transition-colors shadow-teal"
              >
                <MessageSquarePlus className="w-4 h-4" />
                اكتب تقييمك
              </button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {filterOptions.map((f) => (
              <button
                key={f.k}
                onClick={() => setFilter(f.k)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  filter === f.k
                    ? 'bg-teal-700 text-white shadow-teal'
                    : 'bg-white border border-teal-100 text-teal-600 hover:bg-teal-50'
                }`}
              >
                {f.l}
              </button>
            ))}
          </div>
          <select
            value={productFilter}
            onChange={(e) => setProductFilter(e.target.value)}
            className="p-2 rounded-xl bg-white border border-teal-100 text-xs font-medium text-teal-700 focus:outline-none focus:border-teal-400"
          >
            <option value="all">كل المنتجات</option>
            {products.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
        </div>

        {/* Reviews Grid */}
        {filteredReviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredReviews.map((rev) => (
              <div key={rev.id} className="bg-white rounded-2xl p-5 border border-teal-100 space-y-3 card-hover">
                <div className="flex items-center justify-between">
                  <span className="text-xs px-2.5 py-1 rounded-full bg-teal-100 text-teal-700 font-semibold">
                    تجربة موثقة ✓
                  </span>
                  <div className="flex items-center gap-0.5 text-teal-400">
                    {[...Array(rev.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-teal-400" />
                    ))}
                    <span className="text-xs font-bold text-teal-700 mr-1">{rev.rating}</span>
                  </div>
                </div>

                {rev.title && (
                  <p className="text-xs font-bold text-teal-700">"{rev.title}"</p>
                )}
                <p className="text-xs text-teal-600 leading-relaxed line-clamp-4">{rev.content}</p>

                <div className="flex items-center justify-between border-t border-teal-50 pt-3">
                  <span className="text-[10px] text-teal-300">{rev.skinTypeAr} • {rev.city}</span>
                  <div className="flex items-center gap-1.5">
                    <span className="w-7 h-7 rounded-full bg-teal-700 text-white flex items-center justify-center text-[10px] font-bold">
                      {rev.avatar || rev.author?.slice(0,1) || 'ع'}
                    </span>
                    <div className="text-right">
                      <div className="font-semibold text-teal-800 text-[11px]">{rev.author}</div>
                      <div className="text-[10px] text-teal-400">{rev.date}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center bg-teal-50 rounded-2xl border border-teal-100 space-y-3">
            <Droplets className="w-10 h-10 text-teal-300 mx-auto" />
            <p className="font-bold text-teal-800">لا توجد تقييمات بهذا الفلتر</p>
            <button onClick={() => { setFilter('all'); setProductFilter('all'); }}
              className="text-xs px-4 py-2 rounded-xl bg-teal-700 text-white font-bold">
              عرض الكل
            </button>
          </div>
        )}
      </div>

      {/* Add Review Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-teal-900/50 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-white rounded-2xl p-6 sm:p-8 shadow-soft-xl border border-teal-100 max-h-[90vh] overflow-y-auto animate-slideUp">
            <div className="flex items-center justify-between pb-4 border-b border-teal-100 mb-5">
              <h3 className="font-bold text-base text-teal-800 flex items-center gap-2">
                <MessageSquarePlus className="w-5 h-5 text-teal-600" />
                أضف تقييمك
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1.5 rounded-lg text-teal-400 hover:text-teal-700 hover:bg-teal-50">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-right">
              <div>
                <label className="block text-xs font-bold text-teal-600 mb-1.5">المنتج</label>
                <select value={productId} onChange={(e) => setProductId(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-teal-50 border border-teal-100 text-xs text-teal-700 focus:outline-none focus:border-teal-400">
                  {products.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-teal-600 mb-1.5">اسمك</label>
                  <input type="text" required placeholder="ياسمين" value={author} onChange={(e) => setAuthor(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-teal-50 border border-teal-100 text-xs text-teal-700 focus:outline-none focus:border-teal-400" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-teal-600 mb-1.5">المحافظة</label>
                  <input type="text" placeholder="القاهرة" value={city} onChange={(e) => setCity(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-teal-50 border border-teal-100 text-xs text-teal-700 focus:outline-none focus:border-teal-400" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-teal-600 mb-1.5">نوع البشرة</label>
                  <select value={skinType} onChange={(e) => {
                    setSkinType(e.target.value);
                    const m = { oily: 'بشرة دهنية', dry: 'بشرة جافة', combination: 'بشرة مختلطة', sensitive: 'بشرة حساسة' };
                    setSkinTypeAr(m[e.target.value] || 'بشرة عادية');
                  }} className="w-full p-2.5 rounded-xl bg-teal-50 border border-teal-100 text-xs text-teal-700 focus:outline-none focus:border-teal-400">
                    <option value="oily">دهنية</option>
                    <option value="dry">جافة</option>
                    <option value="combination">مختلطة</option>
                    <option value="sensitive">حساسة</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-teal-600 mb-1.5">التقييم</label>
                  <select value={rating} onChange={(e) => setRating(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl bg-teal-50 border border-teal-100 text-xs text-teal-700 focus:outline-none focus:border-teal-400">
                    <option value={5}>⭐⭐⭐⭐⭐ ممتاز</option>
                    <option value={4}>⭐⭐⭐⭐ جيد جداً</option>
                    <option value={3}>⭐⭐⭐ جيد</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-teal-600 mb-1.5">عنوان التقييم</label>
                <input type="text" placeholder="تجربة ممتازة..." value={title} onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-teal-50 border border-teal-100 text-xs text-teal-700 focus:outline-none focus:border-teal-400" />
              </div>
              <div>
                <label className="block text-xs font-bold text-teal-600 mb-1.5">تفاصيل تجربتك</label>
                <textarea required rows={4} placeholder="اكتب تجربتك بالتفصيل..."
                  value={content} onChange={(e) => setContent(e.target.value)}
                  className="w-full p-3 rounded-xl bg-teal-50 border border-teal-100 text-xs text-teal-700 focus:outline-none focus:border-teal-400 resize-none" />
              </div>
              <div className="flex justify-end gap-2 pt-1">
                <button type="button" onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-teal-50 text-teal-600 text-xs font-bold border border-teal-100">
                  إلغاء
                </button>
                <button type="submit"
                  className="px-6 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold transition-colors shadow-teal">
                  نشر التقييم
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
