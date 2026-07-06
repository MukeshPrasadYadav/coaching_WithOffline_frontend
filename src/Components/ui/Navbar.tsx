import { Button } from "./Button";

// src/Components/ui/Navbar.tsx
export default function Navbar() {
  return (
    <nav className="border-b border-[rgb(var(--border))] bg-[rgb(var(--card))] sticky top-0 z-50">
      <div className="max-w-screen-2xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <h1 className="text-2xl font-semibold tracking-tight">YourApp</h1>
          
          {/* Search */}
          <div className="relative w-80">
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-2xl pl-11 py-2.5 text-sm focus:outline-none focus:border-primary-500"
            />
            <span className="absolute left-4 top-3 text-neutral-400">🔍</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm">Docs</Button>
          <Button variant="outline" size="sm">Upgrade</Button>
          <Button variant="primary" size="sm">New Project</Button>
        </div>
      </div>
    </nav>
  );
}