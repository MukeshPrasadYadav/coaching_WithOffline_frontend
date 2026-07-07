// src/Components/Layout.tsx
import { Outlet } from "react-router-dom";
import Navbar from "./ui/Navbar";
import Sidebar from "./ui/Sidebar";

const Layout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
  {/* Desktop Sidebar */}
  <aside className="hidden lg:block w-64 border-r">
    <Sidebar />
  </aside>

  <div className="flex flex-col flex-1 overflow-hidden">
    <Navbar />

    <main className="flex-1 overflow-auto p-6">
      <Outlet />
    </main>
  </div>
</div>
  )
}

export default Layout