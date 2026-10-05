import React, { createContext, useContext, useState, useEffect } from 'react';
import { products } from '../data/products';
import { initialReviews } from '../data/reviews';
import { initialTasks, campaignInfo } from '../data/teamTasks';
import { generateRoutineRecommendation } from '../utils/recommendationEngine';

const AppContext = createContext();

const STORAGE_KEYS = {
  ROUTINE: 'ns_my_routine_v1',
  QUIZ_ANSWERS: 'ns_quiz_answers_v1',
  QUIZ_RESULT: 'ns_quiz_result_v1',
  TEAM_TASKS: 'ns_team_tasks_v1',
  REVIEWS: 'ns_reviews_v1',
  CART: 'ns_cart_v1',
  WISHLIST: 'ns_wishlist_v1',
  ORDERS: 'ns_orders_v1',
  DISCOUNT: 'ns_discount_v1',
};

// Default starter routine if none exists
const defaultStarterRoutine = {
  morning: [
    {
      id: 'step-m-1',
      productId: 'prod-1',
      name: 'غسول الشاي الأخضر والزنك المنقي',
      stepNumber: 1,
      stepName: 'تنظيف الوجه اللطيف',
      instruction: 'غسيل بحركات دائرية لمدة 60 ثانية بماء فاتر.',
      frequency: 'يومياً صباحاً',
      image: products[0].image,
      price: products[0].price,
      completed: false
    },
    {
      id: 'step-m-2',
      productId: 'prod-3',
      name: 'سيروم النياسيناميد 10% والزنك المركز',
      stepNumber: 2,
      stepName: 'سيروم تقليص المسام وموازنة الدهون',
      instruction: '3 إلى 4 قطرات على راحة اليد ثم الطبطبة بلطف.',
      frequency: 'يومياً صباحاً',
      image: products[2].image,
      price: products[2].price,
      completed: false
    },
    {
      id: 'step-m-3',
      productId: 'prod-6',
      name: 'جل مرطب السيكا والألوفيرا المائي',
      stepNumber: 3,
      stepName: 'ترطيب وحبس الماء',
      instruction: 'كمية بحجم حبة الحمص وتدليك خفيف.',
      frequency: 'يومياً صباحاً',
      image: products[5].image,
      price: products[5].price,
      completed: false
    },
    {
      id: 'step-m-4',
      productId: 'prod-8',
      name: 'سائل واقي الشمس المعدني غير المرئي SPF 50+',
      stepNumber: 4,
      stepName: 'حماية كاملة من أشعة الشمس',
      instruction: 'كمية بطول إصبعين على الوجه والرقبة قبل الخروج بـ 15 دقيقة.',
      frequency: 'صباحاً قبل الخروج',
      image: products[7].image,
      price: products[7].price,
      completed: false
    }
  ],
  night: [
    {
      id: 'step-n-1',
      productId: 'prod-1',
      name: 'غسول الشاي الأخضر والزنك المنقي',
      stepNumber: 1,
      stepName: 'تنظيف وإزالة شوائب النهار',
      instruction: 'تنظيف الوجه جيداً لإزالة الأتربة وواقي الشمس.',
      frequency: 'يومياً مساءً',
      image: products[0].image,
      price: products[0].price,
      completed: false
    },
    {
      id: 'step-n-2',
      productId: 'prod-3',
      name: 'سيروم النياسيناميد 10% والزنك المركز',
      stepNumber: 2,
      stepName: 'علاج وتصحيح ليلي',
      instruction: 'تطبيق لطيف بالطبطبة لتوحيد اللون وتقليل التصبغ.',
      frequency: 'يومياً مساءً',
      image: products[2].image,
      price: products[2].price,
      completed: false
    },
    {
      id: 'step-n-3',
      productId: 'prod-6',
      name: 'جل مرطب السيكا والألوفيرا المائي',
      stepNumber: 3,
      stepName: 'ترطيب مهدئ أثناء النوم',
      instruction: 'تدليك مهدئ لمساعدة خلايا البشرة على الاستشفاء الليلي.',
      frequency: 'يومياً قبل النوم',
      image: products[5].image,
      price: products[5].price,
      completed: false
    }
  ]
};

