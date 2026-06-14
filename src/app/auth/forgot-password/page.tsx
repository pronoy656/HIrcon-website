import { AuthLayout } from "@/components/AuthLayout";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <AuthLayout>
      <div className="w-full flex flex-col pt-12">
        <Link href="/auth/login" className="mb-6 opacity-60 hover:opacity-100 transition-opacity w-fit">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
        
        <h2 className="text-3xl font-bold text-[#692A9F] mb-3">Forgot Password?</h2>
        <p className="text-gray-600 mb-8 text-[15px] leading-relaxed">
          Enter your email address to receive a secure password reset code
        </p>

        <form className="flex flex-col gap-6">
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
            <p className="text-xs text-gray-500 mt-1">If an account exists, you'll receive a reset code shortly</p>
          </div>

          <Button type="submit" className="h-14 w-full bg-[#692A9F] hover:bg-[#532080] text-lg rounded-xl mt-2">
            Send code
          </Button>
        </form>
        
        <p className="mt-8 text-center text-gray-800">
          Back to <Link href="/auth/login" className="text-[#692A9F] font-semibold hover:underline">Sign In</Link>
        </p>
      </div>
      
      {/* Absolute positioned Contact Support for Forgot Password Page */}
      <div className="absolute bottom-6 w-full text-center z-10 text-xs text-gray-600 left-0 pointer-events-none">
        Need help? <Link href="/support" className="text-[#692A9F] font-semibold hover:underline pointer-events-auto">Contact Support</Link>
      </div>
    </AuthLayout>
  );
}
