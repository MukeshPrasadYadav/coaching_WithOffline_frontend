// src/Components/ui/Sidebar.tsx
export default function Sidebar() {
  return (
    <div className="w-64 border-r border-[rgb(var(--border))] bg-[rgb(var(--card))] h-screen p-4">
      <div className="space-y-1">
        {['Dashboard', 'Projects', 'Team', 'Analytics', 'Settings'].map((item) => (
          <a
            key={item}
            href="#"
            className="flex items-center gap-3 px-4 py-3 text-sm rounded-2xl hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            {item}
          </a>
        ))}
      </div>
    </div>
  );
}