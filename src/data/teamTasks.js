export const campaignInfo = {
  name: "حملة عيد الأم 2026 - باقات الإشراقة والترطيب",
  nameEn: "Mother's Day Sale Campaign 2026",
  startDate: "21 مارس 2026",
  targetLaunch: "21 مارس 2026 - 10:00 صباحاً",
  objective: "إطلاق باقات الهدايا الطبيعية مع تخفيضات خاصة وتقديم تجربة تسوق سلسة خالية من الأخطاء والتوتر المفاجئ للمستخدم وفريق العمل.",
  activeCheckpoint: "48h",
  urgentWarning: "⚠️ تنبيه عاجل: باقي 24 ساعة على انتهاء مرحلة تدقيق الروابط ومراجعة محتوى باقات عيد الأم لتجنب الضغط في ليلة الإطلاق.",
  checkpoints: [
    {
      id: "72h",
      title: "نقطة تفتيش 72 ساعة (72h Checkpoint)",
      phase: "تجهيز المحتوى والعروض",
      status: "Completed",
      statusAr: "مكتمل بنجاح",
      dueDate: "18 مارس 2026",
      summary: "تم اعتماد الباقات، وصياغة عروض الأسعار، وتجهيز تصميمات السوشيال ميديا.",
      badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300"
    },
    {
      id: "48h",
      title: "نقطة تفتيش 48 ساعة (48h Checkpoint)",
      phase: "فحص الجودة والإعلانات والروابط",
      status: "In Progress",
      statusAr: "قيد المراجعة الفعالة",
      dueDate: "19 مارس 2026",
      summary: "مراجعة كفاءة الإعلانات الممولة، اختبار سلاسل الطلب، وتدقيق دقة مواصفات المنتجات.",
      badgeColor: "bg-amber-100 text-amber-800 border-amber-300"
    },
    {
      id: "24h",
      title: "نقطة تفتيش 24 ساعة (24h Checkpoint)",
      phase: "الموافقة النهائية وجاهزية المتجر",
      status: "Pending",
      statusAr: "قيد الانتظار",
      dueDate: "20 مارس 2026",
      summary: "فحص أخير لسيرفر الموقع، التأكد من توافر المخزون في المستودعات وتدريب فريق خدمة العملاء.",
      badgeColor: "bg-stone-100 text-stone-700 border-stone-300"
    },
    {
      id: "launch",
      title: "ساعة الصفر (Launch Hour)",
      phase: "انطلاق الحملة ومراقبة الأداء",
      status: "Upcoming",
      statusAr: "قادمة",
      dueDate: "21 مارس 2026",
      summary: "تفعيل أكواد الخصم، نشر الحملة على منصات التواصل، ومراقبة لوحة مبيعات المتجر اللحظية.",
      badgeColor: "bg-sage-100 text-sage-800 border-sage-300"
    }
  ]
};

