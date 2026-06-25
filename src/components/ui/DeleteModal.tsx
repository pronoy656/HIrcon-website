import React from "react";
import { AlertTriangle } from "lucide-react";
import { Modal } from "@/components/ui/Modal";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  itemName?: string;
  message?: React.ReactNode;
  confirmText?: string;
  warningHeading?: string;
}

export function DeleteModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Deletion",
  itemName,
  message,
  confirmText = "Yes, Delete",
  warningHeading = "Are you sure?",
}: DeleteModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      footer={
        <>
          <button onClick={onClose} className="px-5 py-2 font-bold text-gray-600 hover:bg-gray-100 rounded-xl transition-colors">
            Cancel
          </button>
          <button onClick={onConfirm} className="px-5 py-2 font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl transition-colors shadow-sm">
            {confirmText}
          </button>
        </>
      }
    >
      <div className="flex flex-col items-center text-center py-4">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
          <AlertTriangle className="w-8 h-8 text-red-600" />
        </div>
        <h4 className="text-lg font-bold text-gray-900 mb-2">{warningHeading}</h4>
        <p className="text-gray-500">
          {message ? (
            message
          ) : (
            <>
              Do you really want to delete {itemName ? <span className="font-bold text-gray-800">{itemName}</span> : "this item"}? This action cannot be undone.
            </>
          )}
        </p>
      </div>
    </Modal>
  );
}
