import Link from "next/link";
import { Ship, ArrowRight, Zap, Target, Box, Check, Globe, ShieldCheck, Smile, ChevronRight, Calendar } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#dce7f3] relative overflow-hidden font-sans">
      
      {/* Background Image & Gradient overlay */}
      <div className="absolute inset-0 z-0 flex pointer-events-none">
        
        {/* Right Side Background Image (The Ship) */}
        <div 
          className="absolute inset-0 w-full h-full bg-[length:90%_auto] bg-[right_center] bg-no-repeat"
          style={{ backgroundImage: "url('/ChatGPT Image Jul 2, 2026, 04_59_07 AM.png')" }} 
        ></div>
        
        {/* Blend the left gradient into the image */}
        <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#dce7f3] via-[#dce7f3]/90 to-transparent w-[55%] z-10"></div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-20 w-full max-w-[1400px] mx-auto px-8 h-screen flex items-center">
        
        {/* Left Column (Text & CTA) */}
        <div className="w-full lg:w-[55%] pt-20 pb-10 translate-y-10">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 border border-blue-100 px-4 py-2 rounded-full text-sm font-bold mb-8 shadow-sm">
            <Zap className="w-4 h-4 text-[#4f46e5]" />
            <span className="text-sm font-semibold text-[#1e293b]">AI-Powered Global Logistics Platform</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-[5rem] font-bold text-[#0f172a] leading-[1.05] mb-6 tracking-tight">
            Ship Smarter. <span className="bg-gradient-to-r from-[#0a192f] to-[#3b82f6] bg-clip-text text-transparent font-extrabold text-[1.05em] drop-shadow-sm whitespace-nowrap">Deliver Anywhere.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-slate-700 font-normal mb-8 max-w-xl leading-relaxed">
            Experience next-generation logistics with our global, ultra-reliable delivery network. We make shipping faster, safer, and entirely hassle-free.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap items-center gap-4 mb-14">
            <Link href="/quote" className="flex items-center gap-3 bg-gradient-to-r from-[#0a192f] to-[#3b82f6] hover:from-black hover:to-[#2563eb] text-white px-8 py-4 rounded-xl font-medium transition-all shadow-xl shadow-blue-900/20 group">
              <Box className="w-5 h-5 text-blue-100" />
              <span className="font-semibold">Get Instant Quote</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link href="/track" className="flex items-center gap-3 bg-white hover:bg-gray-50 text-[#0f172a] px-8 py-4 rounded-xl font-medium transition-all shadow-sm border border-gray-100 group">
              <Target className="w-5 h-5 text-[#4f46e5]" />
              <span className="font-semibold">Track Shipment</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Stats inline */}
          <div className="flex flex-wrap items-center gap-x-8 gap-y-6 mb-14 border-t border-gray-200 pt-8">
            <div className="flex items-center gap-3">
              <div className="bg-white p-2.5 rounded-full shadow-sm"><Globe className="w-5 h-5 text-slate-700" /></div>
              <div>
                <div className="font-bold text-[#0f172a] text-lg">250+</div>
                <div className="text-[11px] text-slate-500 font-medium tracking-wide">Countries Covered</div>
              </div>
            </div>
            
            <div className="hidden sm:block w-px h-10 bg-gray-300"></div>

            <div className="flex items-center gap-3">
              <div className="bg-white p-2.5 rounded-full shadow-sm"><Box className="w-5 h-5 text-slate-700" /></div>
              <div>
                <div className="font-bold text-[#0f172a] text-lg">10M+</div>
                <div className="text-[11px] text-slate-500 font-medium tracking-wide">Successful Deliveries</div>
              </div>
            </div>

            <div className="hidden sm:block w-px h-10 bg-gray-300"></div>

            <div className="flex items-center gap-3">
              <div className="bg-white p-2.5 rounded-full shadow-sm"><ShieldCheck className="w-5 h-5 text-slate-700" /></div>
              <div>
                <div className="font-bold text-[#0f172a] text-lg">99.9%</div>
                <div className="text-[11px] text-slate-500 font-medium tracking-wide">On-Time Delivery</div>
              </div>
            </div>
          </div>

          {/* Logos */}
          <div className="pb-10">
            <div className="text-xs font-bold text-slate-500 tracking-wider mb-5 uppercase">Trusted by leading businesses worldwide</div>
            <div className="flex items-center gap-8 md:gap-12 opacity-80 mix-blend-multiply flex-wrap">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/DHL_logo.svg/2560px-DHL_logo.svg.png" alt="DHL" className="h-4 object-contain" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/FedEx_Express.svg/2560px-FedEx_Express.svg.png" alt="FedEx" className="h-6 object-contain" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Maersk_Group_Logo.svg/2560px-Maersk_Group_Logo.svg.png" alt="Maersk" className="h-4 object-contain" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/UPS_logo.svg/1200px-UPS_logo.svg.png" alt="UPS" className="h-8 object-contain" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Aramex_logo.svg/2560px-Aramex_logo.svg.png" alt="Aramex" className="h-4 object-contain" />
            </div>
          </div>

        </div>

        {/* Right Column (Floating Cards) */}
        <div className="w-full lg:w-[45%] relative hidden lg:block">
          








        </div>

      </div>
    </div>
  );
}
