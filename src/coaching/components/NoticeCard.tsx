// src/coaching/components/NoticeCard.tsx
const NoticeCard = () => {
  const notices = [
    { title: "Parent meeting", tag: "Today" },
    { title: "Fee reminder batch XI", tag: "Pending" },
    { title: "Mock exam schedule", tag: "Draft" },
  ];

  return (
    <section className="h-full rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-[0_4px_16px_rgba(15,23,42,0.06)]">
      <h2 className="m-0 text-base font-bold text-[#111827]">Messages</h2>
      <div className="mt-4 space-y-3">
        {notices.map((notice) => (
          <div key={notice.title} className="rounded-xl bg-[#F8FAFC] p-3">
            <div className="flex items-center justify-between gap-3">
              <p className="m-0 truncate text-sm font-semibold text-[#111827]">{notice.title}</p>
              <span className="shrink-0 rounded-full bg-white px-2 py-1 text-xs font-semibold text-[#6B7280]">
                {notice.tag}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default NoticeCard
