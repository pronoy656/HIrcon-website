export default function JobsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Job Opportunities</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Placeholder for Job Cards */}
        {[1, 2, 3, 4, 5, 6].map((job) => (
          <div key={job} className="border rounded-lg p-6 shadow-sm flex flex-col gap-2">
            <div className="h-6 w-2/3 bg-muted rounded animate-pulse"></div>
            <div className="h-4 w-1/2 bg-muted rounded animate-pulse"></div>
            <div className="mt-4 flex gap-2">
              <div className="h-8 w-20 bg-muted rounded animate-pulse"></div>
              <div className="h-8 w-20 bg-muted rounded animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
