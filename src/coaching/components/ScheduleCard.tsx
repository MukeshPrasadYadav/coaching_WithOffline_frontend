// src/coaching/components/ScheduleCard.tsx
const ScheduleCard = () => {
  const classes = [
    { time: "09:00", title: "Physics XI", room: "Room A2" },
    { time: "11:30", title: "Maths XII", room: "Room B1" },
    { time: "14:00", title: "Chemistry X", room: "Lab 1" },
    { time: "16:30", title: "Foundation", room: "Room C3" },
  ];

  return (
    <section className="h-full rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-[0_4px_16px_rgba(15,23,42,0.06)]">
      <div className="mb-4">
        <h2 className="m-0 text-base font-bold text-[#111827]">Upcoming Classes</h2>
        <p className="m-0 mt-1 text-xs text-[#6B7280]">Today&apos;s batch schedule</p>
      </div>

      <div className="space-y-3">
        {classes.map((item) => (
          <div key={`${item.time}-${item.title}`} className="rounded-xl border border-[#E5E7EB] p-3">
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs font-semibold text-[#2563EB]">{item.time}</span>
              <span className="rounded-full bg-[#F8FAFC] px-2 py-1 text-xs text-[#6B7280]">{item.room}</span>
            </div>
            <p className="m-0 mt-2 text-sm font-semibold text-[#111827]">{item.title}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default ScheduleCard
