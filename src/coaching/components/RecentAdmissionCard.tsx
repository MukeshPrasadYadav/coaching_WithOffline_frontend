// src/coaching/components/RecentAdmissionCard.tsx
const RecentAdmissionCard = () => {
  const students = ["Aarav Sharma", "Nisha Patel", "Kabir Mehta"];

  return (
    <section className="h-full rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-[0_4px_16px_rgba(15,23,42,0.06)]">
      <h2 className="m-0 text-base font-bold text-[#111827]">Recent Admissions</h2>
      <div className="mt-4 space-y-3">
        {students.map((student, index) => (
          <div key={student} className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#EFF6FF] text-sm font-bold text-[#2563EB]">
              {student.charAt(0)}
            </div>
            <div className="min-w-0">
              <p className="m-0 truncate text-sm font-semibold text-[#111827]">{student}</p>
              <p className="m-0 text-xs text-[#6B7280]">Batch {index + 1} enrolled</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default RecentAdmissionCard
