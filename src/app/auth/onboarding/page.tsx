"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import "@/styles/custom-shapes.css";

type OnboardingStep = "personal-details" | "add-photo" | "final-details";

const STEPS: { key: OnboardingStep; label: string }[] = [
  { key: "personal-details", label: "Personal Details" },
  { key: "add-photo", label: "Add Photo" },
  { key: "final-details", label: "About & Interests" },
];

const INTEREST_OPTIONS = [
  "Legal Services", "Accounting & Bookkeeping", "Financial Advisory", "Consulting",
  "Compliance & Risk", "Human Resources", "Business Coaching",
  "Entrepreneurship", "Freelancing", "Startups", "Small Business",
  "Remote Work", "Career Growth", "UI/UX Design", "Software Engineering",
  "Marketing", "Data Science", "Product Management",
];

// ===== Stepper Component =====
function StepIndicator({ currentStep }: { currentStep: OnboardingStep }) {
  const currentIndex = STEPS.findIndex((s) => s.key === currentStep);

  return (
    <div className="flex items-center gap-2 mb-8 border-b border-gray-100 pb-6">
      {STEPS.map((s, i) => {
        const isCompleted = i < currentIndex;
        const isActive = i === currentIndex;

        return (
          <div key={s.key} className="flex items-center gap-2">
            {/* Badge */}
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 transition-colors ${
                isCompleted
                  ? "bg-[#740CA1] text-white"
                  : isActive
                  ? "bg-[#2B0B4D] text-white"
                  : "bg-gray-100 text-gray-400"
              }`}
            >
              {isCompleted ? (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <path d="M5 13L9 17L19 7" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ) : (
                i + 1
              )}
            </div>
            {/* Label */}
            <span
              className={`text-xs font-medium ${
                isCompleted
                  ? "text-[#740CA1]"
                  : isActive
                  ? "text-[#2B0B4D] font-bold"
                  : "text-gray-400"
              }`}
            >
              {s.label}
            </span>
            {/* Connector line */}
            {i < STEPS.length - 1 && (
              <div
                className={`w-8 h-[2px] mx-1 rounded-full transition-colors ${
                  i < currentIndex ? "bg-[#740CA1]" : "bg-gray-100"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function OnboardingPage() {
  const [step, setStep] = useState<OnboardingStep>("personal-details");
  const router = useRouter();

  // Personal Details state
  const [dob, setDob] = useState("");
  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState("");
  const [country, setCountry] = useState("United States");
  const [stateVal, setStateVal] = useState("");
  const [city, setCity] = useState("");
  const [showAgePopup, setShowAgePopup] = useState(false);

  // Photo state
  const [mainPhoto, setMainPhoto] = useState<string | null>(null);
  const [extraPhotos, setExtraPhotos] = useState<(string | null)[]>([null, null, null]);
  const mainPhotoRef = useRef<HTMLInputElement>(null);
  const extraPhotoRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Final Details state
  const [about, setAbout] = useState("");
  const [work, setWork] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [interestSearch, setInterestSearch] = useState("");
  const [showInterestDropdown, setShowInterestDropdown] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // Helpers
  const calculateAge = (dateStr: string) => {
    if (!dateStr) return 0;
    const birth = new Date(dateStr);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
    return age;
  };

  const handlePersonalNext = (e: React.FormEvent) => {
    e.preventDefault();
    const age = calculateAge(dob);
    if (age < 18) {
      setShowAgePopup(true);
      return;
    }
    setStep("add-photo");
  };

  const handleMainPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setMainPhoto(url);
    }
  };

  const handleExtraPhotoUpload = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      const newPhotos = [...extraPhotos];
      newPhotos[index] = url;
      setExtraPhotos(newPhotos);
    }
  };

  const toggleInterest = (interest: string) => {
    if (interests.includes(interest)) {
      setInterests(interests.filter(i => i !== interest));
    } else if (interests.length < 5) {
      setInterests([...interests, interest]);
    }
  };

  const filteredInterests = INTEREST_OPTIONS.filter(i =>
    i.toLowerCase().includes(interestSearch.toLowerCase())
  );

  const handleComplete = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/auth/profile-live");
  };

  // ===== Right Panel Content Based on Step =====
  const renderRightContent = () => {
    // --- Step 1: Personal Details ---
    if (step === "personal-details") {
      return (
        <div className="animate-in fade-in slide-in-from-right-4 duration-500">
          <h2 className="text-3xl font-bold text-[#2B0B4D] mb-2">Personal Page Details</h2>
          <p className="text-gray-500 mb-6 text-sm">
            Set up your personal profile to connect with people and discover businesses nearby.
          </p>

          <form onSubmit={handlePersonalNext} className="flex flex-col gap-5 flex-1">
            {/* Date of Birth */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="dob" className="text-sm font-medium">
                Date of Birth <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input 
                  type="date" 
                  id="dob" 
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="flex h-12 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#692A9F] focus-visible:border-transparent"
                  required
                />
                {dob && (
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                    {calculateAge(dob)} yrs
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500">
                You must be 18 years old to create an account. Your age helps show appropriate matches and can&apos;t be changed later.
              </p>
            </div>

            {/* Name */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="fullname" className="text-sm font-medium">
                Name <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                id="fullname" 
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="flex h-12 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#692A9F] focus-visible:border-transparent"
                placeholder="Your full name"
                required
              />
              <p className="text-xs text-gray-500">
                Your name is visible to others on your profile. You can request a change later.
              </p>
            </div>

            {/* Gender */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="gender" className="text-sm font-medium">
                Gender <span className="text-red-500">*</span>
              </label>
              <select
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="flex h-12 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#692A9F] focus-visible:border-transparent appearance-none cursor-pointer"
                required
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer-not">Prefer not to say</option>
              </select>
              <p className="text-xs text-gray-500">
                Used to improve discovery and matching. You can update this later.
              </p>
            </div>

            {/* Location */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium">
                Location <span className="text-red-500">*</span>
              </label>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="flex h-12 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#692A9F] focus-visible:border-transparent appearance-none cursor-pointer"
              >
                <option value="United States">🇺🇸 United States</option>
                <option value="Bangladesh">🇧🇩 Bangladesh</option>
                <option value="United Kingdom">🇬🇧 United Kingdom</option>
                <option value="Canada">🇨🇦 Canada</option>
                <option value="India">🇮🇳 India</option>
                <option value="Australia">🇦🇺 Australia</option>
              </select>
              <div className="flex gap-3 mt-2">
                <input 
                  type="text" 
                  value={stateVal}
                  onChange={(e) => setStateVal(e.target.value)}
                  className="flex h-12 flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#692A9F] focus-visible:border-transparent"
                  placeholder="State"
                />
                <input 
                  type="text" 
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="flex h-12 flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#692A9F] focus-visible:border-transparent"
                  placeholder="City"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Used to show people near you. We use this information to personalize your experience. Learn more in our <a href="#" className="text-[#740CA1] hover:underline">Privacy Notice</a>.
              </p>
            </div>

            {/* Next Button */}
            <Button 
              type="submit"
              className="h-14 w-full bg-[#740CA1] hover:bg-[#5e0a82] text-lg rounded-xl mt-4 transition-all hover:shadow-md hover:shadow-purple-900/20"
              disabled={!dob || !fullName || !gender}
            >
              Next
            </Button>
          </form>
        </div>
      );
    }

    // --- Step 2: Add Photo ---
    if (step === "add-photo") {
      return (
        <div className="animate-in fade-in slide-in-from-right-4 duration-500">
          <h2 className="text-3xl font-bold text-[#2B0B4D] mb-2">Add Photo</h2>
          <p className="text-gray-500 mb-8 text-sm leading-relaxed">
            A profile photo helps people recognize you, build trust, and connect more easily.
          </p>

          {/* Main Photo */}
          <div className="mb-8 bg-gray-50 p-6 rounded-2xl border border-gray-100">
            <label className="text-sm font-semibold text-[#2B0B4D] mb-3 block">
              Main Photo <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-6">
              <div 
                className="photo-upload-main shrink-0"
                style={{ width: '160px', height: '160px', borderRadius: '100px' }} // Make main photo round
                onClick={() => mainPhotoRef.current?.click()}
              >
                {mainPhoto ? (
                  <Image src={mainPhoto} alt="Main photo" fill className="object-cover rounded-full" />
                ) : (
                  <>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-[#692A9F] mb-2">
                      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="12" cy="13" r="4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="text-xs font-medium text-[#692A9F]">Upload</span>
                  </>
                )}
                <div className="photo-add-btn">+</div>
                <input 
                  ref={mainPhotoRef}
                  type="file" 
                  accept="image/*" 
                  onChange={handleMainPhotoUpload}
                  className="hidden" 
                />
              </div>
              <p className="text-sm text-gray-500">
                A great photo can increase your profile views by up to 14 times. Choose a clear, professional image.
              </p>
            </div>
          </div>

          {/* More Photos */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <label className="text-sm font-semibold text-[#2B0B4D]">Additional Photos</label>
              <span className="text-xs font-medium bg-gray-100 text-gray-600 px-2 py-1 rounded">Optional</span>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-4">
              {extraPhotos.map((photo, index) => (
                <div 
                  key={index}
                  className="photo-upload-small shrink-0"
                  style={{ width: '120px', height: '120px' }} // Slightly smaller
                  onClick={() => extraPhotoRefs.current[index]?.click()}
                >
                  {photo ? (
                    <Image src={photo} alt={`Extra photo ${index + 1}`} fill className="object-cover rounded-[10px]" />
                  ) : (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-gray-400">
                      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="12" cy="13" r="4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                  <div className="photo-add-btn" style={{ width: '22px', height: '22px', fontSize: '0.9rem' }}>+</div>
                  <input 
                    ref={(el) => { extraPhotoRefs.current[index] = el; }}
                    type="file" 
                    accept="image/*" 
                    onChange={(e) => handleExtraPhotoUpload(index, e)}
                    className="hidden" 
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-4 mt-8 pt-6 border-t border-gray-100">
            <Button 
              variant="outline" 
              onClick={() => setStep("personal-details")}
              className="h-14 flex-1 rounded-xl border-gray-300 text-gray-700 hover:bg-gray-50 text-base font-semibold"
            >
              Back
            </Button>
            <Button 
              onClick={() => setStep("final-details")}
              className="h-14 flex-1 bg-[#740CA1] hover:bg-[#5e0a82] text-white rounded-xl text-base font-semibold transition-all hover:shadow-md hover:shadow-purple-900/20"
            >
              Next Step
            </Button>
          </div>
        </div>
      );
    }

    // --- Step 3: Final Details ---
    return (
      <div className="animate-in fade-in slide-in-from-right-4 duration-500">
        <h2 className="text-3xl font-bold text-[#2B0B4D] mb-2">Final Details</h2>
        <p className="text-gray-500 mb-6 text-sm">
          Tell the community about your expertise and what you&apos;re looking for.
        </p>

        <form onSubmit={handleComplete} className="flex flex-col gap-6 flex-1">
          {/* About */}
          <div className="flex flex-col gap-1.5">
            <h3 className="text-base font-semibold text-[#2B0B4D]">About You</h3>
            <p className="text-xs text-gray-500 mb-1">
              A short bio about who you are, what you do, or what you&apos;re here for.
            </p>
            <textarea
              value={about}
              onChange={(e) => setAbout(e.target.value.slice(0, 150))}
              className="w-full h-28 rounded-lg border border-gray-300 bg-white p-3 text-sm resize-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#692A9F] focus-visible:border-transparent transition-colors"
              placeholder="Share your story..."
            />
            <p className="text-xs text-gray-400 text-right">{about.length}/150 characters</p>
          </div>

          {/* Work */}
          <div className="flex flex-col gap-1.5">
            <h3 className="text-base font-semibold text-[#2B0B4D]">Work</h3>
            <p className="text-xs text-gray-500 mb-1">Your role, profession, or business.</p>
            <input
              type="text"
              value={work}
              onChange={(e) => setWork(e.target.value.slice(0, 10))}
              className="w-full h-12 rounded-lg border border-gray-300 bg-white px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#692A9F] focus-visible:border-transparent transition-colors"
              placeholder="e.g., UI Designer, Consultant"
            />
            <p className="text-xs text-gray-400 text-right">{work.length}/10 characters</p>
          </div>

          {/* Interests */}
          <div className="flex flex-col gap-1.5 bg-gray-50 p-5 rounded-2xl border border-gray-100">
            <h3 className="text-base font-semibold text-[#2B0B4D]">Interests</h3>
            <p className="text-xs text-gray-500 mb-3">Select up to 5 interests to improve matches.</p>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-[#692A9F]">
                  <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
                  <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <input
                type="text"
                value={interestSearch}
                onChange={(e) => {
                  setInterestSearch(e.target.value);
                  setShowInterestDropdown(true);
                }}
                onFocus={() => setShowInterestDropdown(true)}
                className="w-full h-12 rounded-lg border border-gray-300 bg-white pl-10 pr-10 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#692A9F] focus-visible:border-transparent transition-colors shadow-sm"
                placeholder="Search for interests..."
              />

              {showInterestDropdown && (
                <div className="interests-dropdown mt-1">
                  {filteredInterests.map((interest) => (
                    <div
                      key={interest}
                      className={`interests-dropdown-item ${interests.includes(interest) ? 'selected' : ''}`}
                      onClick={() => {
                        toggleInterest(interest);
                        setInterestSearch("");
                      }}
                    >
                      {interest}
                    </div>
                  ))}
                  {filteredInterests.length === 0 && (
                    <div className="p-3 text-sm text-gray-400 text-center">No interests found</div>
                  )}
                </div>
              )}
            </div>

            {/* Selected Tags */}
            {interests.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {interests.map((interest) => (
                  <div key={interest} className="interest-tag bg-[#740CA1]">
                    {interest}
                    <span className="remove-btn" onClick={() => toggleInterest(interest)}>✕</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Terms */}
          <div className="flex items-start gap-3 mt-4 bg-purple-50/50 p-4 rounded-xl">
            <input 
              type="checkbox" 
              id="final-terms" 
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="rounded border-purple-300 text-[#740CA1] focus:ring-[#740CA1] w-5 h-5 cursor-pointer mt-0.5 transition-colors" 
            />
            <label htmlFor="final-terms" className="text-sm text-gray-700 cursor-pointer leading-relaxed">
              By completing sign-up, you agree to the <a href="#" className="text-[#740CA1] font-bold hover:underline">Terms of Service</a>, and acknowledge that your personal information will be processed as described in the <a href="#" className="text-[#740CA1] font-bold hover:underline">Privacy Notice</a>.
            </label>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-4 mt-6 pt-6 border-t border-gray-100">
             <Button 
              type="button"
              variant="outline"
              onClick={() => router.push("/auth/profile-live")}
              className="h-14 flex-1 rounded-xl border-gray-300 text-gray-700 hover:bg-gray-50 text-base font-semibold"
            >
              Skip for now
            </Button>
            <Button 
              type="submit"
              className="h-14 flex-1 bg-[#740CA1] hover:bg-[#5e0a82] text-white rounded-xl text-base font-semibold transition-all hover:shadow-md hover:shadow-purple-900/20"
              disabled={!agreedToTerms}
            >
              Complete
            </Button>
          </div>
        </form>

        {/* Click outside to close dropdown */}
        {showInterestDropdown && (
          <div className="fixed inset-0 z-10" onClick={() => setShowInterestDropdown(false)}></div>
        )}
      </div>
    );
  };

  // ========== MAIN RENDER ==========
  return (
    <div className="onboarding-container">
      <div className="onboarding-two-panel">
        
        {/* Left Panel - Same across all steps */}
        <div className="onboarding-left-card">
          {/* Move Back arrow inside left panel so it looks like part of the navigation */}
          <button
            onClick={() => {
              if (step === "add-photo") setStep("personal-details");
              else if (step === "final-details") setStep("add-photo");
              else router.back();
            }}
            className="absolute top-8 left-8 flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity bg-transparent border-none p-0 cursor-pointer z-10 text-[#2B0B4D] font-semibold"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back
          </button>

          <div className="mt-8">
            <h2 className="text-4xl lg:text-5xl font-extrabold text-[#2B0B4D] mb-6 leading-tight">
              Build Your<br />Professional<br />Presence.
            </h2>
            <p className="text-gray-700 mb-10 text-lg leading-relaxed max-w-sm">
              Join Hirconn to connect with industry leaders, discover career-changing opportunities, and grow your local network.
            </p>
            <div className="flex flex-col gap-4 mb-10">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                  <Image src="/verified (1) 4.png" alt="" width={16} height={16} />
                </div>
                <span className="text-[#2B0B4D] font-semibold">Verified professional community</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                  <Image src="/verified (1) 4.png" alt="" width={16} height={16} />
                </div>
                <span className="text-[#2B0B4D] font-semibold">Local business integration</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                  <Image src="/verified (1) 4.png" alt="" width={16} height={16} />
                </div>
                <span className="text-[#2B0B4D] font-semibold">Tailored job recommendations</span>
              </div>
            </div>
          </div>
          {/* Decorative image */}
          <div className="bg-white/40 backdrop-blur-sm rounded-3xl p-6 mt-auto">
            <div className="bg-white rounded-2xl overflow-hidden shadow-xl border border-white/60" style={{ height: '220px', display: 'flex', alignItems: 'center', justifyItems: 'center' }}>
                <div className="w-full text-center text-gray-400">
                  <Image src="/logo.png" alt="Professional" width={100} height={100} className="opacity-20 mx-auto" />
                </div>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="onboarding-right-card relative">
          <div className="max-w-xl w-full mx-auto pb-10">
            {/* Step Indicator at top */}
            <StepIndicator currentStep={step} />

            {/* Step Content */}
            {renderRightContent()}
          </div>
        </div>
      </div>

      {/* Age Restriction Popup Overlay */}
      {showAgePopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-[32px] p-10 max-w-md w-full mx-auto flex flex-col items-center text-center shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-gray-100 scale-in-95 duration-200">
            <Image src="/logo.png" alt="Hirconn" width={80} height={80} className="mb-4" />
            <h3 className="text-2xl font-bold text-[#692A9F] mb-6">Hirconn</h3>
            
            <p className="text-gray-800 text-lg leading-relaxed mb-2">
              <span className="text-[#692A9F] font-bold">Hirconn</span> is currently available only to users who are <strong>18 years or older.</strong>
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Based on the information you entered, you&apos;re not eligible to create an account right now.
            </p>

            <Button 
              onClick={() => setShowAgePopup(false)} 
              className="w-[160px] h-14 bg-[#740CA1] hover:bg-[#5e0a82] text-base font-semibold rounded-xl shadow-md shadow-purple-900/20"
            >
              Got It
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
