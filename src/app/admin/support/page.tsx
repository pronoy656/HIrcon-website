import { Button } from "@/components/ui/button";

export default function SupportPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
        <span className="text-3xl text-primary font-bold">S</span>
      </div>
      <h1 className="text-4xl font-extrabold tracking-tight">Support</h1>
      <p className="text-muted-foreground text-lg max-w-lg mt-2">
        Customer support tickets and contact messages. This module is currently under construction for the Courier Aggregator pivot.
      </p>
      <div className="mt-8">
        <Button variant="outline">Go Back</Button>
      </div>
    </div>
  );
}
