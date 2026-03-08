import { useState } from "react";
import { Outlet } from "react-router";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

export function AppLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--color-background)]">
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        
        <main 
          className="flex-1 overflow-y-auto"
          style={{ 
            padding: 'var(--spacing-2xl)',
            transition: 'var(--transition-normal)'
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}
