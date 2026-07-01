import { Button } from "@/components/ui/button";
import { MoreHorizontal, Briefcase, MapPin, CheckCircle, XCircle, Filter, Plus } from "lucide-react";

const jobs = [
  { id: "1", title: "Senior Frontend Engineer", company: "TechCorp Inc.", location: "Remote", type: "Full-time", status: "Active", posted: "2d ago" },
  { id: "2", title: "Product Designer", company: "Design Studio", location: "New York, NY", type: "Contract", status: "Pending", posted: "5h ago" },
  { id: "3", title: "Backend Developer", company: "Fintech Startup", location: "San Francisco, CA", type: "Full-time", status: "Active", posted: "1w ago" },
  { id: "4", title: "Marketing Specialist", company: "Global Reach", location: "London, UK", type: "Part-time", status: "Rejected", posted: "2w ago" },
];

export default function AdminJobsPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-1.5">
          <h1 className="text-3xl font-extrabold tracking-tight">Job Listings</h1>
          <p className="text-muted-foreground">
            Review, approve, and manage all job postings across the platform.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2 bg-background/50 backdrop-blur-sm">
            <Filter className="h-4 w-4" /> Filters
          </Button>
          <Button className="gap-2 bg-primary text-primary-foreground shadow-md hover:shadow-lg transition-shadow">
            <Plus className="h-4 w-4" /> Add Job
          </Button>
        </div>
      </div>

      <div className="rounded-2xl border border-border/50 bg-card/80 backdrop-blur-md shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/40 border-b border-border/50">
              <tr>
                <th className="px-6 py-4 font-semibold tracking-wider">Job Title</th>
                <th className="px-6 py-4 font-semibold tracking-wider">Company</th>
                <th className="px-6 py-4 font-semibold tracking-wider">Location & Type</th>
                <th className="px-6 py-4 font-semibold tracking-wider">Status</th>
                <th className="px-6 py-4 font-semibold tracking-wider">Posted</th>
                <th className="px-6 py-4 font-semibold tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {jobs.map((job) => (
                <tr key={job.id} className="hover:bg-muted/30 transition-colors group">
                  <td className="px-6 py-4 font-medium text-foreground">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg text-primary">
                        <Briefcase className="w-4 h-4" />
                      </div>
                      <span className="group-hover:text-primary transition-colors">{job.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium">{job.company}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1.5 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1.5 font-medium"><MapPin className="w-3.5 h-3.5" /> {job.location}</span>
                      <span className="inline-block bg-muted/50 px-2 py-0.5 rounded-md w-fit border border-border/50">{job.type}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 font-medium">
                      {job.status === 'Active' && <CheckCircle className="w-4 h-4 text-emerald-500" />}
                      {job.status === 'Pending' && <div className="w-2.5 h-2.5 rounded-full bg-amber-500 mx-0.5" />}
                      {job.status === 'Rejected' && <XCircle className="w-4 h-4 text-destructive" />}
                      <span className="text-muted-foreground">{job.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{job.posted}</td>
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
          <span>Showing 1 to 4 of 842 entries</span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm">Next</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
