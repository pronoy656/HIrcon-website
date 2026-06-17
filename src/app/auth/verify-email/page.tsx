"use client";

import { useState, useRef } from "react";
import { AuthLayout } from "@/components/AuthLayout";
import { SuccessModal } from "@/components/common/SuccessModal";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Step = "otp" | "reset-password" | "success";

export default function VerifyEmailPage() {
  const [step, setStep] = useState<Step>("otp");

  // OTP State
  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Reset Password State
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const router = useRouter();

  // --- OTP Handlers ---
  const handleOtpChange = (index: number, value: string) => {
    if (value && !/^\d+$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);
    if (value && index < 4 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length === 5) {
      setStep("reset-password");
    }
  };

  // --- Reset Password Handler ---
  const handleResetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("success");
  };

  // --- Step: OTP ---
  if (step === "otp") {
    return (
      <AuthLayout>
        <div className="w-full flex flex-col pt-12">
          <Link href="/auth/forgot-password" className="mb-6 opacity-60 hover:opacity-100 transition-opacity w-fit">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>

          <h2 className="text-3xl font-bold text-[#E8500A] mb-3">Verify Email</h2>
          <p className="text-gray-600 mb-8 text-[15px] leading-relaxed">
            Please enter the 5-digit verification code that was sent to your email address.
          </p>

          <form onSubmit={handleOtpSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <label className="text-sm font-medium text-center">Enter Verification Code</label>
              <div className="flex justify-center gap-3 md:gap-4">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => {
                      inputRefs.current[index] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    className="w-12 h-14 md:w-14 md:h-16 text-center text-2xl font-semibold rounded-xl border border-gray-300 bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8500A] focus-visible:border-transparent transition-all"
                  />
                ))}
              </div>
            </div>

            <Button type="submit" className="h-14 w-full bg-[#E8500A] hover:bg-[#C94208] text-lg rounded-xl mt-6">
              Verify Code
            </Button>
          </form>

          <p className="mt-8 text-center text-gray-800">
            Didn&apos;t receive the code? <button className="text-[#E8500A] font-semibold hover:underline bg-transparent border-none p-0 cursor-pointer">Resend</button>
          </p>
        </div>
      </AuthLayout>
    );
  }

  // --- Step: Reset Password ---
  if (step === "reset-password") {
    return (
      <AuthLayout>
        <div className="w-full flex flex-col pt-12">
          <button
            onClick={() => setStep("otp")}
            className="mb-6 opacity-60 hover:opacity-100 transition-opacity w-fit bg-transparent border-none p-0 cursor-pointer"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <h2 className="text-3xl font-bold text-[#E8500A] mb-3">Reset Password</h2>
          <p className="text-gray-600 mb-8 text-[15px] leading-relaxed">
            Please enter your new password below to regain access to your account.
          </p>

          <form onSubmit={handleResetSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <label htmlFor="new-password" className="text-sm font-medium mb-1">New Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Image src="/password (1) 1.png" alt="Password" width={18} height={18} className="opacity-50" />
                </div>
                <input
                  id="new-password"
                  className="flex h-12 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 pl-10 pr-10 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8500A] focus-visible:border-transparent"
                  placeholder="Type your password"
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
                  className="flex h-12 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 pl-10 pr-10 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8500A] focus-visible:border-transparent"
                  placeholder="Type your password"
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

            <Button type="submit" className="h-14 w-full bg-[#E8500A] hover:bg-[#C94208] text-lg rounded-xl mt-2">
              Reset Password
            </Button>
          </form>

          <p className="mt-8 text-center text-gray-800">
            Remember your password? <Link href="/auth/login" className="text-[#E8500A] font-semibold hover:underline">Sign In</Link>
          </p>
        </div>
      </AuthLayout>
    );
  }

  // --- Step: Success ---
  return (
    <SuccessModal
      isOpen={true}
      onClose={() => router.push("/auth/login")}
      title="Password Reset!"
      message="Your password has been successfully reset. You can now sign in with your new password."
    />
  );
}

