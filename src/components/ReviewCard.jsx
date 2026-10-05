import React from 'react';
import { Star, CheckCircle, ThumbsUp } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function ReviewCard({ review }) {
  const { markReviewHelpful } = useApp();

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 border border-teal-100 shadow-soft hover:shadow-soft-lg transition-all flex flex-col justify-between card-hover">
      <div>
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-800 font-bold text-sm flex items-center justify-center border border-teal-200">
              {review.avatar || 'ع'}
            </div>
            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <h4 className="font-bold text-sm text-teal-800">{review.author}</h4>
                {review.verifiedPurchase && (
                  <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200 font-semibold">
                    <CheckCircle className="w-3 h-3 text-teal-600" />
                    مشتري موثق
                  </span>
                )}
              </div>
              <p className="text-[11px] text-teal-400 mt-0.5">{review.city} • {review.date}</p>
            </div>
          </div>

          {/* Stars */}
          <div className="flex items-center gap-1 bg-teal-50 px-2 py-1 rounded-xl border border-teal-100">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${
                  i < review.rating ? 'fill-teal-400 text-teal-400' : 'text-stone-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Product & Skin Tag */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="text-xs px-2.5 py-0.5 rounded-lg bg-teal-50 text-teal-800 font-medium border border-teal-100">
            {review.skinTypeAr}
          </span>
          <span className="text-xs text-teal-500 font-medium">
            المنتج: <span className="text-teal-800 font-semibold">{review.productName}</span>
          </span>
        </div>

        {/* Title & Content */}
        {review.title && (
          <h5 className="font-bold text-sm text-teal-800 mb-1.5 leading-snug">
            "{review.title}"
          </h5>
        )}
        <p className="text-xs sm:text-sm text-teal-600 leading-relaxed">
          {review.content}
        </p>

        {/* Tags */}
        {review.tags && review.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {review.tags.map((tag, idx) => (
              <span key={idx} className="text-[11px] text-teal-500 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-100">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Helpful button */}
      <div className="mt-4 pt-3 border-t border-teal-50 flex items-center justify-between text-xs text-teal-500">
        <span>هل كانت هذه التجربة مفيدة لك؟</span>
        <button
          onClick={() => markReviewHelpful(review.id)}
          className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-700 font-medium transition-colors"
        >
          <ThumbsUp className="w-3.5 h-3.5 text-teal-600" />
          <span>مفيد ({review.helpfulCount || 0})</span>
        </button>
      </div>
    </div>
  );
}
