import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <nav className="border-b bg-background sticky top-0 z-10">
      <div className="container mx-auto flex h-16 items-center px-4 justify-between">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/logo.png" alt="ExShip Logo" width={100} height={32} className="h-8 w-auto object-contain" />
          </Link>
          <div className="flex gap-4">
            <Link
              href="/jobs"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Jobs
            </Link>
            <Link
              href="/network"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Network
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/auth/login">
            <Button variant="ghost">Login</Button>
          </Link>
          <Link href="/auth/register">
            <Button>Register</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
