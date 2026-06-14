import { Button } from "@/components/ui/button";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  referenceId?: string;
}

export function SuccessModal({ 
  isOpen, 
  onClose, 
  title = "Success!", 
  message = "Action completed successfully.", 
  referenceId 
}: SuccessModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#F8F9FA]/80 backdrop-blur-sm p-4">
      <div className="bg-white rounded-[24px] p-10 max-w-md w-full mx-auto flex flex-col items-center text-center shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-gray-100">
        <div className="w-20 h-20 bg-[#EBDFF5] rounded-full flex items-center justify-center mb-6">
          <div className="w-12 h-12 bg-[#692A9F] rounded-full flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 13L9 17L19 7" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        
        <h2 className="text-3xl font-bold text-[#692A9F] mb-4">{title}</h2>
        <p className="text-gray-600 mb-8 leading-relaxed text-[15px]">
          {message}
        </p>
        
        <Button onClick={onClose} className="w-[180px] h-12 bg-[#692A9F] hover:bg-[#532080] text-base font-semibold rounded-xl mb-8 shadow-md shadow-purple-900/20">
          Got It
        </Button>
        
        {referenceId && (
          <>
            <div className="w-full h-[1px] bg-gray-100 mb-6"></div>
            <p className="text-[11px] font-bold text-gray-400 tracking-[0.1em] uppercase">
              REFERENCE ID: {referenceId}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
