"use client";

import { useState } from "react";
import { AuthLayout } from "@/components/AuthLayout";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate password reset logic
    // Redirect to login after successful reset
    router.push("/auth/login?reset=success");
  };

  return (
    <AuthLayout>
      <div className="w-full flex flex-col pt-12">
        <h2 className="text-3xl font-bold text-[#692A9F] mb-3">Reset Password</h2>
        <p className="text-gray-600 mb-8 text-[15px] leading-relaxed">
          Please enter your new password below to regain access to your account.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <label htmlFor="new-password" className="text-sm font-medium mb-1">New Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Image src="/password (1) 1.png" alt="Password" width={18} height={18} className="opacity-50" />
              </div>
              <input 
                id="new-password" 
                className="flex h-12 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 pl-10 pr-10 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#692A9F] focus-visible:border-transparent"
                placeholder="••••••••"
                type={showPassword ? "text" : "password"}
                required
                minLength={8}
              />
              <div 
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer opacity-50 hover:opacity-100 transition-opacity"
                onClick={() => setShowPassword(!showPassword)}
              >
                <Image 
                  src={showPassword ? "/hide 1.png" : "/Vector.png"} 
                  alt="Toggle Password Visibility" 
                  width={18} 
                  height={18} 
                />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">Must be at least 8 characters long</p>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="confirm-password" className="text-sm font-medium mb-1">Confirm New Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Image src="/password (1) 1.png" alt="Password" width={18} height={18} className="opacity-50" />
              </div>
              <input 
                id="confirm-password" 
                className="flex h-12 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 pl-10 pr-10 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#692A9F] focus-visible:border-transparent"
                placeholder="••••••••"
                type={showConfirmPassword ? "text" : "password"}
                required
                minLength={8}
              />
              <div 
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer opacity-50 hover:opacity-100 transition-opacity"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <Image 
                  src={showConfirmPassword ? "/hide 1.png" : "/Vector.png"} 
                  alt="Toggle Password Visibility" 
                  width={18} 
                  height={18} 
                />
              </div>
            </div>
          </div>

          <Button type="submit" className="h-14 w-full bg-[#692A9F] hover:bg-[#532080] text-lg rounded-xl mt-2">
            Reset Password
          </Button>
        </form>
        
        <p className="mt-8 text-center text-gray-800">
          Remember your password? <Link href="/auth/login" className="text-[#692A9F] font-semibold hover:underline">Sign In</Link>
        </p>
      </div>
    </AuthLayout>
  );
}
