// src/Components/ui/Navbar.tsx
import { useLogout } from "../../hooks/auth.hooks";
import { Button } from "./Button";

// src/Components/ui/Navbar.tsx
export default function Navbar() {
   const { mutate: logout, isPending } = useLogout();
  const handleLogOut =() =>{
    logout();
     
  }
  return (
    <nav className="border-b border-[rgb(var(--border))] bg-[rgb(var(--card))] sticky top-0 z-50">
      <div className="max-w-screen-2xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <h1 className="text-2xl font-semibold tracking-tight">YourApp</h1>
          
          
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" >Docs</Button>
          <Button variant="outline" >Upgrade</Button>
          <Button disabled={isPending} onClick={() => handleLogOut()} variant="primary" >New Project</Button>
        </div>
      </div>
    </nav>
  );
}