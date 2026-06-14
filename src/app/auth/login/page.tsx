"use client";

import { useState } from "react";
import { AuthLayout } from "@/components/AuthLayout";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  const [accountType, setAccountType] = useState<"business" | "personal">("business");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <AuthLayout>
      <div className="w-full flex flex-col pt-12">
        <h2 className="text-3xl font-bold text-[#692A9F] mb-2">Welcome back!</h2>
        <div className="flex items-center gap-2 mb-8 text-muted-foreground text-lg">
          <span>Let's get you signed in</span>
          <Image src="/exit-door 1.png" alt="Sign in" width={20} height={20} />
        </div>

        <div className="mb-6">
          <label className="text-sm font-medium mb-3 block">Choose your Account type</label>
          <div className="flex gap-4">
            {/* Business Account Type */}
            <div 
              onClick={() => setAccountType("business")}
              className={`flex-1 rounded-xl p-3 flex items-center justify-between cursor-pointer border transition-colors ${
                accountType === "business" 
                  ? "bg-[#692A9F] text-white border-[#692A9F] shadow-sm" 
                  : "bg-gray-100 text-gray-700 border-transparent hover:bg-gray-200"
              }`}
            >
              <div className="flex items-center gap-2">
                <Image 
                  src="/business page 1.png" 
                  alt="Business" 
                  width={20} 
                  height={20} 
                />
                <span className="text-sm font-medium">Business Page</span>
              </div>
              {accountType === "business" ? (
                <Image 
                  src="/verified (1) 4.png" 
                  alt="Selected" 
                  width={18} 
                  height={18} 
                />
              ) : (
                <div className="w-4 h-4 rounded-full bg-white border border-gray-300"></div>
              )}
            </div>
            {/* Personal Account Type */}
            <div 
              onClick={() => setAccountType("personal")}
              className={`flex-1 rounded-xl p-3 flex items-center justify-between cursor-pointer border transition-colors ${
                accountType === "personal" 
                  ? "bg-[#692A9F] text-white border-[#692A9F] shadow-sm" 
                  : "bg-gray-100 text-gray-700 border-transparent hover:bg-gray-200"
              }`}
            >
              <div className="flex items-center gap-2">
                <Image 
                  src="/personal page 1.png" 
                  alt="Personal" 
                  width={20} 
                  height={20} 
                />
                <span className="text-sm font-medium">Personal Page</span>
              </div>
              {accountType === "personal" ? (
                <Image 
                  src="/verified (1) 4.png" 
                  alt="Selected" 
                  width={18} 
                  height={18} 
                />
              ) : (
                <div className="w-4 h-4 rounded-full bg-white border border-gray-300"></div>
              )}
            </div>
          </div>
        </div>

        <form className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-medium">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Image src="/email address 1.png" alt="Email" width={18} height={18} className="opacity-50" />
              </div>
              <input 
                type="email" 
                id="email" 
                className="flex h-12 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 pl-10 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#692A9F] focus-visible:border-transparent"
                placeholder="name@company.com"
              />
            </div>
          </div>
          
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-sm font-medium mb-1">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Image src="/password (1) 1.png" alt="Password" width={18} height={18} className="opacity-50" />
              </div>
              <input 
                id="password" 
                className="flex h-12 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 pl-10 pr-10 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#692A9F] focus-visible:border-transparent"
                placeholder="••••••••"
                type={showPassword ? "text" : "password"}
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
            <div className="text-right mt-1">
              <Link href="/auth/forgot-password" className="text-xs font-semibold text-[#692A9F] hover:underline">
                Forgot Password?
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-1">
            <input type="checkbox" id="remember" className="rounded border-gray-300 text-[#692A9F] focus:ring-[#692A9F] w-4 h-4 cursor-pointer" />
            <label htmlFor="remember" className="text-sm text-gray-600 cursor-pointer">Remember me for 30 days</label>
          </div>

          <Button type="submit" className="h-14 mt-4 w-full bg-[#692A9F] hover:bg-[#532080] text-lg rounded-xl">
            Sign In
          </Button>
        </form>
        
        <p className="mt-8 text-center text-gray-600">
          New here? <Link href="/auth/register" className="text-[#692A9F] font-semibold hover:underline">Sign Up</Link>
        </p>
      </div>
    </AuthLayout>
  );
}
