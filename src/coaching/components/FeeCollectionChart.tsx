// src/coaching/components/FeeCollectionChart.tsx
const FeeCollectionChart = () => {
  const data = [
    { month: "Jan", value: 54 },
    { month: "Feb", value: 68 },
    { month: "Mar", value: 61 },
    { month: "Apr", value: 82 },
    { month: "May", value: 74 },
    { month: "Jun", value: 92 },
  ];

  return (
    <section className="h-full rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-[0_4px_16px_rgba(15,23,42,0.06)]">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h2 className="m-0 text-base font-bold text-[#111827]">Monthly Fees</h2>
          <p className="m-0 mt-1 text-xs text-[#6B7280]">Collection trend across active batches</p>
        </div>
        <span className="rounded-full bg-[#ECFDF5] px-2.5 py-1 text-xs font-semibold text-[#10B981]">+12.4%</span>
      </div>

      <div className="flex h-56 items-end gap-3">
        {data.map((item) => (
          <div key={item.month} className="flex min-w-0 flex-1 flex-col items-center gap-2">
            <div className="flex h-44 w-full items-end rounded-t-lg bg-[#F8FAFC]">
              <div
                className="w-full rounded-t-lg bg-[#2563EB] transition-all duration-200 hover:bg-[#1D4ED8]"
                style={{ height: `${item.value}%` }}
              />
            </div>
            <span className="text-xs font-medium text-[#6B7280]">{item.month}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default FeeCollectionChart
