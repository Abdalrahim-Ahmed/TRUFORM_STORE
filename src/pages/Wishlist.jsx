import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2, ArrowLeft, Star, Plus } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { products } from '../data/products';

export default function Wishlist() {
  const { wishlist, toggleWishlist, addToCart, addMultipleToCart } = useApp();

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  const handleAddAllToCart = () => {
    addMultipleToCart(wishlistProducts);
  };

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10 pb-20 sm:pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-teal-100 pb-6">
        <div className="text-right space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 text-teal-700 text-xs font-semibold">
            <Heart className="w-3.5 h-3.5 fill-teal-600 text-teal-600" />
            قائمتك المفضلة
          </div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-teal-800">
            المنتجات المحفوظة في المفضلة
          </h1>
          <p className="text-xs sm:text-sm text-teal-500">
            احتفظ بمنتجاتك المفضلة هنا وأضفها إلى سلتك للشراء في أي وقت.
          </p>
        </div>

        {wishlistProducts.length > 0 && (
          <button
            onClick={handleAddAllToCart}
            className="px-5 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs sm:text-sm shadow-teal transition-colors flex items-center gap-2 self-start sm:self-auto"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>إضافة الكل إلى سلة الشراء ({wishlistProducts.length})</span>
          </button>
        )}
      </div>

      {/* Products Grid or Empty State */}
      {wishlistProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {wishlistProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl overflow-hidden border border-teal-100 shadow-soft hover:shadow-soft-lg transition-all flex flex-col group"
            >
              {/* Image & Remove Action */}
              <div className="relative aspect-square overflow-hidden bg-teal-50">
                <Link to={`/products/${product.id}`} className="block w-full h-full">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </Link>
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="absolute top-2.5 left-2.5 p-2 rounded-xl bg-white/90 text-rose-600 hover:bg-white shadow-soft transition-colors"
                  title="حذف من المفضلة"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <span className="absolute top-2.5 right-2.5 text-[10px] px-2.5 py-0.5 rounded-full bg-white/95 text-teal-800 font-bold shadow-soft">
                  {product.categoryAr}
                </span>
              </div>

              {/* Content */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5 text-right">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1 text-teal-400">
                      <Star className="w-3.5 h-3.5 fill-teal-400" />
                      <span className="font-bold text-teal-700">{product.rating}</span>
                      <span className="text-[10px] text-teal-300">({product.reviewCount})</span>
                    </div>
                    <span className="text-[10px] text-teal-500">{product.skinTypesAr[0]}</span>
                  </div>

                  <Link to={`/products/${product.id}`}>
                    <h3 className="font-bold text-sm text-teal-800 hover:text-teal-600 transition-colors line-clamp-1">
                      {product.name}
                    </h3>
                  </Link>

                  <p className="text-xs text-teal-500 line-clamp-2 leading-relaxed">
                    {product.mainBenefit}
                  </p>
                </div>

                {/* Price and Cart Action */}
                <div className="pt-3 border-t border-teal-50 flex items-center justify-between gap-2">
                  <div>
                    <span className="text-base sm:text-lg font-extrabold text-teal-800">
                      {product.price}
                    </span>
                    <span className="text-xs text-teal-400 mr-1">ج.م</span>
                  </div>

                  <button
                    onClick={() => addToCart(product, 1)}
                    className="px-3.5 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs shadow-teal transition-all flex items-center gap-1.5"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>أضف للسلة</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-16 text-center max-w-md mx-auto space-y-4 bg-teal-50/50 rounded-3xl p-8 border border-teal-100">
          <div className="w-16 h-16 rounded-full bg-white text-teal-300 flex items-center justify-center mx-auto shadow-soft">
            <Heart className="w-8 h-8 stroke-[1.5]" />
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-lg text-teal-800">قائمة المفضلة فارغة حالياً</h3>
            <p className="text-xs text-teal-500 leading-relaxed">
              تصفح منتجات TRUFORM واضغط على رمز القلب لحفظ المنتجات التي تود تجربتها أو شرائها لاحقاً.
            </p>
          </div>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs shadow-teal transition-colors"
          >
            <span>استكشف المنتجات</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>
      )}
    </div>
  );
}
