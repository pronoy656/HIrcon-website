"use client";

import React, { useState, useMemo } from "react";
import { Plus, Trash2 } from "lucide-react";
import { ContactToolbar } from "../../../../components/manage/contact/ContactToolbar";
import { ContactTable } from "../../../../components/manage/contact/ContactTable";
import { AddContactModal } from "../../../../components/manage/contact/AddContactModal";
import { DeleteModal } from "../../../../components/common/DeleteModal";

// Helper to generate mock data
const generateMockContacts = () => {
  const cities = ["New York", "London", "Berlin", "Tokyo", "Paris", "Sydney", "Toronto"];
  const countries = ["USA", "UK", "Germany", "Japan", "France", "Australia", "Canada"];
  const statuses = ["Active", "Pending", "Inactive"];
  const deliveryServices = ["Standard", "Express", "Next Day", "Economy"];
  
  return Array.from({ length: 45 }, (_, i) => ({
    id: i + 1,
    reference: `REF-${(i + 1).toString().padStart(3, '0')}`,
    name: `Contact Name ${i + 1}`,
    company: `Company ${i + 1} Ltd`,
    address: `${Math.floor(Math.random() * 900) + 100} Business Road`,
    address2: `Suite ${Math.floor(Math.random() * 50) + 1}`,
    address3: "",
    city: cities[i % cities.length],
    country: countries[i % countries.length],
    state: "ST",
    post: "10001",
    phone: `+1 (555) ${Math.floor(100 + Math.random() * 900)}-${Math.floor(1000 + Math.random() * 9000)}`,
    fax: `+1 (555) ${Math.floor(100 + Math.random() * 900)}-${Math.floor(1000 + Math.random() * 9000)}`,
    notificationOption: "Email",
    email: `contact${i+1}@example.com`,
    additionalNotificationOption: "SMS",
    otherEmail: `billing${i+1}@example.com`,
    vatNumber: `VAT${Math.floor(1000000 + Math.random() * 9000000)}`,
    eori: `GB${Math.floor(100000000 + Math.random() * 900000000)}000`,
    residential: Math.random() > 0.8,
    collectionAddress: `${Math.floor(Math.random() * 900) + 100} Warehouse Ave`,
    deliveryServices: deliveryServices[i % deliveryServices.length],
    earlierDeliveryTime: "09:00",
    latestDeliveryTime: "17:00",
    response: statuses[i % statuses.length],
  }));
};

export default function ContactPage() {
  // State
  const [contacts, setContacts] = useState(generateMockContacts());
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Modals state
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("edit");
  const [activeContact, setActiveContact] = useState<any>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [contactToDelete, setContactToDelete] = useState<any>(null);
  const [isDeleteAllModalOpen, setIsDeleteAllModalOpen] = useState(false);

  // Derived data
  const uniqueCities = useMemo(() => Array.from(new Set(contacts.map(c => c.city))).sort(), [contacts]);
  const uniqueCountries = useMemo(() => Array.from(new Set(contacts.map(c => c.country))).sort(), [contacts]);

  const filteredContacts = contacts.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.reference.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCity = selectedCity ? c.city === selectedCity : true;
    const matchesCountry = selectedCountry ? c.country === selectedCountry : true;
    return matchesSearch && matchesCity && matchesCountry;
  });
  
  const totalPages = Math.ceil(filteredContacts.length / itemsPerPage);
  const paginatedContacts = filteredContacts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Handlers
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleEditClick = (contact: any) => {
    setActiveContact({ ...contact });
    setModalMode("edit");
    setIsContactModalOpen(true);
  };

  const handleAddClick = () => {
    setActiveContact({
      id: Date.now(),
      reference: "", name: "", company: "", address: "", address2: "", address3: "",
      country: "", state: "", city: "", post: "", phone: "", fax: "",
      notificationOption: "Email", email: "", additionalNotificationOption: "None", otherEmail: "",
      vatNumber: "", eori: "", residential: false, collectionAddress: "",
      deliveryServices: "Standard", earlierDeliveryTime: "09:00", latestDeliveryTime: "17:00", response: "Active"
    });
    setModalMode("add");
    setIsContactModalOpen(true);
  };

  const handleSaveContact = () => {
    if (modalMode === "edit") {
      setContacts(contacts.map(c => c.id === activeContact.id ? activeContact : c));
    } else {
      setContacts([activeContact, ...contacts]);
    }
    setIsContactModalOpen(false);
  };

  const handleDeleteClick = (contact: any) => {
    setContactToDelete(contact);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    setContacts(contacts.filter(c => c.id !== contactToDelete.id));
    setIsDeleteModalOpen(false);
    
    const newTotalPages = Math.ceil((filteredContacts.length - 1) / itemsPerPage);
    if (currentPage > newTotalPages && newTotalPages > 0) {
      setCurrentPage(newTotalPages);
    }
  };

  const confirmDeleteAll = () => {
    setContacts([]);
    setIsDeleteAllModalOpen(false);
    setCurrentPage(1);
  };

  return (
    <div className="p-6 md:p-8 animate-in fade-in zoom-in-95 duration-300">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-1">Manage Contacts</h1>
          <p className="text-gray-500 font-medium">View and manage all your customer and vendor contacts</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsDeleteAllModalOpen(true)}
            className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-sm transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Delete All
          </button>
          <button onClick={handleAddClick} className="bg-[#0b215f] hover:bg-[#081845] text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-sm transition-colors">
            <Plus className="w-5 h-5" />
            Add New Contact
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <ContactToolbar 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
          uniqueCountries={uniqueCountries}
          uniqueCities={uniqueCities}
          setCurrentPage={setCurrentPage}
        />

        <ContactTable 
          paginatedContacts={paginatedContacts}
          filteredContactsLength={filteredContacts.length}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
          onEditClick={handleEditClick}
          onDeleteClick={handleDeleteClick}
        />
      </div>

      <AddContactModal 
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        modalMode={modalMode}
        activeContact={activeContact}
        setActiveContact={setActiveContact}
        onSave={handleSaveContact}
      />

      <DeleteModal 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Contact"
        itemName={contactToDelete ? `the contact ${contactToDelete.name}` : undefined}
      />

      <DeleteModal 
        isOpen={isDeleteAllModalOpen}
        onClose={() => setIsDeleteAllModalOpen(false)}
        onConfirm={confirmDeleteAll}
        title="Delete All Contacts"
        warningHeading="Delete Everything?"
        confirmText="Yes, Delete All"
        message={<>You are about to permanently delete <strong className="text-red-600">ALL</strong> contacts in your database. This action is completely irreversible.</>}
      />

    </div>
  );
}
