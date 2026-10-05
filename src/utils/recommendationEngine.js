import { products } from '../data/products';

export function generateRoutineRecommendation(answers) {
  const {
    skinType = 'combination',
    concern = 'acne',
    sensitive = 'no',
    goal = 'acne_reduction',
    experience = 'beginner'
  } = answers;

  // Determine Primary Cleanser
  let morningCleanserId = 'prod-1';
  let cleanserReason = '';

  if (skinType === 'dry' || skinType === 'sensitive' || sensitive === 'yes') {
    morningCleanserId = 'prod-2'; // Gentle Ceramide & Oat Cleanser
    cleanserReason = 'اخترنا غسول السيراميد والشوفان لأنه فائق اللطف وينظف بدون أي رغوة قاسية، مما يحمي بشرتك الحساسة/الجافة من أي شد أو التهاب.';
  } else {
    morningCleanserId = 'prod-1'; // Green Tea & Zinc Gel Cleanser
    cleanserReason = 'اخترنا غسول الشاي الأخضر والزنك لمساعدتك في التحكم بإفراز الدهون في مسامات الوجه وتهدئة الحبوب بدون تجفيف الجلد.';
  }

  // Determine Morning Serum
  let morningSerumId = 'prod-3';
  let morningSerumReason = '';

  if (goal === 'hydration' || skinType === 'dry' || concern === 'dryness') {
    morningSerumId = 'prod-4'; // Hyaluronic Acid + B5
    morningSerumReason = 'اخترنا سيروم الهيالورونيك 4D ليعوض النقص المائي ويوفر ترطيباً متغلغلاً يدوم طوال اليوم خاصة مع تكييف الهواء أو حرارة الجو.';
  } else if (goal === 'even_tone' || concern === 'pigmentation' || concern === 'dullness' || goal === 'overall_glow') {
    morningSerumId = 'prod-5'; // Stable Vitamin C 12%
    morningSerumReason = 'اخترنا سيروم فيتامين C المستقر 12% لتوحيد لون البشرة وحمايتها من أكسدة الشمس والتصبغات البنية الناتجة عن الأشعة فوق البنفسجية.';
  } else {
    morningSerumId = 'prod-3'; // Niacinamide 10% + Zinc
    morningSerumReason = 'اخترنا سيروم النياسيناميد والزنك لتقليل مظهر المسام الواسعة وموازنة إفراز الدهون الصباحي ومنع تكون الحبوب الجديدة.';
  }

  // Determine Moisturizer
  let moisturizerId = 'prod-6';
  let moisturizerReason = '';

  if (skinType === 'dry' || concern === 'dryness') {
    moisturizerId = 'prod-7'; // Barrier Restoring Ceramide Cream
    moisturizerReason = 'اخترنا كريم السيراميد وزبدة الشيا الغني ليرمم الطبقة الدهنية الواقية للبشرة ويمنع التقشر ويعيد النعومة الطبيعية.';
  } else {
    moisturizerId = 'prod-6'; // Calming Cica & Aloe Water Gel
    moisturizerReason = 'اخترنا جل السيكا المائي لأنه شديد الخفة وخالٍ تماماً من الزيوت، فيمنحك ترطيباً مهدئاً دون أي لمعان أو انسداد للمسام.';
  }

  // Sunscreen (Essential for Morning)
  const sunscreenId = 'prod-8'; // Invisible Mineral Fluid Sunscreen SPF 50+
  const sunscreenReason = 'واقي الشمس غير المرئي SPF 50+ هو الخطوة الأهم لحماية نتائج روتينك من التصبغات والشمس المصرية دون ترك أي علامات بيضاء.';

  // Determine Night Treatment
  let nightTreatmentId = 'prod-3';
  let nightTreatmentReason = '';

  if (concern === 'acne' && (experience === 'intermediate' || experience === 'advanced')) {
    nightTreatmentId = 'prod-9'; // 2% BHA Liquid
    nightTreatmentReason = 'اخترنا مقشر حمض الساليسيليك 2% BHA كعلاج ليلي (2-3 مرات أسبوعياً) لإذابة الدهون والرؤوس السوداء من داخل بطانة المسام.';
  } else if (concern === 'pigmentation' || goal === 'even_tone') {
    nightTreatmentId = 'prod-3'; // Niacinamide
    nightTreatmentReason = 'اخترنا النياسيناميد 10% ليلاً ليعمل بهدوء على توحيد اللون ودعم تجديد خلايا الجلد أثناء النوم.';
  } else if (concern === 'dryness' || skinType === 'dry') {
    nightTreatmentId = 'prod-4'; // Hyaluronic Acid
    nightTreatmentReason = 'اخترنا سيروم الهيالورونيك المركّب لحبس الرطوبة ومساعدة خلايا الجلد على الاستشفاء والامتلاء ليلاً.';
  } else if (concern === 'acne') {
    nightTreatmentId = 'prod-10'; // Tea tree spot treatment
    nightTreatmentReason = 'اخترنا علاج شجرة الشاي والزنك كخطوة موضعية فورية على أي حبة ملتهبة لتهدئتها وتفادي ترك آثار غامقة.';
  } else {
    nightTreatmentId = 'prod-3';
    nightTreatmentReason = 'اخترنا النياسيناميد لدعم تماسك الجلد وموازنة المسام في ساعات الراحة الليلية.';
  }

  // Find full product objects
  const getProduct = (id) => products.find((p) => p.id === id) || products[0];

  const morningCleanser = getProduct(morningCleanserId);
  const morningSerum = getProduct(morningSerumId);
  const morningMoisturizer = getProduct(moisturizerId);
  const sunscreen = getProduct(sunscreenId);

  const nightCleanser = morningCleanser; // Can use same gentle cleanser
  const nightTreatment = getProduct(nightTreatmentId);
  const nightMoisturizer = morningMoisturizer;

  const morningRoutine = [
    {
      stepNumber: 1,
      stepName: "تنظيف لطيف",
      product: morningCleanser,
      reason: cleanserReason,
      frequency: "يومياً صباحاً",
      instruction: morningCleanser.usage.howTo
    },
    {
      stepNumber: 2,
      stepName: "علاج ونضارة",
      product: morningSerum,
      reason: morningSerumReason,
      frequency: "يومياً صباحاً",
      instruction: morningSerum.usage.howTo
    },
    {
      stepNumber: 3,
      stepName: "ترطيب متوازن",
      product: morningMoisturizer,
      reason: moisturizerReason,
      frequency: "يومياً صباحاً",
      instruction: morningMoisturizer.usage.howTo
    },
    {
      stepNumber: 4,
      stepName: "حماية من الشمس",
      product: sunscreen,
      reason: sunscreenReason,
      frequency: "يومياً قبل الخروج بـ 15 دقيقة",
      instruction: sunscreen.usage.howTo
    }
  ];

  const nightRoutine = [
    {
      stepNumber: 1,
      stepName: "تنظيف وإزالة شوائب اليوم",
      product: nightCleanser,
      reason: "تنظيف آثار الأتربة والغبار وعوادم الشارع وواقي الشمس لتحضير المسام لامتصاص المغذيات.",
      frequency: "يومياً مساءً",
      instruction: nightCleanser.usage.howTo
    },
    {
      stepNumber: 2,
      stepName: "علاج وتجديد ليلي",
      product: nightTreatment,
      reason: nightTreatmentReason,
      frequency: nightTreatment.category === 'treatment' ? "2-3 مرات أسبوعياً" : "يومياً مساءً",
      instruction: nightTreatment.usage.howTo
    },
    {
      stepNumber: 3,
      stepName: "ترطيب وترميم ليلي",
      product: nightMoisturizer,
      reason: moisturizerReason,
      frequency: "يومياً قبل النوم",
      instruction: nightMoisturizer.usage.howTo
    }
  ];

  // Arabic labels for user profile summary
  const skinTypeLabels = {
    oily: 'بشرة دهنية',
    dry: 'بشرة جافة',
    combination: 'بشرة مختلطة',
    sensitive: 'بشرة حساسة',
    not_sure: 'بشرة غير محددة (متوسطة)'
  };

  const concernLabels = {
    acne: 'حب الشباب والبثور',
    dryness: 'الجفاف والتقشر',
    pigmentation: 'التصبغات والبقع الداكنة',
    pores: 'المسام الواسعة واللمعان',
    redness: 'الاحمرار والتهيج',
    dullness: 'بهتان وفقدان النضارة'
  };

  const goalLabels = {
    hydration: 'ترطيب عميق وحبس الماء',
    cleansing: 'تنظيف المسام والتحكم بالدهون',
    acne_reduction: 'تقليل الحبوب وتهدئة الالتهاب',
    even_tone: 'توحيد لون البشرة وتفتيح الآثار',
    overall_glow: 'تحسين مظهر البشرة وإشراقة طبيعية'
  };

  const experienceLabels = {
    beginner: 'مبتدئ (يفضل روتين مبسط وواضح)',
    intermediate: 'متوسط (معتاد على بعض المكونات)',
    advanced: 'متقدم (مستعد لاستخدام أحماض مركزة)'
  };

  // Strategic trust rationale based on Egyptian environment
  const whyExplanation = `بناءً على إجاباتك، قمنا بتخصيص هذا الروتين ليتناسب مع طبيعة بشرتك (${skinTypeLabels[skinType] || 'المختارة'}) ومعالجة المشكلة الأساسية (${concernLabels[concern] || 'المحددة'}). 
تمت مراعاة العوامل البيئية في مصر كالحرارة والرطوبة والغبار، عبر اختيار قوام خفيف سريع الامتصاص، خالٍ من المواد المسببة لانسداد المسام (Non-Comedogenic)، وبمكونات معملية موثوقة ومدروسة طبياً.`;

  return {
    summary: {
      skinType: skinTypeLabels[skinType] || skinType,
      concern: concernLabels[concern] || concern,
      goal: goalLabels[goal] || goal,
      isSensitive: sensitive === 'yes',
      experience: experienceLabels[experience] || experience
    },
    whyExplanation,
    morningRoutine,
    nightRoutine,
    disclaimer: "هذه التوصيات مقدمة كدليل إرشادي تعليمي مبني على أسس العناية التجميلية بالبشرة وليست تشخيصاً طبياً علاجياً لحالات مرضية خاصة. في حالة الأمراض الجلدية المزمنة، استشر طبيب جلدية مختص دائماً."
  };
}
