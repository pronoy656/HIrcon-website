"use client";

import { useState } from "react";
import { AuthLayout } from "@/components/AuthLayout";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "@/styles/custom-shapes.css";

export default function RegisterPage() {
  const [accountType, setAccountType] = useState<"business" | "personal">("personal");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const router = useRouter();

  // Password validation rules
  const hasMinLength = password.length >= 8;
  const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);

  const canSubmit = email.length > 0 && hasMinLength && hasSymbol && hasUppercase && agreedToTerms;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (canSubmit) {
      router.push("/auth/verify-email-register");
    }
  };

  return (
    <AuthLayout>
      <div className="w-full flex flex-col pt-8">
        {/* Back Arrow */}
        <Link href="/auth/login" className="mb-4 opacity-60 hover:opacity-100 transition-opacity w-fit">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>

        <h2 className="text-3xl font-bold text-[#692A9F] mb-1">
          {accountType === "personal" ? "Personal Page Account" : "Business Page Account"}
        </h2>
        <p className="text-gray-500 mb-6 text-sm">
          Create a {accountType === "personal" ? "Personal" : "Business"} Page
        </p>

        {/* Account Type Toggle */}
        <div className="mb-5">
          <label className="text-sm font-medium mb-3 block">Choose your Account type</label>
          <div className="flex gap-4">
            {/* Business */}
            <div 
              onClick={() => setAccountType("business")}
              className={`flex-1 rounded-xl p-3 flex items-center justify-between cursor-pointer border transition-colors ${
                accountType === "business" 
                  ? "bg-[#692A9F] text-white border-[#692A9F] shadow-sm" 
                  : "bg-gray-100 text-gray-700 border-transparent hover:bg-gray-200"
              }`}
            >
              <div className="flex items-center gap-2">
                <Image src="/business page 1.png" alt="Business" width={20} height={20} />
                <span className="text-sm font-medium">Business Page</span>
              </div>
              {accountType === "business" ? (
                <Image src="/verified (1) 4.png" alt="Selected" width={18} height={18} />
              ) : (
                <div className="w-4 h-4 rounded-full bg-white border border-gray-300"></div>
              )}
            </div>
            {/* Personal */}
            <div 
              onClick={() => setAccountType("personal")}
              className={`flex-1 rounded-xl p-3 flex items-center justify-between cursor-pointer border transition-colors ${
                accountType === "personal" 
                  ? "bg-[#692A9F] text-white border-[#692A9F] shadow-sm" 
                  : "bg-gray-100 text-gray-700 border-transparent hover:bg-gray-200"
              }`}
            >
              <div className="flex items-center gap-2">
                <Image src="/personal page 1.png" alt="Personal" width={20} height={20} />
                <span className="text-sm font-medium">Personal Page</span>
              </div>
              {accountType === "personal" ? (
                <Image src="/verified (1) 4.png" alt="Selected" width={18} height={18} />
              ) : (
                <div className="w-4 h-4 rounded-full bg-white border border-gray-300"></div>
              )}
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Email */}
          <div className="flex flex-col gap-2">
            <label htmlFor="reg-email" className="text-sm font-medium">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Image src="/email address 1.png" alt="Email" width={18} height={18} className="opacity-50" />
              </div>
              <input 
                type="email" 
                id="reg-email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex h-12 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 pl-10 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#692A9F] focus-visible:border-transparent"
                placeholder="name@company.com"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between mb-1">
              <label htmlFor="reg-password" className="text-sm font-medium">Password</label>
              <Link href="/auth/forgot-password" className="text-sm font-semibold text-[#692A9F] hover:underline">
                Forgot Password?
              </Link>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Image src="/password (1) 1.png" alt="Password" width={18} height={18} className="opacity-50" />
              </div>
              <input 
                id="reg-password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex h-12 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 pl-10 pr-10 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#692A9F] focus-visible:border-transparent"
                placeholder="••••••••"
                type={showPassword ? "text" : "password"}
                required
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
            {/* Password Rules */}
            <div className="flex flex-col gap-1 mt-2">
              <div className={`password-rule ${hasMinLength ? 'valid' : ''}`}>
                <div className="check-box">
                  {hasMinLength && (
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none"><path d="M5 13L9 17L19 7" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  )}
                </div>
                <span>At least 8 characters</span>
              </div>
              <div className={`password-rule ${hasSymbol ? 'valid' : ''}`}>
                <div className="check-box">
                  {hasSymbol && (
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none"><path d="M5 13L9 17L19 7" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  )}
                </div>
                <span>{"Includes a symbol (e.g. ! % @ )"}</span>
              </div>
              <div className={`password-rule ${hasUppercase ? 'valid' : ''}`}>
                <div className="check-box">
                  {hasUppercase && (
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none"><path d="M5 13L9 17L19 7" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  )}
                </div>
                <span>Includes an uppercase letter</span>
              </div>
            </div>
          </div>

          {/* Terms Agreement */}
          <div className="flex items-start gap-2 mt-1">
            <input 
              type="checkbox" 
              id="terms" 
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="rounded border-gray-300 text-[#692A9F] focus:ring-[#692A9F] w-4 h-4 cursor-pointer mt-0.5" 
            />
            <label htmlFor="terms" className="text-sm text-gray-600 cursor-pointer leading-tight">
              By continuing, you agree to <a href="#" className="text-[#692A9F] font-semibold hover:underline">Hirconn&apos;s User Agreement</a>, and <a href="#" className="text-[#692A9F] font-semibold hover:underline">Privacy Notice</a>
            </label>
          </div>

          <Button 
            type="submit" 
            className="h-14 w-full bg-[#740CA1] hover:bg-[#5e0a82] text-lg rounded-xl mt-1"
            disabled={!canSubmit}
          >
            Next
          </Button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Already have an account? <Link href="/auth/login" className="text-[#692A9F] font-semibold hover:underline">Sign In</Link>
        </p>
      </div>
    </AuthLayout>
  );
}
