import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import "@/styles/custom-shapes.css";

export default function SupportPage() {
  return (
    <div className="support-container pb-24">
      {/* Header */}
      <div className="container mx-auto px-4 py-8 md:py-12 relative z-10">
        <Link href="/auth/login" className="absolute left-4 top-12 md:left-8 opacity-60 hover:opacity-100 transition-opacity">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-[#692A9F] mb-4">Contact Support</h1>
          <p className="text-gray-600 text-lg">
            For faster help, describe your issue once in a single message. Our dedicated support team will review and reply by email.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 relative z-10 max-w-6xl">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Left Sidebar */}
          <div className="w-full md:w-1/3 flex flex-col gap-6">
            {/* Response Time Card */}
            <div className="bg-[#F0F4FA] rounded-2xl p-6 border border-blue-50/50 shadow-sm">
              <h3 className="text-xl font-bold mb-3 text-slate-800">Response Time</h3>
              <p className="text-gray-600 mb-6 text-sm">
                We value your time and aim for quick resolutions.
              </p>
              <div className="flex items-center gap-2 text-[#692A9F] font-medium text-sm">
                <Image src="/around-the-world 1.png" alt="Clock" width={18} height={18} className="opacity-80 grayscale" style={{ filter: 'brightness(0.5) sepia(1) hue-rotate(240deg) saturate(3)' }} />
                <span>Usually respond within 24 hours</span>
              </div>
            </div>

            {/* Resources Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold mb-5 text-slate-800">Resources</h3>
              <div className="flex flex-col gap-6">
                <Link href="#" className="flex gap-4 items-center group">
                  <div className="bg-purple-50 p-3 rounded-full group-hover:bg-purple-100 transition-colors">
                    <Image src="/Question 1.png" alt="Help Center" width={24} height={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800">Help Center</h4>
                    <p className="text-xs text-gray-500">Browse articles & FAQs</p>
                  </div>
                </Link>
                <Link href="#" className="flex gap-4 items-center group">
                  <div className="bg-gray-50 p-3 rounded-full group-hover:bg-gray-100 transition-colors">
                    <Image src="/chat (1) 1.png" alt="Community" width={24} height={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800">Community</h4>
                    <p className="text-xs text-gray-500">Ask other Hirconn users</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Form Area */}
          <div className="w-full md:w-2/3 bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <form className="flex flex-col gap-6">
              
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-semibold text-[#692A9F]">Email Address <span className="text-red-500">*</span></label>
                <input 
                  type="email" 
                  id="email" 
                  className="flex h-12 w-full rounded-xl border border-gray-200 bg-[#F8F9FC] px-4 py-2 text-sm placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#692A9F] focus-visible:border-transparent transition-all"
                  placeholder="name@example.com"
                />
                <p className="text-[13px] text-gray-500">For faster help, describe your issue once in a single message. Our support team will reply by email</p>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="issue" className="text-sm font-semibold text-[#692A9F]">Issue Type <span className="text-red-500">*</span></label>
                <div className="relative">
                  <select 
                    id="issue" 
                    className="flex h-12 w-full appearance-none rounded-xl border border-gray-200 bg-[#F8F9FC] px-4 py-2 text-sm text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#692A9F] focus-visible:border-transparent transition-all cursor-pointer"
                  >
                    <option value="" disabled selected>Select issue type</option>
                    <option value="login">Login Issues</option>
                    <option value="billing">Billing & Subscriptions</option>
                    <option value="profile">Profile Management</option>
                    <option value="other">Other</option>
                  </select>
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 1.5L6 6.5L11 1.5" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                <p className="text-[13px] text-gray-500">Select the option that best describes your issue</p>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-sm font-semibold text-[#692A9F]">Message <span className="text-red-500">*</span></label>
                <p className="text-[13px] text-gray-500">Include any error message, code, or the step where the issue occurred.</p>
                <textarea 
                  id="message" 
                  rows={6}
                  className="flex w-full rounded-xl border border-gray-200 bg-[#F8F9FC] px-4 py-3 text-sm placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#692A9F] focus-visible:border-transparent transition-all resize-none"
                  placeholder="Describe the issue you're experiencing... For example: 'I didn't receive my verification code after signing up'"
                ></textarea>
                <div className="text-right text-xs text-gray-400 mt-1">0/500 words</div>
              </div>

              <div className="flex justify-center mt-4">
                <Button type="submit" className="h-12 px-12 bg-[#692A9F] hover:bg-[#532080] text-base rounded-xl">
                  Contact Support
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="support-bottom-swoosh"></div>
    </div>
  );
}
