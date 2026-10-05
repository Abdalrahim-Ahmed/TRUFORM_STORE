import React, { useState, useMemo } from 'react';
import {
  Clock,
  AlertTriangle,
  Users,
  Plus,
  Sparkles,
  CheckCircle2,
  X
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function TeamDashboard() {
  const { tasks, updateTaskStatus, addTask, campaignInfo } = useApp();

  const [activeCheckpointFilter, setActiveCheckpointFilter] = useState('all'); // 'all', '72h', '48h', '24h', 'launch'
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);

  // New task form state
  const [newTitle, setNewTitle] = useState('');
  const [newCheckpoint, setNewCheckpoint] = useState('48h');
  const [newAssigneeName, setNewAssigneeName] = useState('مريم حسن');
  const [newAssigneeRole, setNewAssigneeRole] = useState('مديرة التسويق');
  const [newDeadline, setNewDeadline] = useState('20 مارس - 12:00 م');
  const [newPriority, setNewPriority] = useState('عالية');
  const [newNotes, setNewNotes] = useState('');

  // Calculate stats
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === 'Done').length;
  const inProgressTasks = tasks.filter((t) => t.status === 'In Progress').length;
  const reviewTasks = tasks.filter((t) => t.status === 'Review').length;
  const todoTasks = tasks.filter((t) => t.status === 'To Do').length;

  const campaignProgress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Filter tasks
  const filteredTasks = useMemo(() => {
    return tasks.filter((t) => {
      if (activeCheckpointFilter !== 'all' && t.checkpoint !== activeCheckpointFilter) {
        return false;
      }
      if (priorityFilter !== 'all' && t.priority !== priorityFilter) {
        return false;
      }
      return true;
    });
  }, [tasks, activeCheckpointFilter, priorityFilter]);

  const handleCreateTask = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const checkpointLabels = {
      '72h': '72 ساعة',
      '48h': '48 ساعة',
      '24h': '24 ساعة',
      launch: 'ساعة الصفر'
    };

    addTask({
      title: newTitle.trim(),
      checkpoint: newCheckpoint,
      checkpointLabel: checkpointLabels[newCheckpoint] || '48 ساعة',
      priority: newPriority,
      deadline: newDeadline,
      notes: newNotes.trim() || 'لا توجد ملاحظات إضافية.',
      assignee: {
        name: newAssigneeName,
        role: newAssigneeRole,
        avatar: newAssigneeName.slice(0, 2)
      }
    });

    setNewTitle('');
    setNewNotes('');
    setIsAddTaskModalOpen(false);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Done':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'In Progress':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'Review':
        return 'bg-blue-50 text-blue-800 border-blue-200';
      case 'To Do':
      default:
        return 'bg-stone-100 text-stone-700 border-stone-200';
    }
  };

  const getPriorityBadge = (p) => {
    switch (p) {
      case 'عالية':
        return 'bg-rose-50 text-rose-700 font-bold';
      case 'متوسطة':
        return 'bg-amber-50 text-amber-700 font-medium';
      case 'منخفضة':
      default:
        return 'bg-stone-100 text-stone-600 font-normal';
    }
  };

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Header & Internal System Context */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2 text-right">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 text-teal-900 text-xs font-bold border border-teal-200">
            <Users className="w-3.5 h-3.5 text-teal-700" />
            <span>نظام إدارة الحملات الداخلي (Campaign Operations)</span>
          </div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-teal-800">
            لوحة جاهزية الحملة التسويقية
          </h1>
          <p className="text-teal-600 text-xs sm:text-sm max-w-2xl leading-relaxed">
            تم تصميم هذا النظام لحل مشكلة التوتر وتأخير الحملات (Last-Minute Panic) لدى الفريق المصري، عبر تقسيم مراحل الإطلاق إلى نقاط تفتيش زمنية صارمة (72h, 48h, 24h, Launch).
          </p>
        </div>

        <button
          onClick={() => setIsAddTaskModalOpen(true)}
          className="px-5 py-3 rounded-2xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs sm:text-sm shadow-teal transition-colors flex items-center gap-2 self-start md:self-auto shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>إضافة مهمة جديدة</span>
        </button>
      </div>

      {/* Prominent Urgent Checkpoint Warning Alert */}
      <div className="p-4 sm:p-5 rounded-3xl bg-amber-500/10 border-2 border-amber-500/40 text-teal-900 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-soft">
        <div className="flex items-start sm:items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0 font-bold">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-sm sm:text-base text-amber-950">
              تنبيه العد التنازلي: المرحلة النشطة الحالية (48 Hours Checkpoint)
            </h4>
            <p className="text-xs text-amber-900/90 mt-0.5 leading-relaxed">
              {campaignInfo.urgentWarning}
            </p>
          </div>
        </div>

        <div className="shrink-0 flex items-center gap-2 text-xs font-bold bg-white px-3.5 py-2 rounded-xl border border-amber-300 text-amber-900">
          <Clock className="w-4 h-4 text-amber-600" />
          <span>موعد الإطلاق: 21 مارس - 10:00 ص</span>
        </div>
      </div>

      {/* Overall Campaign Progress Bar Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-teal-100 shadow-soft space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-xs font-bold text-teal-500 uppercase tracking-wide">
              حملة: {campaignInfo.name}
            </span>
            <div className="flex items-center gap-2 mt-1">
              <h3 className="font-bold text-xl sm:text-2xl text-teal-800">
                نسبة جاهزية الحملة للإطلاق: {campaignProgress}%
              </h3>
            </div>
          </div>

          {/* Quick counts */}
          <div className="flex items-center gap-2 text-xs flex-wrap">
            <span className="px-3 py-1 rounded-xl bg-emerald-100 text-emerald-800 font-bold">
              {completedTasks} مكتملة
            </span>
            <span className="px-3 py-1 rounded-xl bg-amber-100 text-amber-800 font-bold">
              {inProgressTasks} قيد التنفيذ
            </span>
            <span className="px-3 py-1 rounded-xl bg-blue-100 text-blue-800 font-bold">
              {reviewTasks} مراجعة
            </span>
            <span className="px-3 py-1 rounded-xl bg-stone-100 text-stone-700 font-bold">
              {todoTasks} معلقة
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-teal-100 h-3 rounded-full overflow-hidden">
          <div
            className="bg-teal-700 h-full rounded-full transition-all duration-500"
            style={{ width: `${campaignProgress}%` }}
          />
        </div>
      </div>

      {/* 4 Checkpoint Cards (72h, 48h, 24h, Launch) */}
      <div className="space-y-4">
        <h3 className="font-bold text-lg text-teal-800">
          المحطات الزمنية للحملة (Milestone Timeline)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {campaignInfo.checkpoints.map((cp) => {
            const cpTasks = tasks.filter((t) => t.checkpoint === cp.id);
            const cpCompleted = cpTasks.filter((t) => t.status === 'Done').length;
            const isSelected = activeCheckpointFilter === cp.id;

            return (
              <div
                key={cp.id}
                onClick={() =>
                  setActiveCheckpointFilter(isSelected ? 'all' : cp.id)
                }
                className={`p-5 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                  isSelected
                    ? 'bg-teal-50 border-teal-700 shadow-soft-lg ring-2 ring-teal-600/20'
                    : 'bg-white border-teal-100 hover:border-teal-300 shadow-soft'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${cp.badgeColor}`}
                    >
                      {cp.statusAr}
                    </span>
                    <span className="text-[11px] text-teal-400">{cp.dueDate}</span>
                  </div>

                  <h4 className="font-bold text-sm text-teal-800 leading-snug">
                    {cp.title}
                  </h4>
                  <p className="text-xs text-teal-600 mt-1 leading-relaxed">{cp.summary}</p>
                </div>

                <div className="pt-2 border-t border-teal-50 flex items-center justify-between text-xs">
                  <span className="font-semibold text-teal-700">
                    المهام: {cpCompleted} من {cpTasks.length}
                  </span>
                  <span className="text-[11px] text-teal-700 font-bold">
                    {isSelected ? 'إلغاء الفلتر ✕' : 'عرض المهام ←'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Task Filters & Interactive Task List */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-teal-100 shadow-soft space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-teal-50">
          <div>
            <h3 className="font-bold text-lg text-teal-800">
              قائمة مهام الحملة ({filteredTasks.length})
            </h3>
            <p className="text-xs text-teal-500">
              يمكنك تغيير حالة أي مهمة مباشرة لتحديث نسبة الجاهزية لحظياً
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveCheckpointFilter('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeCheckpointFilter === 'all'
                  ? 'bg-teal-700 text-white'
                  : 'bg-teal-50 text-teal-700 hover:bg-teal-100'
              }`}
            >
              كل المحطات
            </button>
            <button
              onClick={() => setActiveCheckpointFilter('72h')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeCheckpointFilter === '72h'
                  ? 'bg-teal-700 text-white'
                  : 'bg-teal-50 text-teal-700 hover:bg-teal-100'
              }`}
            >
              72 ساعة
            </button>
            <button
              onClick={() => setActiveCheckpointFilter('48h')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeCheckpointFilter === '48h'
                  ? 'bg-teal-700 text-white'
                  : 'bg-teal-50 text-teal-700 hover:bg-teal-100'
              }`}
            >
              48 ساعة (النشطة)
            </button>
            <button
              onClick={() => setActiveCheckpointFilter('24h')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeCheckpointFilter === '24h'
                  ? 'bg-teal-700 text-white'
                  : 'bg-teal-50 text-teal-700 hover:bg-teal-100'
              }`}
            >
              24 ساعة
            </button>
            <button
              onClick={() => setActiveCheckpointFilter('launch')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeCheckpointFilter === 'launch'
                  ? 'bg-teal-700 text-white'
                  : 'bg-teal-50 text-teal-700 hover:bg-teal-100'
              }`}
            >
              ساعة الصفر
            </button>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-teal-50 border border-teal-100 text-teal-700 focus:outline-none"
            >
              <option value="all">كل الأولويات</option>
              <option value="عالية">أولوية عالية</option>
              <option value="متوسطة">أولوية متوسطة</option>
              <option value="منخفضة">أولوية منخفضة</option>
            </select>
          </div>
        </div>

        {/* Tasks Table / Cards */}
        <div className="space-y-3">
          {filteredTasks.map((task) => (
            <div
              key={task.id}
              className="p-4 sm:p-5 rounded-2xl bg-teal-50/50 hover:bg-teal-50 border border-teal-100 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-4"
            >
              {/* Task Title & Notes */}
              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-teal-100 text-teal-800">
                    {task.checkpointLabel}
                  </span>
                  <span
                    className={`text-[11px] px-2 py-0.5 rounded-md ${getPriorityBadge(
                      task.priority
                    )}`}
                  >
                    أولوية {task.priority}
                  </span>
                  <h4 className="font-bold text-sm text-teal-800">{task.title}</h4>
                </div>
                <p className="text-xs text-teal-600 leading-relaxed">{task.notes}</p>
              </div>

              {/* Assignee & Deadline */}
              <div className="flex items-center gap-4 text-xs text-teal-600 shrink-0">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-teal-200 text-teal-900 font-bold flex items-center justify-center text-xs">
                    {task.assignee?.avatar || 'مس'}
                  </div>
                  <div>
                    <span className="font-bold text-teal-800 block">
                      {task.assignee?.name}
                    </span>
                    <span className="text-[10px] text-teal-400 block">
                      {task.assignee?.role}
                    </span>
                  </div>
                </div>

                <div className="hidden sm:block border-r border-teal-100 pr-3">
                  <span className="text-[10px] text-teal-400 block">الموعد النهائي:</span>
                  <span className="font-bold text-teal-800">{task.deadline}</span>
                </div>

                {/* Status Switcher Dropdown */}
                <select
                  value={task.status}
                  onChange={(e) => updateTaskStatus(task.id, e.target.value)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border focus:outline-none transition-colors ${getStatusBadge(
                    task.status
                  )}`}
                >
                  <option value="To Do">To Do (معلقة)</option>
                  <option value="In Progress">In Progress (قيد التنفيذ)</option>
                  <option value="Review">Review (مراجعة)</option>
                  <option value="Done">Done (مكتملة ✓)</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Internal System Value Callout */}
      <div className="p-6 sm:p-8 rounded-3xl bg-teal-800 text-white space-y-3 shadow-soft">
        <div className="flex items-center gap-2 text-teal-200 font-bold text-xs uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-teal-300" />
          <span>القيمة التشغيلية لهذا النظام الداخلي</span>
        </div>
        <h4 className="font-bold text-base text-white">
          من الفوضى اللحظية إلى الانضباط الاستباقي
        </h4>
        <p className="text-xs text-teal-200 leading-relaxed">
          هذا النموذج يوفر رؤية موحدة لفرق المحتوى، التصميم، والعمليات قبل إطلاق الحملات التسويقية، مما يمنع الأخطاء الشائعة مثل روابط الخصومات المعطلة أو نقص المخزون غير المتوقع.
        </p>
      </div>

      {/* Add Task Modal */}
      {isAddTaskModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-teal-900/60 backdrop-blur-xs">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-soft-xl border border-teal-100 space-y-4">
            <h3 className="font-bold text-base text-teal-800 pb-3 border-b border-teal-100">
              إضافة مهمة جديدة لجدول الحملة
            </h3>

            <form onSubmit={handleCreateTask} className="space-y-4 text-right">
              <div>
                <label className="block text-xs font-bold text-teal-700 mb-1.5">
                  عنوان المهمة
                </label>
                <input
                  type="text"
                  required
                  placeholder="مثال: فحص أكواد الخصم على المتجر"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-teal-50 border border-teal-100 text-xs text-teal-800 focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-teal-700 mb-1.5">
                    المحطة الزمنية (Checkpoint)
                  </label>
                  <select
                    value={newCheckpoint}
                    onChange={(e) => setNewCheckpoint(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-teal-50 border border-teal-100 text-xs text-teal-800 focus:outline-none focus:border-teal-500"
                  >
                    <option value="72h">72 ساعة قبل الإطلاق</option>
                    <option value="48h">48 ساعة قبل الإطلاق</option>
                    <option value="24h">24 ساعة قبل الإطلاق</option>
                    <option value="launch">ساعة الصفر (Launch)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-teal-700 mb-1.5">
                    الأولوية
                  </label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-teal-50 border border-teal-100 text-xs text-teal-800 focus:outline-none focus:border-teal-500"
                  >
                    <option value="عالية">عالية</option>
                    <option value="متوسطة">متوسطة</option>
                    <option value="منخفضة">منخفضة</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-teal-700 mb-1.5">
                    المسؤول
                  </label>
                  <input
                    type="text"
                    required
                    value={newAssigneeName}
                    onChange={(e) => setNewAssigneeName(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-teal-50 border border-teal-100 text-xs text-teal-800 focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-teal-700 mb-1.5">
                    الدور الوظيفي
                  </label>
                  <input
                    type="text"
                    required
                    value={newAssigneeRole}
                    onChange={(e) => setNewAssigneeRole(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-teal-50 border border-teal-100 text-xs text-teal-800 focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-teal-700 mb-1.5">
                  الموعد النهائي
                </label>
                <input
                  type="text"
                  required
                  value={newDeadline}
                  onChange={(e) => setNewDeadline(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-teal-50 border border-teal-100 text-xs text-teal-800 focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-teal-700 mb-1.5">
                  ملاحظات وتفاصيل المهمة
                </label>
                <textarea
                  rows={3}
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  placeholder="اكتب متطلبات المهمة بالتفصيل..."
                  className="w-full p-2.5 rounded-xl bg-teal-50 border border-teal-100 text-xs text-teal-800 focus:outline-none focus:border-teal-500 resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddTaskModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-teal-50 text-teal-700 text-xs font-bold"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold shadow-teal"
                >
                  حفظ وإضافة المهمة
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
