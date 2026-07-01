import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
        <div className="font-bold text-xl tracking-tight">
          ExShip <span className="text-primary text-sm ml-2">Admin</span>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center font-bold">
            A
          </div>
        </div>
      </header>
      <div className="flex flex-1 overflow-hidden">
        <AdminSidebar />
        <main className="flex-1 overflow-y-auto bg-muted/20 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
