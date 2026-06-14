import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
      <div className="w-full max-w-md p-8 border rounded-lg shadow-sm">
        <h1 className="text-2xl font-bold text-center mb-4">Reset Password</h1>
        <p className="text-sm text-muted-foreground text-center mb-6">
          Enter your email address and we will send you a link to reset your password.
        </p>
        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-medium">Email</label>
            <input 
              type="email" 
              id="email" 
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="name@example.com"
            />
          </div>
          <Button type="submit" className="mt-2 w-full">Send Reset Link</Button>
        </form>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Remember your password? <Link href="/auth/login" className="text-primary hover:underline">Back to Login</Link>
        </p>
      </div>
    </div>
  );
}
