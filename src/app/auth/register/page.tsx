"use client";

import { useState, useRef, useEffect } from "react";
import { AuthLayout } from "@/components/Auth-section/AuthLayout";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "@/styles/custom-shapes.css";

function FlagImg({ code }: { code: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`https://flagcdn.com/w20/${code.toLowerCase()}.png`}
      srcSet={`https://flagcdn.com/w40/${code.toLowerCase()}.png 2x`}
      width={20}
      height={15}
      alt={code}
      className="rounded-sm inline-block flex-shrink-0"
    />
  );
}

const COUNTRIES = [
  { name: "Afghanistan", code: "AF" },
  { name: "Albania", code: "AL" },
  { name: "Algeria", code: "DZ" },
  { name: "Argentina", code: "AR" },
  { name: "Australia", code: "AU" },
  { name: "Austria", code: "AT" },
  { name: "Bangladesh", code: "BD" },
  { name: "Belgium", code: "BE" },
  { name: "Brazil", code: "BR" },
  { name: "Canada", code: "CA" },
  { name: "Chile", code: "CL" },
  { name: "China", code: "CN" },
  { name: "Colombia", code: "CO" },
  { name: "Croatia", code: "HR" },
  { name: "Czech Republic", code: "CZ" },
  { name: "Denmark", code: "DK" },
  { name: "Egypt", code: "EG" },
  { name: "Ethiopia", code: "ET" },
  { name: "Finland", code: "FI" },
  { name: "France", code: "FR" },
  { name: "Germany", code: "DE" },
  { name: "Ghana", code: "GH" },
  { name: "Greece", code: "GR" },
  { name: "Hungary", code: "HU" },
  { name: "India", code: "IN" },
  { name: "Indonesia", code: "ID" },
  { name: "Iran", code: "IR" },
  { name: "Iraq", code: "IQ" },
  { name: "Ireland", code: "IE" },
  { name: "Israel", code: "IL" },
  { name: "Italy", code: "IT" },
  { name: "Japan", code: "JP" },
  { name: "Jordan", code: "JO" },
  { name: "Kenya", code: "KE" },
  { name: "Malaysia", code: "MY" },
  { name: "Mexico", code: "MX" },
  { name: "Morocco", code: "MA" },
  { name: "Netherlands", code: "NL" },
  { name: "New Zealand", code: "NZ" },
  { name: "Nigeria", code: "NG" },
  { name: "Norway", code: "NO" },
  { name: "Pakistan", code: "PK" },
  { name: "Peru", code: "PE" },
  { name: "Philippines", code: "PH" },
  { name: "Poland", code: "PL" },
  { name: "Portugal", code: "PT" },
  { name: "Romania", code: "RO" },
  { name: "Russia", code: "RU" },
  { name: "Saudi Arabia", code: "SA" },
  { name: "Singapore", code: "SG" },
  { name: "South Africa", code: "ZA" },
  { name: "South Korea", code: "KR" },
  { name: "Spain", code: "ES" },
  { name: "Sri Lanka", code: "LK" },
  { name: "Sweden", code: "SE" },
  { name: "Switzerland", code: "CH" },
  { name: "Thailand", code: "TH" },
  { name: "Turkey", code: "TR" },
  { name: "Ukraine", code: "UA" },
  { name: "United Arab Emirates", code: "AE" },
  { name: "United Kingdom", code: "GB" },
  { name: "United States", code: "US" },
  { name: "Vietnam", code: "VN" },
];

