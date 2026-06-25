import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
        Welcome to <span className="text-primary">ExShip</span>
      </h1>
      <p className="text-xl text-muted-foreground mb-10 max-w-2xl">
        Your ultimate platform for finding jobs, building your professional network, and accelerating your career.
      </p>
      <div className="flex gap-4">
        <Link href="/jobs">
          <Button size="lg">Explore Jobs</Button>
        </Link>
        <Link href="/network">
          <Button variant="outline" size="lg">Grow Network</Button>
        </Link>
      </div>
    </div>
  );
}