export const initialTasks = [
  // 72 Hours Tasks
  {
    id: "task-1",
    title: "صياغة وتدقيق نصوص عروض وباقات عيد الأم",
    checkpoint: "72h",
    checkpointLabel: "72 ساعة",
    assignee: { name: "سلمى المنشاوي", role: "صانعة محتوى", avatar: "SM" },
    deadline: "18 مارس - 2:00 م",
    priority: "عالية",
    status: "Done",
    notes: "تمت مراجعة النصوص والتأكد من مطابقتها لنبرة البراند الدافئة وتجنب الوعود الطبية المضللة."
  },
  {
    id: "task-2",
    title: "تصميم البانرات الإعلانية ومقاسات إنستغرام وتيك توك",
    checkpoint: "72h",
    checkpointLabel: "72 ساعة",
    assignee: { name: "أحمد رامي", role: "مصمم جرافيك", avatar: "AR" },
    deadline: "18 مارس - 5:00 م",
    priority: "عالية",
    status: "Done",
    notes: "تم تسليم 12 قالباً مرئياً بنغمات الألوان الطبيعية (أخضر زيتي وبيج ناعم)."
  },
  {
    id: "task-3",
    title: "تحديد المخزون المخصص لباقات عيد الأم في المخازن",
    checkpoint: "72h",
    checkpointLabel: "72 ساعة",
    assignee: { name: "عمر خيري", role: "مسؤول العمليات والمخزون", avatar: "OK" },
    deadline: "18 مارس - 6:00 م",
    priority: "متوسطة",
    status: "Done",
    notes: "تم تخصيص 600 علبة هدية تشمل سيروم الهيالورونيك والغسول اللطيف."
  },

  // 48 Hours Tasks
  {
    id: "task-4",
    title: "مراجعة إعلانات فيسبوك وتيك توك والتأكد من توافق السياسات",
    checkpoint: "48h",
    checkpointLabel: "48 ساعة",
    assignee: { name: "مريم حسن", role: "مديرة التسويق الرقمي", avatar: "MH" },
    deadline: "19 مارس - 1:00 م",
    priority: "عالية",
    status: "In Progress",
    notes: "مراجعة نصوص الإعلانات لتجنب حظرها والتأكد من أن الاستهداف محدد للمدن الرئيسية في مصر."
  },
  {
    id: "task-5",
    title: "مراجعة ومطابقة معلومات المنتجات وأسعار التخفيضات في المتجر",
    checkpoint: "48h",
    checkpointLabel: "48 ساعة",
    assignee: { name: "يوسف عادل", role: "مشرف الكتالوج والمنتجات", avatar: "YA" },
    deadline: "19 مارس - 4:00 م",
    priority: "عالية",
    status: "In Progress",
    notes: "مراجعة أسعار الباقات والتأكد من عدم وجود تضارب في نسب الخصم المعلنة."
  },
  {
    id: "task-6",
    title: "فحص جميع الروابط (UTM Links) وأزرار توجيه كويز البشرة",
    checkpoint: "48h",
    checkpointLabel: "48 ساعة",
    assignee: { name: "طارق سليم", role: "مطور الواجهة والبيانات", avatar: "TS" },
    deadline: "19 مارس - 7:00 م",
    priority: "عالية",
    status: "Review",
    notes: "فحص مسار الانتقال من إعلان الحملة إلى صفحة الباقة واختبار البشرة المخصص."
  },

  // 24 Hours Tasks
  {
    id: "task-7",
    title: "الموافقة الإدارية النهائية على جدول نشر الحملة وتوقيتات النشر",
    checkpoint: "24h",
    checkpointLabel: "24 ساعة",
    assignee: { name: "داليا شريف", role: "المديرة التنفيذية", avatar: "DS" },
    deadline: "20 مارس - 11:00 ص",
    priority: "عالية",
    status: "Pending",
    notes: "مراجعة الجدول الزمني ومطابقته مع ميزانية الحملة المرصودة."
  },
  {
    id: "task-8",
    title: "فحص ضغط خوادم الموقع وسرعة تحميل صفحات الهبوط",
    checkpoint: "24h",
    checkpointLabel: "24 ساعة",
    assignee: { name: "طارق سليم", role: "مطور الواجهة والبيانات", avatar: "TS" },
    deadline: "20 مارس - 2:00 م",
    priority: "متوسطة",
    status: "To Do",
    notes: "التأكد من أن سيرفر الويب قادر على استقبال حركة الزوار المكثفة بدون بطء."
  },
  {
    id: "task-9",
    title: "تجهيز ردود خدمة العملاء التلقائية والأسئلة الشائعة في الواتساب",
    checkpoint: "24h",
    checkpointLabel: "24 ساعة",
    assignee: { name: "سلمى المنشاوي", role: "صانعة محتوى", avatar: "SM" },
    deadline: "20 مارس - 5:00 م",
    priority: "متوسطة",
    status: "To Do",
    notes: "تجهيز قوالب الردود السريعة بخصوص الشحن ومواعيد التوصيل لعيد الأم."
  },

  // Launch Tasks
  {
    id: "task-10",
    title: "تفعيل أكواد الخصم والبانر الرئيسي على الصفحة الرئيسية",
    checkpoint: "launch",
    checkpointLabel: "ساعة الصفر",
    assignee: { name: "طارق سليم", role: "مطور الواجهة", avatar: "TS" },
    deadline: "21 مارس - 9:30 ص",
    priority: "عالية",
    status: "To Do",
    notes: "تفعيل كوبون 'MOM20' وبدء الحملة الإعلانية رسمياً."
  },
  {
    id: "task-11",
    title: "متابعة تدفق الطلبات وأي رسائل دعم فني خلال أول 3 ساعات",
    checkpoint: "launch",
    checkpointLabel: "ساعة الصفر",
    assignee: { name: "عمر خيري", role: "مسؤول العمليات", avatar: "OK" },
    deadline: "21 مارس - 1:00 م",
    priority: "عالية",
    status: "To Do",
    notes: "غرفة عمليات فورية لحل أي تعثر يواجه العملاء أثناء الدفع أو ملء العنوان."
  }
];
