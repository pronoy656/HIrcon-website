"use client";

import React, { useState } from "react";
import { UploadCloud, HelpCircle, Eye, Download, FileText, Trash2, X, Plus, Minus } from "lucide-react";
import { InputField } from "../../common/InputField";
import { SelectField } from "../../common/SelectField";
import { Modal } from "../../common/Modal";

export function ProfileTab() {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [portalLogo, setPortalLogo] = useState<string | null>(null);
  const [commercialLogo, setCommercialLogo] = useState<string | null>(null);
  const [empowermentLogo, setEmpowermentLogo] = useState<string | null>(null);
  const [ownEmpowermentDoc, setOwnEmpowermentDoc] = useState<string | null>(null);

  const [iossList, setIossList] = useState([{ name: "", number: "" }]);
  const [eoriList, setEoriList] = useState([""]);

  const [signatureName, setSignatureName] = useState("");
  const [letterheadStyle, setLetterheadStyle] = useState("");
  const [region, setRegion] = useState("");
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const [terms1, setTerms1] = useState(false);
  const [terms2, setTerms2] = useState(false);
  const [dataPolicy, setDataPolicy] = useState(false);
  const [marketing, setMarketing] = useState(false);

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFile: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFile(url);
    }
  };

  const removeFile = (setFile: React.Dispatch<React.SetStateAction<string | null>>) => {
    setFile(null);
  };

  const renderUploadBox = (
    label: string, 
    fileState: string | null, 
    setFileState: React.Dispatch<React.SetStateAction<string | null>>
  ) => (
    <div className="flex flex-col items-center w-full">
      <label className="block text-sm font-bold text-gray-700 mb-2 text-center">{label}</label>
      {fileState ? (
        <div className="relative w-full h-48 rounded-xl border border-gray-200 overflow-hidden group shadow-sm bg-gray-50 flex items-center justify-center">
          {fileState.startsWith('blob:') ? (
            <img src={fileState} alt={label} className="w-full h-full object-contain p-2" />
          ) : (
            <div className="w-full h-full flex flex-col gap-2 items-center justify-center text-xs font-semibold text-blue-600">
              <FileText className="w-6 h-6" />
              Preview Ready
            </div>
          )}
          <button 
            onClick={() => removeFile(setFileState)}
            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
            title="Remove file"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 hover:border-blue-300 transition-colors">
          <UploadCloud className="w-8 h-8 text-gray-400 mb-2" />
          <span className="text-sm text-gray-500 font-semibold text-center px-2">Click to upload image</span>
          <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, setFileState)} />
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
      <div className="text-center">
        <h3 className="text-lg font-bold text-gray-800 mb-6">Logos & Images</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          <InputField 
            label={
              <div className="flex items-center justify-between w-full">
                <span>Deferment Account Number</span>
                <a href="https://www.gov.uk/guidance/check-which-type-of-account-to-apply-for-to-defer-duty-payments-when-you-import-goods" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline">
                  What is a deferment account number?
                </a>
              </div>
            } 
            placeholder="Enter deferment account number" 
          />
        </div>

        <div className="mt-6 p-5 bg-gray-50 border border-gray-100 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-base font-bold text-gray-800">IOSS</h4>
            <a href="https://vat-one-stop-shop.ec.europa.eu/index_en" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline">
              What is an IOSS?
            </a>
          </div>
          <div className="space-y-4">
            {iossList.map((ioss, index) => (
              <div key={index} className="flex flex-col sm:flex-row sm:items-end gap-4">
                <InputField 
                  label={index === 0 ? "IOSS Name" : "\u00A0"} 
                  placeholder="Enter IOSS name" 
                  value={ioss.name}
                  onChange={(e) => {
                    const newList = [...iossList];
                    newList[index].name = e.target.value;
                    setIossList(newList);
                  }}
                  containerClassName="flex-1"
                />
                <InputField 
                  label={index === 0 ? "IOSS Number" : "\u00A0"} 
                  placeholder="Enter IOSS number" 
                  value={ioss.number}
                  onChange={(e) => {
                    const newList = [...iossList];
                    newList[index].number = e.target.value;
                    setIossList(newList);
                  }}
                  containerClassName="flex-1"
                />
                <div className="flex-shrink-0 mb-1 flex justify-end">
                  {index === 0 ? (
                    <button 
                      type="button"
                      onClick={() => setIossList([...iossList, { name: "", number: "" }])}
                      className="flex items-center justify-center w-11 h-11 bg-[#081b4c] text-white rounded-xl hover:bg-[#081845] transition-colors shadow-sm"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  ) : (
                    <button 
                      type="button"
                      onClick={() => {
                        const newList = [...iossList];
                        newList.splice(index, 1);
                        setIossList(newList);
                      }}
                      className="flex items-center justify-center w-11 h-11 bg-red-50 text-red-500 rounded-xl hover:bg-red-100 hover:text-red-600 transition-colors border border-red-100"
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="space-y-4">
            {eoriList.map((eori, index) => (
              <div key={index} className="flex flex-col sm:flex-row sm:items-end gap-4">
                <InputField 
                  label={index === 0 ? "EORI Number" : "\u00A0"} 
                  placeholder="Enter EORI number" 
                  value={eori}
                  onChange={(e) => {
                    const newList = [...eoriList];
                    newList[index] = e.target.value;
                    setEoriList(newList);
                  }}
                  containerClassName="flex-1"
                />
                <div className="flex-shrink-0 mb-1 flex justify-end">
                  {index === 0 ? (
                    <button 
                      type="button"
                      onClick={() => setEoriList([...eoriList, ""])}
                      className="flex items-center justify-center w-11 h-11 bg-[#081b4c] text-white rounded-xl hover:bg-[#081845] transition-colors shadow-sm"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  ) : (
                    <button 
                      type="button"
                      onClick={() => {
                        const newList = [...eoriList];
                        newList.splice(index, 1);
                        setEoriList(newList);
                      }}
                      className="flex items-center justify-center w-11 h-11 bg-red-50 text-red-500 rounded-xl hover:bg-red-100 hover:text-red-600 transition-colors border border-red-100"
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <hr className="border-gray-100" />

      {/* Stored Signature */}
      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-gray-800 mb-6">Stored Signature</h3>
        <div className="flex flex-col gap-6">
          <InputField 
            label="Digital Signature Name" 
            placeholder="Type your name to generate signature" 
            value={signatureName}
            onChange={(e) => setSignatureName(e.target.value)}
          />
          <div className="bg-white border border-gray-200 rounded-xl p-6 min-h-[100px] flex items-center justify-center overflow-hidden shadow-sm">
            {signatureName ? (
              <span className="text-4xl text-[#081b4c] font-['Brush_Script_MT',cursive,serif] italic tracking-wider">
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
                      ? 'border-[#081b4c] bg-blue-50 text-[#081b4c] shadow-sm' 
                      : 'border-gray-200 hover:border-gray-300 text-gray-600 bg-white'
                  }`}
                >
                  {style === 'Style 1' && (
                    <div className={`w-full h-36 bg-white border border-gray-200 rounded shadow-sm flex flex-col p-4 gap-3 overflow-hidden transition-opacity ${letterheadStyle === style ? 'opacity-100' : 'opacity-60'}`}>
                      <div className="border-b-2 border-[#081b4c] w-full pb-2 flex justify-between items-start">
                        <div className="w-12 h-3.5 bg-gray-300 rounded-sm"></div>
                        <div className="flex flex-col gap-1.5 items-end">
                          <div className="w-16 h-1.5 bg-gray-300 rounded-sm"></div>
                          <div className="w-12 h-1 bg-gray-200 rounded-sm"></div>
                          <div className="w-14 h-1 bg-gray-200 rounded-sm"></div>
                        </div>
                      </div>
                      <div className="flex-1 flex flex-col gap-2 mt-2">
                        <div className="w-full h-1.5 bg-gray-100 rounded-sm"></div>
                        <div className="w-3/4 h-1.5 bg-gray-100 rounded-sm"></div>
                        <div className="w-5/6 h-1.5 bg-gray-100 rounded-sm"></div>
                      </div>
                    </div>
                  )}
                  {style === 'Style 2' && (
                    <div className={`w-full h-36 bg-white border border-gray-200 rounded shadow-sm flex flex-col items-center p-4 gap-2 overflow-hidden transition-opacity ${letterheadStyle === style ? 'opacity-100' : 'opacity-60'}`}>
                      <div className="w-8 h-8 bg-[#081b4c] rounded-full mb-1 shadow-sm"></div>
                      <div className="w-20 h-1.5 bg-gray-300 rounded-sm"></div>
                      <div className="w-28 h-1.5 bg-gray-200 rounded-sm"></div>
                      <div className="w-full h-0 border-b border-gray-100 my-1"></div>
                      <div className="w-full flex flex-col gap-2 mt-2">
                        <div className="w-full h-1.5 bg-gray-100 rounded-sm"></div>
                        <div className="w-3/4 h-1.5 bg-gray-100 rounded-sm"></div>
                      </div>
                    </div>
                  )}
                  {style === 'Style 3' && (
                    <div className={`w-full h-36 bg-white border border-gray-200 rounded shadow-sm flex flex-col p-4 gap-3 overflow-hidden transition-opacity ${letterheadStyle === style ? 'opacity-100' : 'opacity-60'}`}>
                      <div className="bg-gray-50 p-3 rounded-md border border-gray-100 flex justify-between items-end">
                        <div className="flex flex-col gap-1.5">
                          <div className="w-16 h-2 bg-gray-300 rounded-sm"></div>
                          <div className="w-12 h-1 bg-gray-200 rounded-sm"></div>
                          <div className="w-14 h-1 bg-gray-200 rounded-sm"></div>
                        </div>
                        <div className="w-10 h-10 bg-blue-100 rounded-sm shadow-inner"></div>
                      </div>
                      <div className="flex-1 flex flex-col gap-2 mt-2">
                        <div className="w-full h-1.5 bg-gray-100 rounded-sm"></div>
                        <div className="w-3/4 h-1.5 bg-gray-100 rounded-sm"></div>
                      </div>
                    </div>
                  )}
                  {style}
                </button>
              ))}
            </div>
            
            {/* Action Buttons for selected style */}
            {letterheadStyle && (
              <div className="flex items-center gap-4 mt-6 animate-in fade-in">
                <button 
                  onClick={() => setIsPreviewOpen(true)}
                  className="flex items-center gap-2 bg-white border border-[#081b4c] text-[#081b4c] px-6 py-2.5 rounded-xl font-bold hover:bg-blue-50 transition-colors"
                >
                  <Eye className="w-4 h-4" /> Preview
                </button>
                <button className="flex items-center gap-2 bg-[#081b4c] text-white px-6 py-2.5 rounded-xl font-bold hover:bg-[#081b4c]/90 transition-colors">
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
                <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, setOwnEmpowermentDoc)} />
              </label>
            )}
          </div>

        </div>
      </div>

      <hr className="border-gray-100" />

      {/* Policies & Preferences */}
      <div>
        <h3 className="text-lg font-bold text-gray-800 mb-6">Policies & Preferences</h3>
        
        <div className="space-y-6">
          <div className="bg-gray-50 border border-gray-100 rounded-xl p-5">
            <h4 className="text-sm font-bold text-[#081b4c] mb-4">Terms and Conditions</h4>
            <div className="space-y-4">
              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="mt-0.5 shrink-0">
                  <input 
                    type="checkbox" 
                    checked={terms1}
                    onChange={(e) => setTerms1(e.target.checked)}
                    className="w-5 h-5 text-[#081b4c] rounded border-gray-300 focus:ring-[#081b4c]" 
                  />
                </div>
                <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors font-medium leading-relaxed">
                  I acknowledge that I have read, understood and accept the World Options terms and conditions
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="mt-0.5 shrink-0">
                  <input 
                    type="checkbox" 
                    checked={terms2}
                    onChange={(e) => setTerms2(e.target.checked)}
                    className="w-5 h-5 text-[#081b4c] rounded border-gray-300 focus:ring-[#081b4c]" 
                  />
                </div>
                <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors font-medium leading-relaxed">
                  I acknowledge that I have read, understood and accept the terms and conditions of carrier
                </span>
              </label>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-100 rounded-xl p-5">
            <h4 className="text-sm font-bold text-[#081b4c] mb-4">Data Policy</h4>
            <label className="flex items-start gap-3 cursor-pointer group">
              <div className="mt-0.5 shrink-0">
                <input 
                  type="checkbox" 
                  checked={dataPolicy}
                  onChange={(e) => setDataPolicy(e.target.checked)}
                  className="w-5 h-5 text-[#081b4c] rounded border-gray-300 focus:ring-[#081b4c]" 
                />
              </div>
              <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors font-medium leading-relaxed">
                I acknowledge that I have read, understood and accept the World Options Data Policy
              </span>
            </label>
          </div>

          <div className="bg-gray-50 border border-gray-100 rounded-xl p-5">
            <h4 className="text-sm font-bold text-[#081b4c] mb-4">Marketing Communication Preferences</h4>
            <label className="flex items-start gap-3 cursor-pointer group">
              <div className="mt-0.5 shrink-0">
                <input 
                  type="checkbox" 
                  checked={marketing}
                  onChange={(e) => setMarketing(e.target.checked)}
                  className="w-5 h-5 text-[#081b4c] rounded border-gray-300 focus:ring-[#081b4c]" 
                />
              </div>
              <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors font-medium leading-relaxed">
                I agree to World Options keeping me informed with personalised news, offers, services and promotions it believes would interest me.
              </span>
            </label>
          </div>
        </div>
      </div>

      <hr className="border-gray-100" />

      {/* Personal Data */}
      <div className="bg-red-50 border border-red-200 rounded-2xl p-8 shadow-sm mb-10 text-center">
        <h3 className="text-xl font-bold text-red-900 mb-6">My Personal Data</h3>
        
        <div className="text-sm text-red-800 space-y-4 mb-8 max-w-4xl mx-auto leading-relaxed">
          <p>
            At World Options we take your privacy seriously, if you no longer wish to use World Options you are able to remove the personal data we hold on your behalf from our system.
          </p>
          <p>
            It takes 30 days to delete your details to ensure there are no outstanding shipments linked to your account. Once you delete your personal data your company data will remain on our system for 7 years as required by law.
          </p>
          <p className="font-semibold">
            By deleting your personal data you wont be able to access any of your company records.
          </p>
          <p className="font-bold text-red-900 pt-2">
            If you have read and understand the following and still wish to proceed click the button below.
          </p>
        </div>

        <div className="flex justify-center">
          <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-xl transition-colors shadow-md">
            <Trash2 className="w-5 h-5" />
            Delete Personal Data
          </button>
        </div>
      </div>
      
      {/* Save/Update Button */}
      <div className="flex justify-end pt-4 pb-12">
        <button className="bg-[#081b4c] hover:bg-[#081b4c]/90 text-white font-semibold py-3 px-10 rounded-xl transition-colors text-lg shadow-md">
          Update
        </button>
      </div>

      {/* Letter Preview Modal */}
      <Modal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        title={`Letter Preview - ${letterheadStyle}`}
        maxWidthClass="max-w-3xl"
        footer={
          <>
            <button 
              onClick={() => setIsPreviewOpen(false)} 
              className="px-6 py-2.5 rounded-xl font-bold text-gray-600 hover:bg-gray-200 transition-colors"
            >
              Close
            </button>
            <button 
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold bg-[#081b4c] text-white hover:bg-[#081b4c]/90 transition-colors shadow-sm"
            >
              <Download className="w-4 h-4" /> Download PDF
            </button>
          </>
        }
      >
        <div className="max-w-2xl mx-auto space-y-6 text-gray-800 bg-white p-8 border border-gray-100 rounded-2xl shadow-sm">
          
          {/* Header variations based on selected style */}
          {letterheadStyle === 'Style 1' && (
            <div className="flex justify-between items-start mb-12 border-b-4 border-[#081b4c] pb-6">
              <div>
                <div className="w-32 h-12 bg-gray-100 rounded flex items-center justify-center text-[#081b4c] font-extrabold text-xl tracking-wider shadow-sm">
                  LOGO
                </div>
              </div>
              <div className="text-right text-sm text-gray-600">
                <p className="font-bold text-gray-900 text-base">Company Name Ltd</p>
                <p>123 Business Road</p>
                <p>Industrial Estate</p>
                <p>London, EC1A 1BB</p>
              </div>
            </div>
          )}

          {letterheadStyle === 'Style 2' && (
            <div className="flex flex-col items-center mb-12 border-b border-gray-200 pb-8 text-center">
              <div className="w-16 h-16 bg-[#081b4c] rounded-full flex items-center justify-center text-white font-serif mb-4 shadow-md">
                LOGO
              </div>
              <div className="text-sm text-gray-500 uppercase tracking-widest">
                <p className="font-bold text-gray-900 mb-1 text-lg">Company Name Ltd</p>
                <p>123 Business Road • Industrial Estate • London, EC1A 1BB</p>
              </div>
            </div>
          )}

          {letterheadStyle === 'Style 3' && (
            <div className="flex justify-between items-end mb-12 bg-gray-50 p-6 rounded-xl border border-gray-100">
              <div className="text-left text-sm text-gray-600">
                <p className="font-black text-gray-900 text-xl mb-2 tracking-tight">COMPANY NAME LTD</p>
                <p>123 Business Road</p>
                <p>Industrial Estate</p>
                <p>London, EC1A 1BB</p>
              </div>
              <div>
                <div className="w-20 h-20 bg-blue-100 rounded-lg flex items-center justify-center text-blue-700 font-bold shadow-inner">
                  LOGO
                </div>
              </div>
            </div>
          )}

          {/* Letter Body */}
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
              <div className="text-5xl text-[#081b4c] font-['Brush_Script_MT',cursive,serif] italic mb-2">
                {signatureName}
              </div>
            ) : (
              <div className="h-16 w-48 bg-gray-50 border border-dashed border-gray-300 rounded flex items-center justify-center text-gray-400 text-sm mb-2">
                [Signature placeholder]
              </div>
            )}
            <p className="font-bold">{signatureName || "John Doe"}</p>
            <p className="text-gray-500 text-sm">Director / Owner</p>
          </div>
        </div>
      </Modal>

    </div>
  );
}