export default function RegisterPage() {
  const [selectedCountry, setSelectedCountry] = useState<{ name: string; code: string } | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const router = useRouter();

  const filtered = COUNTRIES.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setSearch("");
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const canSubmit = email.length > 0 && password.length > 0 && confirmPassword === password && agreedToTerms && selectedCountry;

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

        <h2 className="text-3xl font-bold text-[#081b4c] mb-1">
          Create an Account
        </h2>
        <p className="text-gray-500 mb-6 text-sm">
          Sign up to get started
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Country Custom Dropdown */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Country</label>
            <div className="relative" ref={dropdownRef}>
              {/* Trigger button */}
              <button
                type="button"
                onClick={() => { setIsOpen(!isOpen); setSearch(""); }}
                className="flex h-12 w-full items-center justify-between rounded-lg border border-gray-300 bg-white px-4 text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#081b4c] focus:border-transparent hover:border-gray-400 transition-colors"
              >
                <span className="flex items-center gap-3">
                  {selectedCountry ? (
                    <>
                      <FlagImg code={selectedCountry.code} />
                      <span className="text-gray-800">{selectedCountry.name}</span>
                    </>
                  ) : (
                    <span className="text-gray-400">Select your country</span>
                  )}
                </span>
                <svg
                  className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown list */}
              {isOpen && (
                <div className="absolute top-[calc(100%+4px)] left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden">
                  {/* Search box */}
                  <div className="p-2 border-b border-gray-100">
                    <input
                      autoFocus
                      type="text"
                      placeholder="Search country..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#081b4c]"
                    />
                  </div>
                  {/* Options */}
                  <ul className="max-h-52 overflow-y-auto">
                    {filtered.length === 0 ? (
                      <li className="px-4 py-3 text-sm text-gray-400 text-center">No results</li>
                    ) : (
                      filtered.map((c) => (
                        <li
                          key={c.code}
                          onClick={() => {
                            setSelectedCountry(c);
                            setIsOpen(false);
                            setSearch("");
                          }}
                          className={`flex items-center gap-3 px-4 py-2.5 cursor-pointer text-sm transition-colors hover:bg-blue-50 ${
                            selectedCountry?.code === c.code ? "bg-blue-100 text-[#081b4c] font-medium" : "text-gray-700"
                          }`}
                        >
                          <FlagImg code={c.code} />
                          <span>{c.name}</span>
                        </li>
                      ))
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label htmlFor="reg-email" className="text-sm font-medium">Email Address</label>
            <input 
              type="email" 
              id="reg-email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex h-12 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#081b4c] focus-visible:border-transparent"
              placeholder="name@company.com"
              required
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <label htmlFor="reg-password" className="text-sm font-medium mb-1">Password</label>
            <div className="relative">
              <input 
                id="reg-password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex h-12 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 pr-12 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#081b4c] focus-visible:border-transparent"
                placeholder="Type your password"
                type={showPassword ? "text" : "password"}
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-[#081b4c] transition-colors"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col gap-1">
            <label htmlFor="reg-confirm-password" className="text-sm font-medium mb-1">Confirm Password</label>
            <div className="relative">
              <input 
                id="reg-confirm-password" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="flex h-12 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 pr-12 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#081b4c] focus-visible:border-transparent"
                placeholder="Type your password"
                type={showConfirmPassword ? "text" : "password"}
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-[#081b4c] transition-colors"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label="Toggle password visibility"
              >
                {showConfirmPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Terms Agreement */}
          <div className="flex items-start gap-2 mt-1">
            <input 
              type="checkbox" 
              id="terms" 
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="rounded border-gray-300 text-[#081b4c] focus:ring-[#081b4c] w-4 h-4 cursor-pointer mt-0.5" 
            />
            <label htmlFor="terms" className="text-sm text-gray-600 cursor-pointer leading-tight">
              By continuing, you agree to <a href="#" className="text-[#081b4c] font-semibold hover:underline">ExShipn&apos;s User Agreement</a>, and <a href="#" className="text-[#081b4c] font-semibold hover:underline">Privacy Notice</a>
            </label>
          </div>

          <Button 
            type="submit" 
            className="h-14 w-full bg-[#081b4c] hover:bg-[#0a205a] text-lg rounded-xl mt-1"
            disabled={!canSubmit}
          >
            Next
          </Button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Already have an account? <Link href="/auth/login" className="text-[#081b4c] font-semibold hover:underline">Sign In</Link>
        </p>
      </div>
    </AuthLayout>
  );
}
