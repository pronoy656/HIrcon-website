import { Button } from "@/components/ui/button";
import { MoreHorizontal, ShieldAlert, CheckCircle2 } from "lucide-react";

const users = [
  { id: "1", name: "Alice Smith", email: "alice@example.com", role: "Seeker", status: "Active", date: "2023-10-01" },
  { id: "2", name: "TechCorp Inc.", email: "hr@techcorp.com", role: "Employer", status: "Active", date: "2023-10-02" },
  { id: "3", name: "Bob Jones", email: "bob@example.com", role: "Seeker", status: "Suspended", date: "2023-10-05" },
  { id: "4", name: "Design Studio", email: "hello@design.co", role: "Employer", status: "Pending", date: "2023-10-10" },
  { id: "5", name: "Charlie Brown", email: "charlie@example.com", role: "Seeker", status: "Active", date: "2023-10-12" },
];

export default function AdminUsersPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground mt-2">
            View and manage all users registered on the platform.
          </p>
        </div>
        <Button>Export Users</Button>
      </div>

      <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
        <div className="p-6 overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b">
              <tr>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Role</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Joined</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                  <td className="px-4 py-3 font-medium text-foreground">{user.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{user.email}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      user.role === 'Employer' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      {user.status === 'Active' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />}
                      {user.status === 'Suspended' && <ShieldAlert className="w-3.5 h-3.5 text-destructive" />}
                      <span className="text-muted-foreground">{user.status}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{user.date}</td>
                  <td className="px-4 py-3 text-right">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t flex items-center justify-end text-sm text-muted-foreground">
          Showing 1 to 5 of 12,450 entries
        </div>
      </div>
    </div>
  );
}
