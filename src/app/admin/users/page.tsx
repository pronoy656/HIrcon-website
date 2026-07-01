import { Button } from "@/components/ui/button";
import { MoreHorizontal, ShieldAlert, CheckCircle2, UserPlus, Filter } from "lucide-react";

const users = [
  { id: "1", name: "Alice Smith", email: "alice@example.com", role: "Seeker", status: "Active", date: "2023-10-01" },
  { id: "2", name: "TechCorp Inc.", email: "hr@techcorp.com", role: "Employer", status: "Active", date: "2023-10-02" },
  { id: "3", name: "Bob Jones", email: "bob@example.com", role: "Seeker", status: "Suspended", date: "2023-10-05" },
  { id: "4", name: "Design Studio", email: "hello@design.co", role: "Employer", status: "Pending", date: "2023-10-10" },
  { id: "5", name: "Charlie Brown", email: "charlie@example.com", role: "Seeker", status: "Active", date: "2023-10-12" },
];

export default function AdminUsersPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-1.5">
          <h1 className="text-3xl font-extrabold tracking-tight">User Management</h1>
          <p className="text-muted-foreground">
            Manage users, assign roles, and handle account statuses.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2 bg-background/50 backdrop-blur-sm">
            <Filter className="h-4 w-4" /> Filters
          </Button>
          <Button className="gap-2 bg-primary text-primary-foreground shadow-md hover:shadow-lg transition-shadow">
            <UserPlus className="h-4 w-4" /> Export Users
          </Button>
        </div>
      </div>

      <div className="rounded-2xl border border-border/50 bg-card/80 backdrop-blur-md shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/40 border-b border-border/50">
              <tr>
                <th className="px-6 py-4 font-semibold tracking-wider">User Details</th>
                <th className="px-6 py-4 font-semibold tracking-wider">Role</th>
                <th className="px-6 py-4 font-semibold tracking-wider">Status</th>
                <th className="px-6 py-4 font-semibold tracking-wider">Joined Date</th>
                <th className="px-6 py-4 font-semibold tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-muted/30 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-semibold text-foreground group-hover:text-primary transition-colors">{user.name}</span>
                      <span className="text-muted-foreground text-xs mt-0.5">{user.email}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
                      user.role === 'Employer' 
                        ? 'bg-blue-500/10 text-blue-600 border-blue-500/20 dark:text-blue-400' 
                        : 'bg-slate-500/10 text-slate-700 border-slate-500/20 dark:text-slate-300'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5">
                      {user.status === 'Active' && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                      {user.status === 'Suspended' && <ShieldAlert className="w-4 h-4 text-destructive" />}
                      {user.status === 'Pending' && <div className="w-2 h-2 rounded-full bg-amber-500 mx-1" />}
                      <span className="text-muted-foreground font-medium">{user.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{user.date}</td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-border/50 bg-muted/20 flex items-center justify-between text-sm text-muted-foreground">
          <span>Showing 1 to 5 of 12,450 entries</span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm">Next</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
