export default function NetworkPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Network</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Placeholder for Connection Cards */}
        {[1, 2, 3, 4, 5, 6, 7, 8].map((person) => (
          <div key={person} className="border rounded-lg p-6 shadow-sm flex flex-col items-center text-center gap-4">
            <div className="h-20 w-20 rounded-full bg-muted animate-pulse"></div>
            <div className="w-full flex flex-col items-center gap-2">
              <div className="h-5 w-3/4 bg-muted rounded animate-pulse"></div>
              <div className="h-4 w-1/2 bg-muted rounded animate-pulse"></div>
            </div>
            <div className="h-9 w-full bg-muted rounded mt-2 animate-pulse"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
