import Link from "next/link";
import { LayoutDashboard, Users, Briefcase, Settings, LifeBuoy } from "lucide-react";

const navItems = [
  { name: "Overview", href: "/admin", icon: LayoutDashboard },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Jobs", href: "/admin/jobs", icon: Briefcase },
  { name: "Support", href: "/admin/support", icon: LifeBuoy },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
  return (
    <aside className="w-64 bg-background border-r flex-shrink-0 hidden md:block h-[calc(100vh-4rem)]">
      <nav className="p-4 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 px-3 py-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <item.icon className="h-5 w-5" />
            <span className="font-medium">{item.name}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
