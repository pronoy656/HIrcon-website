"use client";

import { AuthLayout } from "@/components/Auth-section/AuthLayout";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/auth/verify-email");
  };

  return (
    <AuthLayout bottomText={<>Need help? <Link href="/support" className="text-[#E8500A] font-semibold hover:underline pointer-events-auto">Contact Support</Link></>}>
      <div className="w-full flex flex-col pt-12">
        <Link href="/auth/login" className="mb-6 opacity-60 hover:opacity-100 transition-opacity w-fit">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
        
        <h2 className="text-3xl font-bold text-[#E8500A] mb-3">Forgot Password?</h2>
        <p className="text-gray-600 mb-8 text-[15px] leading-relaxed">
          Enter your email address to receive a secure password reset code
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-medium">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Image src="/email address 1.png" alt="Email" width={18} height={18} className="opacity-50" />
              </div>
              <input 
                type="email" 
                id="email" 
                className="flex h-12 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 pl-10 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8500A] focus-visible:border-transparent"
                placeholder="name@company.com"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">If an account exists, you'll receive a reset code shortly</p>
          </div>

          <Button type="submit" className="h-14 w-full bg-[#E8500A] hover:bg-[#C94208] text-lg rounded-xl mt-2">
            Send code
          </Button>
        </form>
        
        <p className="mt-8 text-center text-gray-800">
          Back to <Link href="/auth/login" className="text-[#E8500A] font-semibold hover:underline">Sign In</Link>
        </p>
      </div>
    </AuthLayout>
  );
}

