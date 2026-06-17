"use client";

import { useState, useRef } from "react";
import { AuthLayout } from "@/components/AuthLayout";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function VerifyEmailRegisterPage() {
  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();

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

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").substring(0, 5);
    if (pastedData) {
      const newOtp = [...otp];
      for (let i = 0; i < pastedData.length; i++) {
        newOtp[i] = pastedData[i];
      }
      setOtp(newOtp);
      const nextIndex = Math.min(pastedData.length, 4);
      inputRefs.current[nextIndex]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length === 5) {
      router.push("/auth/login");
    }
  };

  return (
    <AuthLayout>
      <div className="w-full flex flex-col pt-12">
        <Link href="/auth/register" className="mb-6 opacity-60 hover:opacity-100 transition-opacity w-fit">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>

        <h2 className="text-3xl font-bold text-[#E8500A] mb-3">Verify Email</h2>
        <p className="text-gray-600 mb-8 text-[15px] leading-relaxed">
          Please enter the 5-digit verification code that was sent to your email address.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <label className="text-sm font-medium text-center">Enter Verification Code</label>
            <div className="flex justify-center gap-3 md:gap-4" onPaste={handleOtpPaste}>
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

          <Button 
            type="submit" 
            className="h-14 w-full bg-[#E8500A] hover:bg-[#C94208] text-lg rounded-xl mt-6"
            disabled={otp.join("").length !== 5}
          >
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

