// src/Components/ui/Card.tsx
export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-[rgb(var(--card))] border border-[rgb(var(--border))] rounded-3xl p-6 shadow-soft hover:shadow-medium transition-all ${className}`}>
      {children}
    </div>
  );
}