import { Button } from "@/components/ui/button";
import { MoreHorizontal, Briefcase, MapPin, CheckCircle, XCircle } from "lucide-react";

const jobs = [
  { id: "1", title: "Senior Frontend Engineer", company: "TechCorp Inc.", location: "Remote", type: "Full-time", status: "Active", posted: "2d ago" },
  { id: "2", title: "Product Designer", company: "Design Studio", location: "New York, NY", type: "Contract", status: "Pending", posted: "5h ago" },
  { id: "3", title: "Backend Developer", company: "Fintech Startup", location: "San Francisco, CA", type: "Full-time", status: "Active", posted: "1w ago" },
  { id: "4", title: "Marketing Specialist", company: "Global Reach", location: "London, UK", type: "Part-time", status: "Rejected", posted: "2w ago" },
];

export default function AdminJobsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Job Listings</h1>
          <p className="text-muted-foreground mt-2">
            Review and manage all job postings across the platform.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Filters</Button>
          <Button>Add Job</Button>
        </div>
      </div>

      <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
        <div className="p-6 overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b">
              <tr>
                <th className="px-4 py-3 font-medium">Job Title</th>
                <th className="px-4 py-3 font-medium">Company</th>
                <th className="px-4 py-3 font-medium">Location & Type</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Posted</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.id} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                  <td className="px-4 py-3 font-medium text-foreground">
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-muted-foreground" />
                      {job.title}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{job.company}</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    <div className="flex flex-col gap-1 text-xs">
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {job.location}</span>
                      <span>{job.type}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      {job.status === 'Active' && <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />}
                      {job.status === 'Pending' && <div className="w-2 h-2 rounded-full bg-amber-500 ml-1 mr-0.5" />}
                      {job.status === 'Rejected' && <XCircle className="w-3.5 h-3.5 text-destructive" />}
                      <span className="text-muted-foreground">{job.status}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{job.posted}</td>
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
      </div>
    </div>
  );
}
