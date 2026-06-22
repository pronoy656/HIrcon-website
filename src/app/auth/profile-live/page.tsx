"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import "@/styles/custom-shapes.css";

export default function ProfileLivePage() {
  return (
    <div className="profile-live-container">
      {/* Logo Icon */}
      <div className="profile-live-icon">
        <Image src="/logo.png" alt="Hirconn" width={64} height={64} style={{ filter: 'brightness(0) invert(1)' }} />
      </div>

      {/* Heading */}
      <h1 className="text-4xl font-bold mb-4">
        <span className="text-[#081b4c]">Welcome</span>, your profile is live!
      </h1>

      {/* Description */}
      <p className="text-gray-500 max-w-md mb-8 leading-relaxed">
        Start connecting, sharing updates, and finding professionals to hire. Your journey on Hirconn starts now.
      </p>

      {/* Action Buttons */}
      <div className="flex items-center gap-4 mb-12">
        <Link href="/profile">
          <Button className="h-14 px-10 bg-[#081b4c] hover:bg-[#0a205a] text-lg rounded-xl shadow-md shadow-orange-900/20">
            View Profile
          </Button>
        </Link>
        <Link href="/">
          <Button 
            variant="outline" 
            className="h-14 px-10 text-lg rounded-xl border-[#1a0a00] text-[#1a0a00] hover:bg-[#F0EAFB]"
          >
            Go to Home
          </Button>
        </Link>
      </div>

      {/* Feature Cards */}
      <div className="flex gap-6">
        <div className="feature-card">
          <div className="w-10 h-10 rounded-lg bg-[#F0EAFB] flex items-center justify-center flex-shrink-0">
            <Image src="/add-user 1.png" alt="Network" width={20} height={20} />
          </div>
          <div>
            <h3 className="font-semibold text-sm text-[#1a0a00] mb-1">Build your network</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Connect with 5 suggested professionals in your industry.
            </p>
          </div>
        </div>

        <div className="feature-card">
          <div className="w-10 h-10 rounded-lg bg-[#F0EAFB] flex items-center justify-center flex-shrink-0">
            <Image src="/Work1 1.png" alt="Jobs" width={20} height={20} />
          </div>
          <div>
            <h3 className="font-semibold text-sm text-[#1a0a00] mb-1">Explore Job Postings</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              See recent openings matching your profile interests.
            </p>
          </div>
        </div>
      </div>

      <div className="bottom-swoosh" style={{ position: 'fixed' }}></div>
    </div>
  );
}

