import { useIsMobile } from "@/hooks/use-mobile";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useState } from "react";

export function AppLayout({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (isMobile) {
    return (
      <div className="flex min-h-screen bg-background text-foreground">
        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
          <SheetContent side="left" className="w-64 p-0">
            <Sidebar onNavigate={() => setSidebarOpen(false)} />
          </SheetContent>
          <main className="flex w-full flex-col">
            <div className="flex items-center gap-2 px-4 pt-4">
              <SheetTrigger asChild>
                <button className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary">
                  <Menu className="h-5 w-5" />
                </button>
              </SheetTrigger>
              <Topbar />
            </div>
            {children}
          </main>
        </Sheet>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar />
      <main className="flex min-w-0 flex-1 flex-col">
        <div className="px-8 pt-6">
          <Topbar />
        </div>
        {children}
      </main>
    </div>
  );
}
