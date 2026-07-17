// src/coaching/components/AttendanceCard.tsx
const AttendanceCard = () => {
  const segments = [
    { label: "Present", value: 82, color: "#10B981" },
    { label: "Late", value: 9, color: "#F59E0B" },
    { label: "Absent", value: 9, color: "#EF4444" },
  ];

  return (
    <section className="h-full rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-[0_4px_16px_rgba(15,23,42,0.06)]">
      <h2 className="m-0 text-base font-bold text-[#111827]">Attendance Trend</h2>
      <div className="mt-5 flex items-center gap-5">
        <div
          className="h-24 w-24 shrink-0 rounded-full"
          style={{
            background: "conic-gradient(#10B981 0 82%, #F59E0B 82% 91%, #EF4444 91% 100%)",
          }}
        />
        <div className="min-w-0 flex-1 space-y-2">
          {segments.map((segment) => (
            <div key={segment.label} className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-2 text-sm text-[#6B7280]">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: segment.color }} />
                {segment.label}
              </span>
              <span className="text-sm font-bold text-[#111827]">{segment.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AttendanceCard
