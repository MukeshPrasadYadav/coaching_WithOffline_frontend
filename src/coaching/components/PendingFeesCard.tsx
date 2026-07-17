// src/coaching/components/PendingFeesCard.tsx
const PendingFeesCard = () => {
  const pending = [
    { name: "Class XII", amount: "Rs. 42,000" },
    { name: "Class XI", amount: "Rs. 28,500" },
    { name: "Foundation", amount: "Rs. 16,800" },
  ];

  return (
    <section className="h-full rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-[0_4px_16px_rgba(15,23,42,0.06)]">
      <div className="flex items-start justify-between gap-3">
        <h2 className="m-0 text-base font-bold text-[#111827]">Pending Fees</h2>
        <span className="rounded-full bg-[#FEF3C7] px-2 py-1 text-xs font-semibold text-[#B45309]">18 dues</span>
      </div>
      <div className="mt-4 space-y-3">
        {pending.map((item) => (
          <div key={item.name} className="flex items-center justify-between gap-3 border-b border-[#E5E7EB] pb-3 last:border-0 last:pb-0">
            <span className="text-sm font-medium text-[#111827]">{item.name}</span>
            <span className="text-sm font-bold text-[#EF4444]">{item.amount}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default PendingFeesCard
