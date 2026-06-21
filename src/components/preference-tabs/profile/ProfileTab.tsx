"use client";

import React, { useState } from "react";
import { UploadCloud, X, HelpCircle, Eye, Download, FileText, Trash2 } from "lucide-react";
import { InputField } from "../../common/InputField";
import { SelectField } from "../../common/SelectField";

export function ProfileTab() {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [portalLogo, setPortalLogo] = useState<string | null>(null);
  const [commercialLogo, setCommercialLogo] = useState<string | null>(null);
  const [empowermentLogo, setEmpowermentLogo] = useState<string | null>(null);
  const [ownEmpowermentDoc, setOwnEmpowermentDoc] = useState<string | null>(null);

  const [signatureName, setSignatureName] = useState("");
  const [letterheadStyle, setLetterheadStyle] = useState("");
  const [region, setRegion] = useState("");
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const [terms1, setTerms1] = useState(false);
  const [terms2, setTerms2] = useState(false);
  const [dataPolicy, setDataPolicy] = useState(false);
  const [marketing, setMarketing] = useState(false);

  const handleFileUpload = (setFile: React.Dispatch<React.SetStateAction<string | null>>) => {
    setFile("uploaded-file.png");
  };

  const removeFile = (setFile: React.Dispatch<React.SetStateAction<string | null>>) => {
    setFile(null);
  };

  const renderUploadBox = (
    label: string, 
    fileState: string | null, 
    setFileState: React.Dispatch<React.SetStateAction<string | null>>
  ) => (
    <div className="flex flex-col">
      <label className="block text-sm font-bold text-gray-700 mb-2">{label}</label>
      {fileState ? (
        <div className="relative w-36 h-36 rounded-xl border border-gray-200 overflow-hidden group shadow-sm">
          <div className="w-full h-full bg-blue-50 flex flex-col gap-2 items-center justify-center text-xs font-semibold text-blue-600">
            <FileText className="w-6 h-6" />
            Preview Ready
          </div>
          <button 
            onClick={() => removeFile(setFileState)}
            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
            title="Remove file"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-36 h-36 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 hover:border-blue-300 transition-colors">
          <UploadCloud className="w-8 h-8 text-gray-400 mb-2" />
          <span className="text-sm text-gray-500 font-semibold text-center px-2">Click to upload</span>
          <input type="file" className="hidden" onChange={() => handleFileUpload(setFileState)} />
        </label>
      )}
    </div>
  );

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 space-y-10">
      
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Profile and your company</h2>
        <p className="text-gray-500">Manage your basic profile information and company details here.</p>
      </div>

      {/* Basic Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField label="Company Name" placeholder="Enter company name" />
        <InputField label="Owner" placeholder="Enter owner name" />
        <InputField label="Job Name" placeholder="Enter job name" />
        <InputField label="Job Title" placeholder="Enter job title" />
      </div>

      <hr className="border-gray-100" />

      {/* Uploads */}
      <div>
        <h3 className="text-lg font-bold text-gray-800 mb-6">Logos & Images</h3>
        <div className="flex flex-wrap gap-8">
          {renderUploadBox("Profile Image", profileImage, setProfileImage)}
          {renderUploadBox("Portal Logo", portalLogo, setPortalLogo)}
          {renderUploadBox("Commercial Logo", commercialLogo, setCommercialLogo)}
          {renderUploadBox("Letter of Empowerment", empowermentLogo, setEmpowermentLogo)}
        </div>
      </div>

      <hr className="border-gray-100" />

      {/* Government Registrations */}
      <div>
        <h3 className="text-lg font-bold text-gray-800 mb-6">Government Registrations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField 
            label="UK IMS Number" 
            placeholder="Enter UK IMS number" 
            tooltip="UK Internal Market Scheme Number"
          />
          <InputField label="Sender VAT Number" placeholder="Enter VAT number" />
          <InputField label="IOSS Number" placeholder="Enter IOSS number" />
          <InputField label="Deferment Account Number" placeholder="Enter deferment account number" />
          <InputField label="EORI Number" placeholder="Enter EORI number" />
        </div>
      </div>

      <hr className="border-gray-100" />

      {/* Stored Signature */}
      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-gray-800 mb-6">Stored Signature</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <InputField 
            label="Digital Signature Name" 
            placeholder="Type your name to generate signature" 
            value={signatureName}
            onChange={(e) => setSignatureName(e.target.value)}
          />
          <div className="bg-white border border-gray-200 rounded-xl p-6 min-h-[100px] flex items-center justify-center overflow-hidden shadow-sm">
            {signatureName ? (
              <span className="text-4xl text-[#0b215f] font-['Brush_Script_MT',cursive,serif] italic tracking-wider">
                {signatureName}
              </span>
            ) : (
              <span className="text-sm text-gray-400 font-medium">Signature preview will appear here</span>
            )}
          </div>
        </div>
      </div>

      <hr className="border-gray-100" />

      {/* Letter of Empowerment */}
      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-gray-800 mb-6">Letter of Empowerment</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField label="Company Name" placeholder="Enter company name" />
          <InputField label="Registered Company Name" placeholder="Enter registered company name" />
          
          <SelectField 
            label="Which part of country is your business registered" 
            containerClassName="md:col-span-2"
            value={region}
            onChange={setRegion}
            placeholder="Select a region..."
            options={[
              { value: "england", label: "England" },
              { value: "scotland", label: "Scotland" },
              { value: "wales", label: "Wales" },
              { value: "northern_ireland", label: "Northern Ireland" },
            ]}
          />
          
          <div className="md:col-span-2 mt-2">
            <label className="block text-sm font-bold text-gray-700 mb-4">Address on Letterhead</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField label="Line 1" placeholder="Street address, P.O. box, company name, c/o" />
              <InputField label="Line 2" placeholder="Apartment, suite, unit, building, floor, etc." />
            </div>
          </div>

          <div className="md:col-span-2 mt-4">
            <label className="block text-sm font-bold text-gray-700 mb-4">Select Letterhead Style</label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {['Style 1', 'Style 2', 'Style 3'].map((style, i) => (
                <button
                  key={i}
                  onClick={() => setLetterheadStyle(style)}
                  className={`p-4 border-2 rounded-xl text-sm font-bold transition-all flex flex-col items-center justify-center gap-3 ${
                    letterheadStyle === style 
                      ? 'border-[#0b215f] bg-blue-50 text-[#0b215f] shadow-sm' 
                      : 'border-gray-200 hover:border-gray-300 text-gray-600 bg-white'
                  }`}
                >
                  <div className="w-full h-24 bg-gray-50 border border-gray-200 rounded shadow-sm opacity-50 flex items-center justify-center text-xs">
                    Letterhead
                  </div>
                  {style}
                </button>
              ))}
            </div>
            
            {/* Action Buttons for selected style */}
            {letterheadStyle && (
              <div className="flex items-center gap-4 mt-6 animate-in fade-in">
                <button 
                  onClick={() => setIsPreviewOpen(true)}
                  className="flex items-center gap-2 bg-white border border-[#0b215f] text-[#0b215f] px-6 py-2.5 rounded-xl font-bold hover:bg-blue-50 transition-colors"
                >
                  <Eye className="w-4 h-4" /> Preview
                </button>
                <button className="flex items-center gap-2 bg-[#0b215f] text-white px-6 py-2.5 rounded-xl font-bold hover:bg-[#0b215f]/90 transition-colors">
                  <Download className="w-4 h-4" /> Download PDF
                </button>
              </div>
            )}
          </div>

          <div className="md:col-span-2 flex items-center gap-4 py-4">
            <hr className="flex-1 border-gray-200" />
            <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">OR</span>
            <hr className="flex-1 border-gray-200" />
          </div>

          <div className="md:col-span-2">
            <h4 className="text-sm font-bold text-gray-700 mb-4">Upload your own Letter of Empowerment</h4>
            {ownEmpowermentDoc ? (
              <div className="flex items-center justify-between bg-white border border-gray-200 p-4 rounded-xl shadow-sm">
                <div className="flex items-center gap-3">
                  <FileText className="w-6 h-6 text-blue-600" />
                  <span className="text-sm font-semibold text-gray-800">my-custom-empowerment.pdf</span>
                </div>
                <button onClick={() => setOwnEmpowermentDoc(null)} className="text-red-500 hover:text-red-600 p-1">
                  <X className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-white hover:bg-gray-50 hover:border-blue-300 transition-colors">
                <UploadCloud className="w-8 h-8 text-gray-400 mb-2" />
                <span className="text-sm text-gray-500 font-semibold text-center px-2">Click to upload your own letter</span>
                <input type="file" className="hidden" onChange={() => handleFileUpload(setOwnEmpowermentDoc)} />
              </label>
            )}
          </div>

        </div>
      </div>

      <hr className="border-gray-100" />

      {/* Policies & Preferences */}
      <div className="space-y-6">
        <h3 className="text-lg font-bold text-gray-800">Policies & Preferences</h3>
        
        <div className="space-y-4">
          <label className="flex items-start gap-3 cursor-pointer group">
            <div className="mt-0.5">
              <input 
                type="checkbox" 
                checked={terms1}
                onChange={(e) => setTerms1(e.target.checked)}
                className="w-5 h-5 text-[#0b215f] rounded border-gray-300 focus:ring-[#0b215f]" 
              />
            </div>
            <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors font-medium">
              I acknowledge that I have read, understood and accept the World Options terms and conditions
            </span>
          </label>

          <label className="flex items-start gap-3 cursor-pointer group">
            <div className="mt-0.5">
              <input 
                type="checkbox" 
                checked={terms2}
                onChange={(e) => setTerms2(e.target.checked)}
                className="w-5 h-5 text-[#0b215f] rounded border-gray-300 focus:ring-[#0b215f]" 
              />
            </div>
            <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors font-medium">
              I acknowledge that I have read, understood and accept the terms and conditions of carrier
            </span>
          </label>

          <label className="flex items-start gap-3 cursor-pointer group">
            <div className="mt-0.5">
              <input 
                type="checkbox" 
                checked={dataPolicy}
                onChange={(e) => setDataPolicy(e.target.checked)}
                className="w-5 h-5 text-[#0b215f] rounded border-gray-300 focus:ring-[#0b215f]" 
              />
            </div>
            <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors font-medium">
              I acknowledge that I have read, understood and accept the World Options Data Policy
            </span>
          </label>

          <label className="flex items-start gap-3 cursor-pointer group">
            <div className="mt-0.5">
              <input 
                type="checkbox" 
                checked={marketing}
                onChange={(e) => setMarketing(e.target.checked)}
                className="w-5 h-5 text-[#0b215f] rounded border-gray-300 focus:ring-[#0b215f]" 
              />
            </div>
            <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors font-medium">
              I agree to World Options keeping me informed with personalised news, offers, services and promotions it believes would interest me.
            </span>
          </label>
        </div>
      </div>

      <hr className="border-gray-100" />

      {/* Personal Data */}
      <div className="bg-red-50 border border-red-100 rounded-2xl p-6 shadow-sm mb-10">
        <h3 className="text-lg font-bold text-gray-800 mb-2">My Personal Data</h3>
        <p className="text-sm text-gray-600 mb-6">Manage your personal data preferences or request deletion.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <InputField label="Personal Data Key" placeholder="Personal data field..." />
          <InputField label="Another Data Key" placeholder="Personal data field..." />
        </div>

        <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 px-6 rounded-xl transition-colors">
          <Trash2 className="w-4 h-4" />
          Delete Personal Data
        </button>
      </div>
      
      {/* Save/Update Button */}
      <div className="flex justify-end pt-4 pb-12">
        <button className="bg-[#0b215f] hover:bg-[#0b215f]/90 text-white font-semibold py-3 px-10 rounded-xl transition-colors text-lg shadow-md">
          Update
        </button>
      </div>

      {/* Letter Preview Modal */}
      {isPreviewOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50">
              <h3 className="text-xl font-bold text-gray-900">Letter Preview - {letterheadStyle}</h3>
              <button onClick={() => setIsPreviewOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-8 overflow-y-auto flex-1 bg-white">
              <div className="max-w-2xl mx-auto space-y-6 text-gray-800">
                <div className="flex justify-between items-start mb-12">
                  <div>
                    <div className="w-32 h-12 bg-gray-200 rounded flex items-center justify-center text-gray-400 font-bold mb-4">
                      {letterheadStyle} LOGO
                    </div>
                  </div>
                  <div className="text-right text-sm">
                    <p className="font-bold">Company Name Ltd</p>
                    <p>123 Business Road</p>
                    <p>Industrial Estate</p>
                    <p>London, EC1A 1BB</p>
                  </div>
                </div>

                <p className="font-bold">To Whom It May Concern,</p>
                <p className="leading-relaxed">
                  This letter serves as formal empowerment and authorization for World Options to act on our behalf regarding all shipment and logistics matters as agreed upon in our service contract. 
                </p>
                <p className="leading-relaxed">
                  We confirm that the information provided in our company profile is accurate and we authorize the processing of our shipments according to the selected preferences.
                </p>
                
                <div className="mt-16 pt-8 border-t border-gray-100">
                  <p className="mb-4">Sincerely,</p>
                  {signatureName ? (
                    <div className="text-5xl text-[#0b215f] font-['Brush_Script_MT',cursive,serif] italic mb-2">
                      {signatureName}
                    </div>
                  ) : (
                    <div className="h-16 w-48 bg-gray-100 rounded flex items-center justify-center text-gray-400 text-sm mb-2">
                      [Signature placeholder]
                    </div>
                  )}
                  <p className="font-bold">{signatureName || "John Doe"}</p>
                  <p className="text-gray-500 text-sm">Director / Owner</p>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
              <button onClick={() => setIsPreviewOpen(false)} className="px-6 py-2 rounded-xl font-bold text-gray-600 hover:bg-gray-200 transition-colors">
                Close
              </button>
              <button className="flex items-center gap-2 px-6 py-2 rounded-xl font-bold bg-[#0b215f] text-white hover:bg-[#0b215f]/90 transition-colors">
                <Download className="w-4 h-4" /> Download PDF
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