export function AppProvider({ children }) {
  // Toast state
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: 'success' });
    }, 3500);
  };

  // Search Modal state
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Cart Drawer state
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Cart state (persisted)
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CART);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart', e);
    }
  }, [cart]);

  // Wishlist state (persisted array of product ids)
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.WISHLIST);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
    } catch (e) {
      console.error('Failed to save wishlist', e);
    }
  }, [wishlist]);

  // Discount code state
  const [discountCode, setDiscountCode] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.DISCOUNT) || '';
    } catch {
      return '';
    }
  });

  // Orders state (persisted)
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [lastOrder, setLastOrder] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    } catch (e) {
      console.error('Failed to save orders', e);
    }
  }, [orders]);

  // Routine state (persisted)
  const [routine, setRoutine] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ROUTINE);
      return saved ? JSON.parse(saved) : defaultStarterRoutine;
    } catch {
      return defaultStarterRoutine;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ROUTINE, JSON.stringify(routine));
    } catch (e) {
      console.error('Failed to save routine', e);
    }
  }, [routine]);

  // Quiz state (persisted)
  const [quizAnswers, setQuizAnswers] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.QUIZ_ANSWERS);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [quizResult, setQuizResult] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.QUIZ_RESULT);
      if (saved) return JSON.parse(saved);
      const answersSaved = localStorage.getItem(STORAGE_KEYS.QUIZ_ANSWERS);
      if (answersSaved) {
        return generateRoutineRecommendation(JSON.parse(answersSaved));
      }
      return null;
    } catch {
      return null;
    }
  });

  const saveQuizResult = (answers, result) => {
    setQuizAnswers(answers);
    setQuizResult(result);
    try {
      localStorage.setItem(STORAGE_KEYS.QUIZ_ANSWERS, JSON.stringify(answers));
      localStorage.setItem(STORAGE_KEYS.QUIZ_RESULT, JSON.stringify(result));
    } catch (e) {
      console.error('Failed to save quiz results', e);
    }
  };

  const applyQuizRoutineToMyRoutine = () => {
    if (!quizResult) return;

    const formattedMorning = quizResult.morningRoutine.map((item, idx) => ({
      id: `m-quiz-${idx}-${Date.now()}`,
      productId: item.product.id,
      name: item.product.name,
      stepNumber: item.stepNumber,
      stepName: item.stepName,
      instruction: item.instruction,
      frequency: item.frequency,
      image: item.product.image,
      price: item.product.price,
      completed: false
    }));

    const formattedNight = quizResult.nightRoutine.map((item, idx) => ({
      id: `n-quiz-${idx}-${Date.now()}`,
      productId: item.product.id,
      name: item.product.name,
      stepNumber: item.stepNumber,
      stepName: item.stepName,
      instruction: item.instruction,
      frequency: item.frequency,
      image: item.product.image,
      price: item.product.price,
      completed: false
    }));

    setRoutine({
      morning: formattedMorning,
      night: formattedNight
    });

    showToast('تم حفظ وتحديث روتينك المقترح في صفحة "روتينك اليومي" بنجاح!', 'success');
  };

  const clearQuiz = () => {
    setQuizAnswers(null);
    setQuizResult(null);
    localStorage.removeItem(STORAGE_KEYS.QUIZ_ANSWERS);
    localStorage.removeItem(STORAGE_KEYS.QUIZ_RESULT);
  };

  // Routine toggle completed
  const toggleRoutineStep = (stepId, period = 'morning') => {
    setRoutine((prev) => {
      const list = prev[period] || [];
      const updatedList = list.map((item) => {
        if (item.id === stepId) {
          return { ...item, completed: !item.completed };
        }
        return item;
      });
      return {
        ...prev,
        [period]: updatedList
      };
    });
  };

  // Add product to routine
  const addProductToRoutine = (product, period = 'both') => {
    setRoutine((prev) => {
      const newRoutine = { ...prev };
      const alreadyInMorning = newRoutine.morning.some((item) => item.productId === product.id);
      const alreadyInNight = newRoutine.night.some((item) => item.productId === product.id);

      if (period === 'morning' || period === 'both') {
        if (!alreadyInMorning) {
          newRoutine.morning = [
            ...newRoutine.morning,
            {
              id: `custom-m-${Date.now()}`,
              productId: product.id,
              name: product.name,
              stepNumber: newRoutine.morning.length + 1,
              stepName: product.categoryAr,
              instruction: product.usage?.howTo || 'طبق بحركات هادئة حسب التعليمات.',
              frequency: product.usage?.frequency || 'يومياً صباحاً',
              image: product.image,
              price: product.price,
              completed: false
            }
          ];
        }
      }

      if (period === 'night' || period === 'both') {
        if (!alreadyInNight) {
          newRoutine.night = [
            ...newRoutine.night,
            {
              id: `custom-n-${Date.now() + 1}`,
              productId: product.id,
              name: product.name,
              stepNumber: newRoutine.night.length + 1,
              stepName: product.categoryAr,
              instruction: product.usage?.howTo || 'طبق بحركات هادئة حسب التعليمات.',
              frequency: product.usage?.frequency || 'يومياً مساءً',
              image: product.image,
              price: product.price,
              completed: false
            }
          ];
        }
      }

      return newRoutine;
    });

    showToast(`تمت إضافة "${product.name}" إلى روتينك اليومي بنجاح!`, 'success');
  };

  const removeProductFromRoutine = (stepId, period) => {
    setRoutine((prev) => ({
      ...prev,
      [period]: prev[period].filter((item) => item.id !== stepId)
    }));
    showToast('تم حذف الخطوة من روتينك.', 'info');
  };

  const resetRoutineChecks = () => {
    setRoutine((prev) => ({
      morning: prev.morning.map((i) => ({ ...i, completed: false })),
      night: prev.night.map((i) => ({ ...i, completed: false }))
    }));
    showToast('تمت إعادة ضبط قائمة الروتين ليوم جديد!', 'info');
  };

  // ==========================================
  // SHOPPING & CART METHODS
  // ==========================================

  const addToCart = (product, quantity = 1, selectedSize = 'الحجم القياسي', openDrawer = true) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === selectedSize
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity
        };
        return updated;
      }

      return [
        ...prev,
        {
          id: `cart-${product.id}-${Date.now()}`,
          product,
          quantity,
          selectedSize
        }
      ];
    });

    showToast(`تمت إضافة "${product.name}" إلى سلة المشتريات!`, 'success');
    if (openDrawer) {
      setIsCartOpen(true);
    }
  };

  const updateCartQuantity = (cartItemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === cartItemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (cartItemId) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
    showToast('تم حذف المنتج من السلة.', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  // Add multiple products to cart (e.g. from quiz results or routine)
  const addMultipleToCart = (productsList, openDrawer = true) => {
    if (!productsList || productsList.length === 0) return;
    productsList.forEach((prod) => {
      addToCart(prod, 1, 'الحجم القياسي', false);
    });
    showToast(`تمت إضافة ${productsList.length} منتجات إلى سلتك بنجاح!`, 'success');
    if (openDrawer) {
      setIsCartOpen(true);
    }
  };

  // Cart calculations
  const cartSubtotal = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  // Discount logic
  let discountAmount = 0;
  if (discountCode === 'TRUFORM10') {
    discountAmount = Math.round(cartSubtotal * 0.1);
  } else if (discountCode === 'WELCOME50' && cartSubtotal >= 300) {
    discountAmount = 50;
  } else if (discountCode === 'MOTHER15') {
    discountAmount = Math.round(cartSubtotal * 0.15);
  }

  const applyDiscount = (code) => {
    const trimmed = (code || '').trim().toUpperCase();
    if (!trimmed) {
      setDiscountCode('');
      try { localStorage.removeItem(STORAGE_KEYS.DISCOUNT); } catch {}
      return { success: false, message: 'من فضلك أدخل كود الخصم' };
    }
    if (trimmed === 'TRUFORM10' || trimmed === 'WELCOME50' || trimmed === 'MOTHER15') {
      setDiscountCode(trimmed);
      try { localStorage.setItem(STORAGE_KEYS.DISCOUNT, trimmed); } catch {}
      showToast(`تم تطبيق كود الخصم "${trimmed}" بنجاح!`, 'success');
      return { success: true, message: 'تم تطبيق الكود بنجاح' };
    } else {
      showToast('كود الخصم غير صالح أو منتهي الصلاحية.', 'warning');
      return { success: false, message: 'كود الخصم غير صالح' };
    }
  };

  const removeDiscount = () => {
    setDiscountCode('');
    try { localStorage.removeItem(STORAGE_KEYS.DISCOUNT); } catch {}
    showToast('تمت إزالة كود الخصم.', 'info');
  };

  // Free shipping threshold = 500 EGP
  const freeShippingThreshold = 500;
  const shippingFee = cartSubtotal === 0 ? 0 : cartSubtotal >= freeShippingThreshold ? 0 : 50;
  const cartTotal = Math.max(0, cartSubtotal - discountAmount + shippingFee);

  // ==========================================
  // WISHLIST METHODS
  // ==========================================

  const toggleWishlist = (product) => {
    const productId = typeof product === 'object' ? product.id : product;
    const exists = wishlist.includes(productId);
    if (exists) {
      setWishlist((prev) => prev.filter((id) => id !== productId));
      showToast('تمت إزالة المنتج من قائمة المفضلة.', 'info');
    } else {
      setWishlist((prev) => [...prev, productId]);
      showToast('تمت إضافة المنتج إلى قائمة المفضلة! ❤️', 'success');
    }
  };

  const isInWishlist = (productId) => wishlist.includes(productId);
  const wishlistCount = wishlist.length;

  // ==========================================
  // ORDER CHECKOUT METHODS
  // ==========================================

  const placeOrder = (orderFormData) => {
    if (cart.length === 0) {
      showToast('سلة المشتريات فارغة!', 'warning');
      return null;
    }

    const orderNumber = `TRU-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder = {
      id: orderNumber,
      date: new Date().toLocaleDateString('ar-EG', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      items: [...cart],
      customer: {
        fullName: orderFormData.fullName,
        phone: orderFormData.phone,
        alternatePhone: orderFormData.alternatePhone || '',
        email: orderFormData.email || '',
        governorate: orderFormData.governorate,
        city: orderFormData.city,
        address: orderFormData.address,
        notes: orderFormData.notes || ''
      },
      paymentMethod: orderFormData.paymentMethod || 'الدفع عند الاستلام',
      subtotal: cartSubtotal,
      discountAmount,
      shippingFee,
      total: cartTotal,
      status: 'قيد التجهيز'
    };

    setOrders((prev) => [newOrder, ...prev]);
    setLastOrder(newOrder);
    clearCart();
    showToast(`تم تأكيد طلبك بنجاح برقم #${orderNumber}! 🎉`, 'success');
    return newOrder;
  };

  // Team Dashboard Tasks state
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TEAM_TASKS);
      return saved ? JSON.parse(saved) : initialTasks;
    } catch {
      return initialTasks;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.TEAM_TASKS, JSON.stringify(tasks));
    } catch (e) {
      console.error('Failed to save team tasks', e);
    }
  }, [tasks]);

  const updateTaskStatus = (taskId, newStatus) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
    );
    showToast(`تم تحديث حالة المهمة بنجاح إلى "${newStatus}"`, 'success');
  };

  const addTask = (taskData) => {
    const newTask = {
      id: `task-${Date.now()}`,
      ...taskData,
      status: taskData.status || 'To Do'
    };
    setTasks((prev) => [newTask, ...prev]);
    showToast('تمت إضافة المهمة الجديدة إلى جدول الحملة بنجاح!', 'success');
  };

  // Reviews state (persisted)
  const [reviews, setReviews] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.REVIEWS);
      return saved ? JSON.parse(saved) : initialReviews;
    } catch {
      return initialReviews;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
    } catch (e) {
      console.error('Failed to save reviews', e);
    }
  }, [reviews]);

  const addReview = (reviewData) => {
    const newRev = {
      id: `rev-${Date.now()}`,
      author: reviewData.author || 'عميل في مصر',
      city: reviewData.city || 'القاهرة',
      avatar: (reviewData.author || 'ع').slice(0, 2),
      rating: Number(reviewData.rating) || 5,
      date: 'الآن',
      skinType: reviewData.skinType || 'oily',
      skinTypeAr: reviewData.skinTypeAr || 'بشرة مختلطة',
      productId: reviewData.productId || 'prod-1',
      productName: reviewData.productName || 'منتج TRUFORM',
      title: reviewData.title || 'تجربة ممتازة ونتائج سريعة',
      content: reviewData.content,
      verifiedPurchase: true,
      helpfulCount: 1,
      tags: reviewData.tags || ['تجربة حقيقية', 'مشتري موثق']
    };
    setReviews((prev) => [newRev, ...prev]);
    showToast('شكراً لمشاركتك! تم نشر تقييمك الموثق بنجاح.', 'success');
  };

  const markReviewHelpful = (reviewId) => {
    setReviews((prev) =>
      prev.map((r) =>
        r.id === reviewId ? { ...r, helpfulCount: (r.helpfulCount || 0) + 1 } : r
      )
    );
    showToast('شكراً، تم تسجيل رأيك بأن هذا التقييم كان مفيداً!', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        // Toast
        toast,
        showToast,

        // Search
        isSearchOpen,
        setIsSearchOpen,

        // Cart Drawer & State
        isCartOpen,
        setIsCartOpen,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        addMultipleToCart,
        cartSubtotal,
        cartCount,
        discountCode,
        discountAmount,
        applyDiscount,
        removeDiscount,
        freeShippingThreshold,
        shippingFee,
        cartTotal,

        // Wishlist
        wishlist,
        toggleWishlist,
        isInWishlist,
        wishlistCount,

        // Orders & Checkout
        orders,
        lastOrder,
        placeOrder,

        // Routine
        routine,
        toggleRoutineStep,
        addProductToRoutine,
        removeProductFromRoutine,
        resetRoutineChecks,
        applyQuizRoutineToMyRoutine,

        // Quiz
        quizAnswers,
        quizResult,
        saveQuizResult,
        clearQuiz,

        // Team Tasks
        tasks,
        updateTaskStatus,
        addTask,
        campaignInfo,

        // Reviews
        reviews,
        addReview,
        markReviewHelpful
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
