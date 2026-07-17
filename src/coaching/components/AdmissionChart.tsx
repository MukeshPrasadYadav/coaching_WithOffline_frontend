// src/coaching/components/AdmissionChart.tsx
const AdmissionChart = () => {
  const points = "0,120 45,94 90,102 135,70 180,78 225,42 270,54 315,28";

  return (
    <section className="h-full rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-[0_4px_16px_rgba(15,23,42,0.06)]">
      <div className="mb-5">
        <h2 className="m-0 text-base font-bold text-[#111827]">Student Growth</h2>
        <p className="m-0 mt-1 text-xs text-[#6B7280]">Admissions over the last 8 weeks</p>
      </div>

      <div className="relative h-56 overflow-hidden rounded-xl bg-[#F8FAFC] p-4">
        <svg viewBox="0 0 315 140" className="h-full w-full" preserveAspectRatio="none" role="img" aria-label="Student growth line chart">
          <polyline points={points} fill="none" stroke="#2563EB" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <polygon points={`${points} 315,140 0,140`} fill="rgba(37,99,235,0.10)" />
        </svg>
      </div>
    </section>
  )
}

export default AdmissionChart
